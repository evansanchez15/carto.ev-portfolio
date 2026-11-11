// Dev-only contact sheet: every image in public/assets/images/portfolio/photography/,
// with its filename, approved alt text and place, plus Claude's DRAFT series and
// select proposals for Evan to review. 404s in production; not in sitemap.ts.

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bodyFont, displayFont } from "@/components/fonts";
import { portrait } from "@/content/about";
import { photos, type Photo } from "@/content/photography";
import { photoImages, type PhotoFile } from "@/content/photo-images";
import { currentUse, draftSeries, proposals } from "./proposals";

export const metadata: Metadata = {
  title: "Contact sheet (dev)",
  robots: { index: false, follow: false },
};

const originalsDir = path.join(process.cwd(), "public/assets/images/portfolio/photography");
const sizes = "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw";

// Optimized copies are always .jpg; the originals may be .jpeg.
const toOptimizedName = (original: string) => original.replace(/\.jpe?g$/i, ".jpg");

function Card({ photo, proposal }: { photo: Pick<Photo, "file" | "alt" | "place" | "orientation">; proposal?: { series: string; select?: boolean; note?: string } }) {
  const use = currentUse[photo.file] ?? "/photography grid";
  return (
    <figure className="border border-[#D6D6D6] bg-white flex flex-col">
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
        {proposal && (
          <div className="mt-auto border border-dashed border-[#424242] p-2 bg-[#F6F6F4]">
            <p className="text-[11px] font-bold tracking-[0.05em] text-[#424242]">DRAFT PROPOSAL, NOT ASSIGNED</p>
            <p>
              <span className="text-[#666666]">Series: </span>
              <strong>{draftSeries.find((s) => s.slug === proposal.series)?.title}</strong>
              <span className="text-[#666666]"> · Select: </span>
              <strong>{proposal.select ? "yes" : "no"}</strong>
            </p>
            {proposal.note && <p className="text-[#5B5B5B]">{proposal.note}</p>}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default function ContactSheetPage() {
  if (process.env.NODE_ENV === "production") notFound();

  // Every original in the folder, so a new file without a content entry still shows up.
  const originals = fs.readdirSync(originalsDir).filter((f) => /\.jpe?g$/i.test(f));
  const listed = new Set<string>([...photos.map((p) => p.file), portrait.file]);
  const unlisted = originals.filter((f) => !listed.has(toOptimizedName(f)));

  const byNumber = (a: Photo, b: Photo) => parseInt(a.file.slice(5)) - parseInt(b.file.slice(5));
  const selects = photos.filter((p) => proposals[p.file as keyof typeof proposals]?.select).sort(byNumber);

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
            with the approved alt text and the place taken from it.
          </p>
          <p className="border border-dashed border-[#424242] bg-[#F6F6F4] p-3">
            <strong>Everything in the dashed boxes is a draft.</strong> The series and select flags are Claude&apos;s
            suggestions from looking at each frame. Nothing is assigned on the site or in{" "}
            <code className="text-[13px]">src/content/photography.ts</code> until you confirm.
          </p>
          <p>Please reply with:</p>
          <ul className="list-disc pl-6">
            <li>series names, and which photo goes in each</li>
            <li>corrections to any place names in the alt text</li>
            <li>your 8–10 homepage selects</li>
          </ul>
        </div>

        <div className="mt-6 border border-dashed border-[#424242] bg-[#F6F6F4] p-3 max-w-[760px] text-[14px] text-[#424242]">
          <p className="text-[11px] font-bold tracking-[0.05em] mb-1">DRAFT SELECTS ({selects.length})</p>
          <p>{selects.map((p) => p.file.replace(".jpg", "")).join(", ")}</p>
        </div>
      </header>

      {unlisted.length > 0 && (
        <section className="max-w-[1280px] mx-auto mb-12 border border-red-300 bg-red-50 p-4 text-[14px]">
          <p className="font-bold">In the folder but missing from src/content/photography.ts:</p>
          <p>{unlisted.join(", ")}</p>
        </section>
      )}

      {draftSeries.map((s) => {
        const group = photos.filter((p) => proposals[p.file as keyof typeof proposals]?.series === s.slug).sort(byNumber);
        return (
          <section key={s.slug} className="max-w-[1280px] mx-auto mb-14">
            <h2 className="flex items-baseline gap-3 border-b border-black pb-1 mb-4">
              <span className="text-[22px] sm:text-[28px] font-bold tracking-[0.05em] text-[#333333]">{s.title.toUpperCase()}</span>
              <span className="text-[12px] text-[#666666] tracking-[0.05em]">DRAFT GROUPING · {group.length} FRAMES</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {group.map((photo) => (
                <Card key={photo.file} photo={photo} proposal={proposals[photo.file as keyof typeof proposals]} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="max-w-[1280px] mx-auto mb-14">
        <h2 className="border-b border-black pb-1 mb-4 text-[22px] sm:text-[28px] font-bold tracking-[0.05em] text-[#333333]">
          NOT A PORTFOLIO FRAME
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card photo={{ file: portrait.file as PhotoFile, alt: portrait.alt, orientation: "portrait" }} />
        </div>
      </section>
    </div>
  );
}
