import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactPrompt from "@/components/ContactPrompt";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { bodyFont, displayFont } from "@/components/fonts";
import { getPhoto, getPublishedSeries, nextSeries, publishedSeries, seriesPhotos, type PublishedSeries } from "@/content/photography";
import { photoImages } from "@/content/photo-images";
import { pageMetadata } from "../../page-metadata";
import { sequence, type Row } from "./sequence";

type Props = { params: Promise<{ series: string }> };

// Only published series get a page; any other slug (including the Workshop) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  // TEMP (Phase 3 review): Wasatch only until the design is approved.
  return publishedSeries.filter((s) => s.slug === "wasatch").map((s) => ({ series: s.slug }));
}

/** The cover's 1200x630 share image, written by scripts/optimize-images.mjs. */
function ogImage(s: PublishedSeries) {
  const url = `/assets/images/og/${s.cover}`;
  if (!fs.existsSync(path.join(process.cwd(), "public", url))) {
    throw new Error(`Missing share image ${url}: add ${s.cover} to ogImages in scripts/optimize-images.mjs and run it`);
  }
  return { url, alt: getPhoto(s.cover).alt };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getPublishedSeries((await params).series);
  if (!s) return {};
  return pageMetadata({
    title: s.title,
    // Draft wording, built from the data until a series has a blurb.
    description: s.blurb ?? `A photo series on 35mm film by Evan Sanchez: ${s.place ?? s.title}.`,
    path: `/photography/${s.slug}`,
    image: ogImage(s),
  });
}

// One container for the title, the frames and the closing band, aligned with the header.
const container = "mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8";

const sizes: Record<Row["kind"], string> = {
  wide: "(min-width: 1440px) 1376px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)",
  inset: "(min-width: 1440px) 880px, (min-width: 1024px) 64vw, (min-width: 640px) 72vw, 85vw",
  landscapes: "(min-width: 1440px) 684px, (min-width: 640px) 50vw, 100vw",
  portraits: "(min-width: 1440px) 495px, (min-width: 1024px) 36vw, (min-width: 640px) 44vw, 100vw",
  portrait: "(min-width: 1440px) 580px, (min-width: 1024px) 42vw, (min-width: 640px) 56vw, 85vw",
};

const rowClass: Record<Row["kind"], string> = {
  wide: "w-full",
  inset: "w-[85%] sm:w-[72%] lg:w-[64%]",
  landscapes: "w-full grid grid-cols-1 sm:grid-cols-2 gap-2",
  portraits: "w-full sm:w-[88%] lg:w-[72%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2",
  portrait: "w-[85%] sm:w-[56%] lg:w-[42%]",
};

function SequenceRow({ row }: { row: Row }) {
  const side = "side" in row ? (row.side === "right" ? "ml-auto" : "mr-auto") : "";
  return (
    <div className={`${rowClass[row.kind]} ${side}`}>
      {row.photos.map((photo) => (
        <Image
          key={photo.file}
          src={photoImages[photo.file]}
          alt={photo.alt}
          sizes={sizes[row.kind]}
          placeholder="blur"
          className="w-full h-auto"
        />
      ))}
    </div>
  );
}

export default async function SeriesPage({ params }: Props) {
  const s = getPublishedSeries((await params).series);
  if (!s) notFound();

  const cover = getPhoto(s.cover);
  // The cover is the hero, so it isn't repeated in the sequence.
  const rows = sequence(seriesPhotos(s.slug).filter((p) => p.file !== s.cover));
  const next = nextSeries(s.slug);

  return (
    <div className="min-h-screen bg-white">
      <Header wordmarkAs="p" />

      {/* Cover. The grey shows only until the blur placeholder paints. */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-[#E4E4E1]">
        <Image
          src={photoImages[cover.file]}
          alt={cover.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          priority
          className="object-cover"
        />
      </div>

      <div className={`${container} pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-16 md:pb-24`}>
        <Link
          href="/photography"
          className="text-[#626262] text-[12px] sm:text-[14px] md:text-[16px] font-bold tracking-[0.05em] hover:text-[#424242] transition-colors"
          style={bodyFont}
        >
          PHOTOGRAPHY
        </Link>
        <h1
          className="text-[#424242] text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-none tracking-[0.05em] uppercase mt-2 sm:mt-3"
          style={displayFont}
        >
          {s.title}
        </h1>
      </div>

      <div className={`${container} flex flex-col gap-8 sm:gap-16 lg:gap-28`}>
        {rows.map((row) => (
          <SequenceRow key={row.photos[0].file} row={row} />
        ))}
      </div>

      {/* Next series and the contact prompt */}
      <div className={`${container} mt-20 sm:mt-28 lg:mt-40`}>
        <div className="border-t border-black pt-8 sm:pt-10 md:pt-12 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
          <div>
            <p className="text-[#626262] text-[12px] sm:text-[14px] md:text-[16px] font-bold tracking-[0.05em]" style={bodyFont}>
              NEXT SERIES
            </p>
            <Link
              href={`/photography/${next.slug}`}
              className="inline-block text-[#424242] text-[32px] sm:text-[40px] md:text-[56px] leading-none tracking-[0.05em] uppercase mt-2 sm:mt-3 hover:text-[#626262] transition-colors"
              style={displayFont}
            >
              {next.title} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="sm:justify-self-end">
            <ContactPrompt />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
