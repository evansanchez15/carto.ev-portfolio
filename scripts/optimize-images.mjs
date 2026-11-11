// Writes compressed copies of the site's source images into public/assets/images/optimized/.
// Originals are never modified. Re-run after adding images: `node scripts/optimize-images.mjs`
// (existing outputs are skipped; pass --force to rebuild them).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const images = path.join(root, "public/assets/images");
const outRoot = path.join(images, "optimized");
const force = process.argv.includes("--force");

const jobs = [
  // Film scans and photos: apply EXIF rotation, re-encode with mozjpeg, cap the long edge at 3200px.
  { dir: "portfolio/photography", out: "photography", match: /\.jpe?g$/i, kind: "photo" },
  { dir: "hero", out: "hero", match: /\.jpe?g$/i, kind: "photo" },
  // Maps: lossless PNG, capped at 3840px wide (the largest size next/image ever requests).
  { dir: "portfolio/cartography", out: "cartography", match: /\.png$/i, kind: "map" },
];

// Smaller inline copies for images rendered with a raw <img> tag.
const extras = [
  { src: "portfolio/cartography/utah-election-2024.png", out: "cartography/utah-election-2024-1400.webp", width: 1400 },
];

// 1200x630 Open Graph images (centre crop), referenced from route metadata.
const ogImages = [
  { src: "portfolio/photography/photo24.jpg", out: "og/photo24.jpg" },
  // Series covers (src/content/photography.ts), used by /photography/[series].
  { src: "portfolio/photography/photo26.jpg", out: "og/photo26.jpg" },
  { src: "portfolio/photography/photo6.jpg", out: "og/photo6.jpg" },
  { src: "portfolio/photography/photo20.jpg", out: "og/photo20.jpg" },
  { src: "portfolio/cartography/GondolaFinal.png", out: "og/cartography.jpg" },
];

const mb = (bytes) => (bytes / 1048576).toFixed(2).padStart(6) + " MB";
let totalBefore = 0;
let totalAfter = 0;

async function write(srcPath, destPath, pipeline, { count = true } = {}) {
  const before = fs.statSync(srcPath).size;
  const tally = (after) => {
    if (!count) return;
    totalBefore += before;
    totalAfter += after;
  };
  if (!force && fs.existsSync(destPath)) {
    const after = fs.statSync(destPath).size;
    tally(after);
    console.log(`${mb(before)} -> ${mb(after)}  ${path.relative(outRoot, destPath)} (exists)`);
    return;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await pipeline(sharp(srcPath).rotate()).toFile(destPath);
  const after = fs.statSync(destPath).size;
  tally(after);
  console.log(`${mb(before)} -> ${mb(after)}  ${path.relative(outRoot, destPath)}`);
}

for (const job of jobs) {
  const dir = path.join(images, job.dir);
  for (const file of fs.readdirSync(dir).filter((f) => job.match.test(f)).sort()) {
    const dest = path.join(outRoot, job.out, file.replace(/\.jpeg$/i, ".jpg"));
    await write(path.join(dir, file), dest, (img) =>
      job.kind === "photo"
        ? img
            .resize({ width: 3200, height: 3200, fit: "inside", withoutEnlargement: true })
            .jpeg({ quality: 82, mozjpeg: true })
        : img
            .resize({ width: 3840, withoutEnlargement: true })
            .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }),
    );
  }
}

for (const extra of extras) {
  await write(path.join(images, extra.src), path.join(outRoot, extra.out), (img) =>
    img.resize({ width: extra.width, withoutEnlargement: true }).webp({ quality: 90 }),
  );
}

for (const og of ogImages) {
  await write(path.join(images, og.src), path.join(images, og.out), (img) =>
    img
      .flatten({ background: "#ffffff" })
      .resize({ width: 1200, height: 630, fit: "cover" })
      .jpeg({ quality: 85, mozjpeg: true }),
    { count: false },
  );
}

console.log(`TOTAL (photos + maps) ${mb(totalBefore)} -> ${mb(totalAfter)}`);
