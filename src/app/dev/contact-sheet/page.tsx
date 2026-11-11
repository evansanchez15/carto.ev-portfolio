// Dev-only contact sheet: every image in public/assets/images/portfolio/photography/,
// with its filename, alt text, place, series and select flag as recorded in
// src/content/photography.ts. 404s in production; not in sitemap.ts.

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bodyFont, displayFont } from "@/components/fonts";
import { portrait } from "@/content/about";
import { getPhoto, homeHero, photos, selects, series, seriesPhotos, type Photo } from "@/content/photography";
import { photoImages, type PhotoFile } from "@/content/photo-images";

export const metadata: Metadata = {
  title: "Contact sheet (dev)",
  robots: { index: false, follow: false },
};

const originalsDir = path.join(process.cwd(), "public/assets/images/portfolio/photography");
const sizes = "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw";

/** Where each frame appears on the live site today (everything else is in the /photography grid). */
const currentUse: Partial<Record<PhotoFile, string>> = {
  "photo24.jpg": "/photography hero",
  "photo27.jpg": "/photography hero inset",
  "photo2.jpg": "not on the site",
  "photo7.jpg": "not on the site",
  "photo15.jpg": "not on the site",
  "photo29.jpg": "not on the site",
  "contact.jpg": "/contact portrait",
};

// Optimized copies are always .jpg; the originals may be .jpeg.
const toOptimizedName = (original: string) => original.replace(/\.jpe?g$/i, ".jpg");
const seriesTitle = (slug: string) => series.find((s) => s.slug === slug)?.title ?? slug;
const shortName = (file: string) => file.replace(".jpg", "");
const coverOf = (file: string) => series.find((s) => s.cover === file);

type CardPhoto = Pick<Photo, "file" | "alt" | "place" | "orientation"> & Partial<Photo>;

function Card({ photo }: { photo: CardPhoto }) {
  const use = currentUse[photo.file] ?? "/photography grid";
  return (
    <figure className={`border border-[#D6D6D6] bg-white flex flex-col ${photo.dropped ? "opacity-60" : ""}`}>
      <div className="bg-[#EBEBEB] flex items-center justify-center p-2 h-[300px] sm:h-[340px]">
        <Image
          src={photoImages[photo.file]}
          alt={photo.alt}
          sizes={sizes}
          placeholder="blur"
          className="max-h-full w-auto h-auto object-contain"
        />
      </div>
      <figcaption className="p-3 flex flex-col gap-2 text-[13px] text-[#424242] flex-1" style={bodyFont}>
        <div className="flex items-baseline justify-between gap-2 border-b border-black pb-1">
          <span className="font-bold text-[15px] tracking-[0.05em]">{photo.file}</span>
          <span className="text-[#666666] text-[12px]">{photo.orientation} · {use}</span>
        </div>
        <p>
          <span className="text-[#666666]">Alt: </span>
          {photo.alt}
        </p>
        <p>
          <span className="text-[#666666]">Place: </span>
          {photo.place ?? <em className="text-[#999999]">none in alt text</em>}
        </p>
        {photo.series && (
          <p className="mt-auto pt-2 border-t border-[#E4E4E1]">
            <span className="text-[#666666]">Series: </span>
            <strong>{seriesTitle(photo.series)}</strong>
            <span className="text-[#666666]"> · Select: </span>
            <strong>{selects.includes(photo.file) ? `#${selects.indexOf(photo.file) + 1}` : "no"}</strong>
            {coverOf(photo.file) && (
              <>
                <span className="text-[#666666]"> · </span>
                <strong>{coverOf(photo.file)!.title} cover</strong>
              </>
            )}
            {photo.file === homeHero && (
              <>
                <span className="text-[#666666]"> · </span>
                <strong>homepage hero</strong>
              </>
            )}
            {photo.dropped && (
              <>
                <span className="text-[#666666]"> · </span>
                <strong>dropped</strong>
              </>
            )}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

function SectionHeading({ title, detail }: { title: string; detail: string }) {
  return (
    <h2 className="flex flex-wrap items-baseline gap-x-3 border-b border-black pb-1 mb-4">
      <span className="text-[22px] sm:text-[28px] font-bold tracking-[0.05em] text-[#333333]">{title.toUpperCase()}</span>
      <span className="text-[12px] text-[#666666] tracking-[0.05em]">{detail.toUpperCase()}</span>
    </h2>
  );
}

const grid = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4";

export default function ContactSheetPage() {
  if (process.env.NODE_ENV === "production") notFound();

  // Every original in the folder, so a new file without a content entry still shows up.
  const originals = fs.readdirSync(originalsDir).filter((f) => /\.jpe?g$/i.test(f));
  const listed = new Set<string>([...photos.map((p) => p.file), portrait.file]);
  const unlisted = originals.filter((f) => !listed.has(toOptimizedName(f)));
  const dropped = photos.filter((p) => p.dropped);

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-4 sm:px-6 md:px-8 py-8" style={bodyFont}>
      <header className="max-w-[1280px] mx-auto mb-10">
        <h1 className="text-[#424242] text-[32px] sm:text-[48px] leading-none tracking-[0.05em]" style={displayFont}>
          CONTACT SHEET
        </h1>
        <p className="text-[#666666] text-[14px] mt-2 tracking-[0.05em]">DEV ONLY · 404 IN PRODUCTION</p>

        <div className="mt-6 max-w-[760px] text-[15px] text-[#424242] leading-relaxed space-y-3">
          <p>
            All {originals.length} images in <code className="text-[13px]">public/assets/images/portfolio/photography/</code>,
            grouped by series as recorded in <code className="text-[13px]">src/content/photography.ts</code>. Order within a
            series is the order in that file.
          </p>
        </div>

        <dl className="mt-6 border border-[#D6D6D6] bg-white p-3 max-w-[760px] text-[14px] text-[#424242] space-y-1">
          <div>
            <dt className="inline text-[#666666]">Homepage hero: </dt>
            <dd className="inline">{shortName(homeHero)}</dd>
          </div>
          <div>
            <dt className="inline text-[#666666]">Selects, in order ({selects.length}): </dt>
            <dd className="inline">{selects.map(shortName).join(", ")}</dd>
          </div>
          <div>
            <dt className="inline text-[#666666]">Covers: </dt>
            <dd className="inline">
              {series.map((s) => `${s.title} ${s.cover ? shortName(s.cover) : "(none, not published)"}`).join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="inline text-[#666666]">Dropped ({dropped.length}): </dt>
            <dd className="inline">{dropped.map((p) => shortName(p.file)).join(", ")}</dd>
          </div>
        </dl>
      </header>

      {unlisted.length > 0 && (
        <section className="max-w-[1280px] mx-auto mb-12 border border-red-300 bg-red-50 p-4 text-[14px]">
          <p className="font-bold">In the folder but missing from src/content/photography.ts:</p>
          <p>{unlisted.join(", ")}</p>
        </section>
      )}

      <section className="max-w-[1280px] mx-auto mb-14">
        <SectionHeading title="Home selects strip" detail={`${selects.length} frames, in display order`} />
        <ol className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {selects.map((file, i) => (
            <li key={file} className="flex flex-col gap-1">
              <div className="bg-[#EBEBEB] aspect-[2/3] flex items-center justify-center p-1">
                <Image
                  src={photoImages[file]}
                  alt={getPhoto(file).alt}
                  sizes="(min-width: 1024px) 140px, (min-width: 640px) 20vw, 33vw"
                  placeholder="blur"
                  className="max-h-full w-auto h-auto object-contain"
                />
              </div>
              <span className="text-[12px] text-[#424242]">
                <strong>{i + 1}</strong> {shortName(file)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {series.map((s) => {
        const group = seriesPhotos(s.slug);
        return (
          <section key={s.slug} className="max-w-[1280px] mx-auto mb-14">
            <SectionHeading
              title={s.title}
              detail={`${group.length} frames · ${s.published ? `published · cover ${shortName(s.cover)}` : "not published yet"}`}
            />
            <div className={grid}>
              {group.map((photo) => (
                <Card key={photo.file} photo={photo} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="max-w-[1280px] mx-auto mb-14">
        <SectionHeading title="Dropped" detail="kept on file, left out of series and selects" />
        <div className={grid}>
          {dropped.map((photo) => (
            <Card key={photo.file} photo={photo} />
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto mb-14">
        <SectionHeading title="Not a portfolio frame" detail="" />
        <div className={grid}>
          <Card photo={{ file: portrait.file, alt: portrait.alt, orientation: "portrait" }} />
        </div>
      </section>
    </div>
  );
}
