// DRAFT proposals for the dev contact sheet: Claude's suggestions from looking at
// each frame, for Evan to accept or correct. Nothing here is read by the live site,
// and nothing is assigned in src/content/photography.ts until Evan replies.

import type { PhotoFile } from "@/content/photo-images";

export type DraftSeries = "wasatch" | "workshop" | "iceland" | "hawaii";

export const draftSeries: { slug: DraftSeries; title: string }[] = [
  { slug: "wasatch", title: "Wasatch" },
  { slug: "workshop", title: "The Workshop" },
  { slug: "iceland", title: "Iceland" },
  { slug: "hawaii", title: "Hawaii" },
];

type Proposal = {
  series: DraftSeries;
  select?: boolean;
  /** Why, or something for Evan to decide. */
  note?: string;
};

export const proposals: Record<Exclude<PhotoFile, "contact.jpg">, Proposal> = {
  // Iceland: coast, fjords, the lupine portrait, the waterfall
  "photo1.jpg": { series: "iceland", note: "Landscape, no people: pacing." },
  "photo2.jpg": { series: "iceland", note: "Near-duplicate of photo3 (dropped in Phase 1). Keep one." },
  "photo3.jpg": { series: "iceland", select: true, note: "Figure looking out over the bay; also the current homepage tile." },
  "photo4.jpg": { series: "iceland", note: "Landscape, no people: pacing." },
  "photo5.jpg": { series: "iceland", note: "Figure is mostly in shadow; reads as landscape." },
  "photo6.jpg": { series: "iceland", note: "Red-roofed shed. Strong colour, no people: pacing." },
  "photo7.jpg": { series: "iceland", note: "Same boat and dock as photo8. Pick one, or run them as a pair." },
  "photo8.jpg": { series: "iceland", note: "Same boat and dock as photo7; the red crane arm makes this one stronger." },
  "photo9.jpg": { series: "iceland", select: true, note: "Waterfall and cap: apparel-friendly portrait." },
  "photo11.jpg": { series: "iceland", select: true, note: "Lupine-field portrait." },
  "photo12.jpg": { series: "iceland", note: "Sailboat at dusk: pacing." },

  // The Workshop
  "photo13.jpg": { series: "workshop", note: "Wide view of the bench. Alt text names no place: where is this?" },
  "photo14.jpg": { series: "workshop", select: true, note: "Doorway frame. Alt text names no place: where is this?" },

  // Hawaii
  "photo15.jpg": { series: "hawaii", note: "Coastline, no people: pacing." },
  "photo16.jpg": { series: "hawaii", note: "Palm silhouette. One of the two palm frames." },
  "photo17.jpg": { series: "hawaii", select: true, note: "Hands-behind-head portrait." },
  "photo18.jpg": { series: "hawaii", select: true, note: "Seated portrait in the grass, mountains behind." },
  "photo19.jpg": { series: "hawaii", note: "Pandanus leaves. The second palm-type frame; drop one if two is too many." },
  "photo20.jpg": { series: "hawaii", note: "Cliff and ocean, no people: pacing." },

  // Wasatch: colour and black-and-white
  "photo10.jpg": { series: "wasatch", select: true, note: "Two pairs of boots on lichen granite: product-friendly detail." },
  "photo21.jpg": { series: "wasatch", note: "Landscape, no people: pacing." },
  "photo22.jpg": { series: "wasatch", select: true, note: "Hiker in the navy fleece with the pack." },
  "photo23.jpg": { series: "wasatch", note: "Landscape, no people: pacing." },
  "photo24.jpg": { series: "wasatch", select: true, note: "Tilted hiker on the ridge. Current /photography hero and share image." },
  "photo25.jpg": { series: "wasatch", note: "Black-and-white landscape: pacing." },
  "photo26.jpg": { series: "wasatch", note: "Black-and-white portrait with pack." },
  "photo27.jpg": { series: "wasatch", note: "Black-and-white hiker in a cap. Current /photography hero inset." },
  "photo28.jpg": { series: "wasatch", note: "Black-and-white landscape: pacing." },
  "photo29.jpg": { series: "wasatch", note: "Black-and-white; tiny figure in a big gully." },
  "photo30.jpg": { series: "wasatch", select: true, note: "Black-and-white hiker looking up." },
};

/** Where each frame appears on the live site today. */
export const currentUse: Partial<Record<PhotoFile, string>> = {
  "photo24.jpg": "/photography hero",
  "photo27.jpg": "/photography hero inset",
  "photo2.jpg": "Not on the site",
  "photo7.jpg": "Not on the site",
  "photo15.jpg": "Not on the site",
  "photo29.jpg": "Not on the site",
  "contact.jpg": "/contact portrait",
};
