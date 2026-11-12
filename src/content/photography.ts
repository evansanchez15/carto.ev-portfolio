// Photography content: every frame, its approved alt text and its place.
// Edit text here; the pages read from this file.
//
// Alt text was approved by Evan in Phase 1: a real description plus the place.
// `place` is the place named at the end of the alt text; keep the two in step.
// The /photography grid order lives in src/app/photography/page.tsx.

import type { PhotoFile } from "./photo-images";

export type Photo = {
  file: PhotoFile; // "photo24.jpg"
  alt: string; // real description + place, never generic
  place?: string; // "Wasatch Range, Utah"
};

export const photos: Photo[] = [
  {
    file: "photo1.jpg",
    alt: "Rows of colourful houses on a grassy rise above a calm bay at golden hour, Iceland",
    place: "Iceland",
  },
  {
    file: "photo2.jpg",
    alt: "A lone figure in a white beanie stands on a grassy headland, looking across a bay to a flat-topped mountain, Iceland",
    place: "Iceland",
  },
  {
    file: "photo3.jpg",
    alt: "A person in a white beanie and olive jacket, seen from behind, looks over a bay of small islands beside red-roofed houses, Iceland",
    place: "Iceland",
  },
  {
    file: "photo4.jpg",
    alt: "Houses along a low rocky point on a still bay, a distant headland on the horizon, Iceland",
    place: "Iceland",
  },
  {
    file: "photo5.jpg",
    alt: "A person in shadow sits above a dark crater lake ringed by green hills under heavy cloud, Iceland",
    place: "Iceland",
  },
  {
    file: "photo6.jpg",
    alt: "A blue corrugated-metal shed with a red roof beside a fjord, snow-streaked mountains behind, Iceland",
    place: "Iceland",
  },
  {
    file: "photo7.jpg",
    alt: "A blue rowing boat with a yellow rim on a weathered wooden dock, a fjord and mountains beyond, Iceland",
    place: "Iceland",
  },
  {
    file: "photo8.jpg",
    alt: "A blue rowing boat on a wooden dock beneath a red crane arm, a calm fjord behind, Iceland",
    place: "Iceland",
  },
  {
    file: "photo9.jpg",
    alt: "A person in a cap and olive jacket leans on a railing beside a wide waterfall, Iceland",
    place: "Iceland",
  },
  {
    file: "photo10.jpg",
    alt: "Two pairs of hiking boots on lichen-covered granite, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo11.jpg",
    alt: "A person in a black dress stands in a field of purple lupines below snow-capped mountains, Iceland",
    place: "Iceland",
  },
  {
    file: "photo12.jpg",
    alt: "A sailboat anchored on a glassy fjord at dusk, two swimmers nearby and red-lit mountains behind, Iceland",
    place: "Iceland",
  },
  {
    file: "photo13.jpg",
    alt: "A person works at a bench in a studio workshop, lined tubs and shelves of supplies around them, seen past a doorframe",
  },
  {
    file: "photo14.jpg",
    alt: "Through a doorway, a person works at a bench at the back of a studio workshop under ventilation ducts",
  },
  {
    file: "photo15.jpg",
    alt: "A rocky sea arch below lush green cliffs and a deep blue ocean, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo16.jpg",
    alt: "Palm fronds silhouetted against a low sun over the coast, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo17.jpg",
    alt: "A person in a white top stands with hands behind their head against green mountains and a cloudy sky, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo18.jpg",
    alt: "A person in light clothes sits in tall grass in front of a mountain range at dusk, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo19.jpg",
    alt: "Looking up through the spiky leaves of a pandanus tree against a pale sky, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo20.jpg",
    alt: "A sandstone cliff edge dropping to blue ocean, a small boat on the horizon, Hawaii",
    place: "Hawaii",
  },
  {
    file: "photo21.jpg",
    alt: "Late-summer shrubs in the foreground below rugged grey peaks, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo22.jpg",
    alt: "A hiker in a navy fleece and backpack stands among granite boulders, mountains behind, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo23.jpg",
    alt: "Granite boulders above a deep glacial valley and jagged ridgelines, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo24.jpg",
    alt: "A hiker with trekking poles crosses a tilted granite ridge under streaked cloud, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo25.jpg",
    alt: "Black-and-white view down a jagged granite ridge into a forested valley, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo26.jpg",
    alt: "Black-and-white portrait of a hiker with a backpack on a boulder field below a pointed peak, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo27.jpg",
    alt: "Black-and-white: a hiker in a cap and backpack looks down from a rocky summit ridge, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo28.jpg",
    alt: "Black-and-white: a sheer, striated granite face above a boulder field, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo29.jpg",
    alt: "Black-and-white: a small figure climbs through boulders below a deep rocky gully, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
  {
    file: "photo30.jpg",
    alt: "Black-and-white: a hiker in a cap looks up at the sky beside a large granite boulder, Wasatch Range, Utah",
    place: "Wasatch Range, Utah",
  },
];

export function getPhoto(file: PhotoFile): Photo {
  const photo = photos.find((p) => p.file === file);
  if (!photo) throw new Error(`No entry for ${file} in src/content/photography.ts`);
  return photo;
}
