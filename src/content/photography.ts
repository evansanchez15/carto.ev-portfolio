// Photography content: every frame, its approved alt text and its place.
// Edit text here; the pages read from this file.
//
// Alt text was approved by Evan in Phase 1: a real description plus the place.
// `place` is the place named at the end of the alt text; keep the two in step.
// Series and selects were assigned by Evan on 2026-11-11 (via /dev/contact-sheet).
// Order within a series is the order in this array. The home selects strip has its
// own explicit order (`selects` below).

import type { PhotoFile } from "./photo-images";

export type SeriesSlug = "wasatch" | "iceland" | "hawaii" | "workshop";

export type Photo = {
  file: PhotoFile; // "photo24.jpg"
  alt: string; // real description + place, never generic
  place?: string; // "Wasatch Range, Utah"
  series: SeriesSlug;
  /** Kept on file but left out of series pages and selects. */
  dropped?: boolean;
  orientation: "portrait" | "landscape" | "square";
};

type SeriesBase = {
  slug: SeriesSlug;
  title: string;
  place?: string; // unknown for The Workshop so far
  year?: string;
  blurb?: string;
  client?: string;
};

// A published series must have a cover. A cover is never the homepage hero or a
// select, so the homepage never shows the same frame twice (checked below).
export type Series = SeriesBase &
  (
    | { published: true; cover: PhotoFile }
    | { published: false; cover?: PhotoFile } // not on the site (no page, no card)
  );

export const photos: Photo[] = [
  // Wasatch: colour
  {
    file: "photo10.jpg",
    alt: "Two pairs of hiking boots on lichen-covered granite, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo21.jpg",
    alt: "Late-summer shrubs in the foreground below rugged grey peaks, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo22.jpg",
    alt: "A hiker in a navy fleece and backpack stands among granite boulders, mountains behind, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo23.jpg",
    alt: "Granite boulders above a deep glacial valley and jagged ridgelines, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo24.jpg",
    alt: "A hiker with trekking poles crosses a tilted granite ridge under streaked cloud, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  // Wasatch: black-and-white, kept together
  {
    file: "photo25.jpg",
    alt: "Black-and-white view down a jagged granite ridge into a forested valley, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo26.jpg",
    alt: "Black-and-white portrait of a hiker with a backpack on a boulder field below a pointed peak, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo27.jpg",
    alt: "Black-and-white: a hiker in a cap and backpack looks down from a rocky summit ridge, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  {
    file: "photo28.jpg",
    alt: "Black-and-white: a sheer, striated granite face above a boulder field, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "portrait",
  },
  {
    file: "photo29.jpg",
    alt: "Black-and-white: a small figure climbs through boulders below a deep rocky gully, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "portrait",
  },
  {
    file: "photo30.jpg",
    alt: "Black-and-white: a hiker in a cap looks up at the sky beside a large granite boulder, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
    series: "wasatch",
    orientation: "landscape",
  },
  // Iceland
  {
    file: "photo1.jpg",
    alt: "Rows of colourful houses on a grassy rise above a calm bay at golden hour, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "landscape",
  },
  {
    file: "photo2.jpg",
    alt: "A lone figure in a white beanie stands on a grassy headland, looking across a bay to a flat-topped mountain, Iceland",
    place: "Iceland",
    series: "iceland",
    dropped: true, // near-duplicate of photo3
    orientation: "landscape",
  },
  {
    file: "photo3.jpg",
    alt: "A person in a white beanie and olive jacket, seen from behind, looks over a bay of small islands beside red-roofed houses, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "landscape",
  },
  {
    file: "photo4.jpg",
    alt: "Houses along a low rocky point on a still bay, a distant headland on the horizon, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "landscape",
  },
  {
    file: "photo5.jpg",
    alt: "A person in shadow sits above a dark crater lake ringed by green hills under heavy cloud, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "portrait",
  },
  {
    file: "photo6.jpg",
    alt: "A blue corrugated-metal shed with a red roof beside a fjord, snow-streaked mountains behind, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "landscape",
  },
  {
    file: "photo7.jpg",
    alt: "A blue rowing boat with a yellow rim on a weathered wooden dock, a fjord and mountains beyond, Iceland",
    place: "Iceland",
    series: "iceland",
    dropped: true, // near-duplicate of photo8
    orientation: "portrait",
  },
  {
    file: "photo8.jpg",
    alt: "A blue rowing boat on a wooden dock beneath a red crane arm, a calm fjord behind, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "portrait",
  },
  {
    file: "photo9.jpg",
    alt: "A person in a cap and olive jacket leans on a railing beside a wide waterfall, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "portrait",
  },
  {
    file: "photo11.jpg",
    alt: "A person in a black dress stands in a field of purple lupines below snow-capped mountains, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "portrait",
  },
  {
    file: "photo12.jpg",
    alt: "A sailboat anchored on a glassy fjord at dusk, two swimmers nearby and red-lit mountains behind, Iceland",
    place: "Iceland",
    series: "iceland",
    orientation: "landscape",
  },
  // Hawaii
  {
    file: "photo15.jpg",
    alt: "A rocky sea arch below lush green cliffs and a deep blue ocean, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    orientation: "portrait",
  },
  {
    file: "photo16.jpg",
    alt: "Palm fronds silhouetted against a low sun over the coast, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    orientation: "portrait",
  },
  {
    file: "photo17.jpg",
    alt: "A person in a white top stands with hands behind their head against green mountains and a cloudy sky, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    orientation: "portrait",
  },
  {
    file: "photo18.jpg",
    alt: "A person in light clothes sits in tall grass in front of a mountain range at dusk, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    orientation: "landscape",
  },
  {
    file: "photo19.jpg",
    alt: "Looking up through the spiky leaves of a pandanus tree against a pale sky, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    dropped: true, // one palm frame is enough; photo16 stays
    orientation: "portrait",
  },
  {
    file: "photo20.jpg",
    alt: "A sandstone cliff edge dropping to blue ocean, a small boat on the horizon, Hawaii",
    place: "Hawaii",
    series: "hawaii",
    orientation: "portrait",
  },
  // The Workshop (not published yet)
  {
    file: "photo13.jpg",
    alt: "A person works at a bench in a studio workshop, lined tubs and shelves of supplies around them, seen past a doorframe",
    series: "workshop",
    orientation: "landscape",
  },
  {
    file: "photo14.jpg",
    alt: "Through a doorway, a person works at a bench at the back of a studio workshop under ventilation ducts",
    series: "workshop",
    orientation: "portrait",
  },
];

export const series: Series[] = [
  { slug: "wasatch", title: "Wasatch", place: "Wasatch Range, Utah", cover: "photo26.jpg", published: true },
  { slug: "iceland", title: "Iceland", place: "Iceland", cover: "photo6.jpg", published: true },
  { slug: "hawaii", title: "Hawaii", place: "Hawaii", cover: "photo20.jpg", published: true },
  // Only two frames exist. photo14 stays a select; the series isn't published yet.
  { slug: "workshop", title: "The Workshop", published: false },
];

export function getPhoto(file: PhotoFile): Photo {
  const photo = photos.find((p) => p.file === file);
  if (!photo) throw new Error(`No entry for ${file} in src/content/photography.ts`);
  return photo;
}

/** Frames in a series, in order, without dropped ones. */
export function seriesPhotos(slug: SeriesSlug): Photo[] {
  return photos.filter((p) => p.series === slug && !p.dropped);
}

/** The homepage hero (Phase 4). Never a select or a series cover. */
export const homeHero: PhotoFile = "photo24.jpg";

/** The home selects strip, in display order. */
export const selects: PhotoFile[] = [
  "photo10.jpg",
  "photo11.jpg",
  "photo22.jpg",
  "photo17.jpg",
  "photo9.jpg",
  "photo30.jpg",
  "photo14.jpg",
  "photo18.jpg",
  "photo3.jpg",
];

// Fail the build if the homepage would show a frame twice, or a select is unusable.
const covers = series.flatMap((s) => (s.cover ? [s.cover] : []));
for (const file of selects) {
  if (getPhoto(file).dropped) throw new Error(`Select ${file} is marked dropped`);
  if (file === homeHero) throw new Error(`Select ${file} is the homepage hero`);
  if (covers.includes(file)) throw new Error(`Select ${file} is also a series cover`);
}
if (new Set(selects).size !== selects.length) throw new Error("A select is listed twice");
if (covers.includes(homeHero)) throw new Error(`The homepage hero ${homeHero} is also a series cover`);
for (const s of series) {
  if (!s.cover) continue;
  const cover = getPhoto(s.cover);
  if (cover.series !== s.slug || cover.dropped) throw new Error(`${s.title} cover ${s.cover} isn't a live frame in that series`);
}
