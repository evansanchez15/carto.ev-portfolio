// Writes compressed copies of the site's source images into public/assets/images/optimized/.
// Originals are never modified. Re-run after adding images: `node scripts/optimize-images.mjs`
// (existing outputs are skipped; pass --force to rebuild them).
// It also reads the place folders (portfolio/Utah/, portfolio/Iceland/, …) and regenerates
// src/content/places.generated.ts, which drives the filters on /photography.
import crypto from "node:crypto";
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
  { src: "portfolio/cartography/GondolaFinal.png", out: "og/cartography.jpg" },
];

const photoPipeline = (img) =>
  img
    .resize({ width: 3200, height: 3200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true });
const mapPipeline = (img) =>
  img
    .resize({ width: 3840, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 });

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
    await write(path.join(dir, file), dest, job.kind === "photo" ? photoPipeline : mapPipeline);
  }
}

// Place folders: every folder in portfolio/ other than cartography/ and photography/ is a filter
// on /photography, and the JPEGs in it are that filter's photos (other files, e.g. .psd, are
// skipped). A file that is one of the existing photoN frames, either named photoN.jpg or listed
// in src/content/photo-aliases.json, is served from optimized/photography/ with its approved
// alt text. Every other file is compressed into optimized/places/<folder>/ and needs alt text
// in src/content/photography.ts (the build fails without it).
{
  const portfolio = path.join(images, "portfolio");
  const notPlaces = new Set(["cartography", "photography"]);
  const aliases = JSON.parse(fs.readFileSync(path.join(root, "src/content/photo-aliases.json"), "utf8"));
  const existingDir = path.join(portfolio, "photography");
  const existing = new Set(fs.readdirSync(existingDir).filter((f) => /^photo\d+\.jpg$/.test(f)));
  const byName = new Intl.Collator("en", { numeric: true }).compare;
  const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  const problems = [];
  const filedIn = new Map(); // photoN.jpg -> folder
  const folders = [];
  const seenKeys = new Set();

  const folderNames = fs
    .readdirSync(portfolio)
    .filter((name) => !notPlaces.has(name) && fs.statSync(path.join(portfolio, name)).isDirectory())
    .sort(byName);
  for (const name of folderNames) {
    const photos = [];
    for (const file of fs.readdirSync(path.join(portfolio, name)).sort(byName)) {
      if (file.startsWith(".")) continue;
      const key = `${name}/${file}`;
      seenKeys.add(key);
      if (!/\.jpe?g$/i.test(file)) {
        console.log(`skipped (not a JPEG)  ${key}`);
        continue;
      }
      let same = aliases[key];
      if (!same && existing.has(file)) {
        if (sha(path.join(portfolio, name, file)) !== sha(path.join(existingDir, file))) {
          problems.push(`${key} has an existing photo's name but isn't the same file as photography/${file}`);
        }
        same = file;
      }
      if (same) {
        if (!existing.has(same)) problems.push(`${key} is listed as ${same}, which doesn't exist`);
        if (filedIn.has(same)) problems.push(`${same} is in both ${filedIn.get(same)}/ and ${name}/`);
        filedIn.set(same, name);
        photos.push({ key, existing: same });
      } else {
        const out = `places/${slug(name)}/${file.replace(/\.jpeg$/i, ".jpg")}`;
        await write(path.join(portfolio, name, file), path.join(outRoot, out), photoPipeline);
        photos.push({ key, optimized: out });
      }
    }
    folders.push({ name, slug: slug(name), photos });
  }
  for (const key of Object.keys(aliases)) {
    if (!seenKeys.has(key)) problems.push(`photo-aliases.json lists ${key}, which isn't in its folder`);
  }
  for (const file of [...existing].sort(byName)) {
    if (!filedIn.has(file)) console.log(`unfiled: ${file} isn't in any place folder, so it can't appear on /photography`);
  }
  if (problems.length) {
    console.error(problems.map((p) => `ERROR ${p}`).join("\n"));
    process.exit(1);
  }

  const q = JSON.stringify;
  const imports = [];
  const body = folders.map((folder) => {
    const lines = folder.photos.map((photo) => {
      if (photo.existing) return `      { key: ${q(photo.key)}, existing: ${q(photo.existing)} },`;
      const id = `img${imports.length}`;
      imports.push(`import ${id} from "../../public/assets/images/optimized/${photo.optimized}";`);
      return `      { key: ${q(photo.key)}, image: ${id} },`;
    });
    return `  {\n    name: ${q(folder.name)},\n    slug: ${q(folder.slug)},\n    photos: [\n${lines.join("\n")}\n    ],\n  },`;
  });
  const union = (values) => (values.length ? values.map((v) => `\n  | ${q(v)}`).join("") : " never");
  const newKeys = folders.flatMap((f) => f.photos.filter((p) => !p.existing).map((p) => p.key));
  const generated = `// GENERATED by scripts/optimize-images.mjs from the folders in public/assets/images/portfolio/.
// Don't edit: add or remove photos in those folders and re-run \`node scripts/optimize-images.mjs\`.
import type { StaticImageData } from "next/image";
import type { PhotoFile } from "./photo-images";
${imports.join("\n")}

/** A folder in public/assets/images/portfolio/ (other than cartography/ and photography/). */
export type FolderName =${union(folders.map((f) => f.name))};

/** Folder photos that aren't existing photoN frames; each needs alt text in photography.ts. */
export type NewPhotoKey =${union(newKeys)};

export type FolderPhoto =
  | { key: NewPhotoKey; image: StaticImageData }
  | { key: string; existing: PhotoFile };

export type PlaceFolder = { name: FolderName; slug: string; photos: FolderPhoto[] };

export const folders: PlaceFolder[] = [
${body.join("\n")}
];
`;
  fs.writeFileSync(path.join(root, "src/content/places.generated.ts"), generated);
  console.log(`src/content/places.generated.ts  ${folders.map((f) => `${f.name} ${f.photos.length}`).join(", ")}`);
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

// Homepage share image: the two homepage tiles side by side (cartography left, photography
// right), each centre-cropped like the tiles' object-cover, with the tiles' 10% black overlay
// and a #EBEBEB gutter standing in for the gap between them.
const split = { left: "hero/planet-volumes-SO0alFysHTg-unsplash.jpg", right: "hero/000017650003-2.jpg", out: "og/home-split.jpg" };
{
  const dest = path.join(images, split.out);
  if (!force && fs.existsSync(dest)) {
    console.log(`${path.relative(images, dest)} (exists)`);
  } else {
    const gutter = 12;
    const half = (1200 - gutter) / 2;
    const tile = (src) =>
      sharp(path.join(images, src))
        .rotate()
        .resize({ width: half, height: 630, fit: "cover" })
        .composite([{ input: { create: { width: half, height: 630, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.1 } } } }])
        .toBuffer();
    const [left, right] = await Promise.all([tile(split.left), tile(split.right)]);
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#EBEBEB" } })
      .composite([{ input: left, left: 0, top: 0 }, { input: right, left: half + gutter, top: 0 }])
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(dest);
    console.log(`${path.relative(images, dest)}  ${(fs.statSync(dest).size / 1024).toFixed(0)} KB`);
  }
}

console.log(`TOTAL (photos + maps) ${mb(totalBefore)} -> ${mb(totalAfter)}`);
