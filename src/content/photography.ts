// Photography content: every frame, its approved alt text and its place.
// Edit text here; the pages read from this file.
//
// Alt text was approved by Evan in Phase 1: a real description plus the place.
// `place` is the place named at the end of the alt text; keep the two in step.
// Which photos are on /photography, and under which filter, comes from the folders in
// public/assets/images/portfolio/ (see places.generated.ts); this file holds the words and order.

import type { PhotoFile } from "./photo-images";
import type { FolderName, NewPhotoKey } from "./places.generated";

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

// Alt text for photos that came in through the place folders (approved by Evan, Nov 2026), keyed by
// "Folder/file". Existing photoN frames in the folders keep their alt text above. The build fails if
// a folder photo has no entry here, or an entry no longer matches a photo.
export const folderPhotoAlt: Record<NewPhotoKey, string> = {
  "Utah/000005640021.jpg": "Pale aspen trunks crowded beneath a canopy of golden autumn leaves, Utah",
  "Utah/000057110021.jpg": "A grassy alpine meadow below a pointed peak, a broad valley and distant lake beyond, Utah",
  "Utah/000057110027.jpg": "A hiker crouches among huge granite slabs below a jagged, pale rock ridge, Utah",
  "Utah/000057110029.jpg": "A hiker sits on a boulder in a wide golden meadow beside a dog, grey cliffs and cloud beyond, Utah",
  "Utah/000057110030.jpg": "A rainbow over a scree slope above red autumn shrubs and scattered pines, Utah",
  "Utah/000057110031.jpg": "A hiker in a teal headband looks across an autumn basin ringed by grey cliffs under heavy cloud, Utah",
  "Utah/000057110032.jpg": "A hiker in a white beanie and purple jacket stands with trekking poles beside a dog in a misty autumn valley, Utah",
  "Utah/000057110035-2.jpg": "Out-of-focus yellow aspen leaves in front of a stand of autumn aspens, Utah",
  "Utah/000076620027.jpg": "A lone hiker crosses a boulder field below a steep scree-covered mountainside, Utah",
  "Utah/000076620031.jpg": "A steep, striated rock ridge dropping into a forested valley, ranges of mountains beyond, Utah",
  "Utah/000076620033.jpg": "A hiker with trekking poles stands on a rocky ridge under a wide blue sky, peaks all around, Utah",
  "Utah/000094060008.jpg": "Black-and-white: a jagged rocky ridgeline under a sky full of cloud, Utah",
  "Utah/000094060024.jpg": "Black-and-white: a hiker silhouetted against the sun beside a row of jagged rock spires, Utah",
  "Utah/000094060025.jpg": "Black-and-white: a wall of fractured granite above a field of rounded boulders under a dark sky, Utah",
  "Utah/000094060034.jpg": "Black-and-white: looking down on a hiker scrambling through a jumble of large boulders, Utah",
  "Iceland/000017650013.jpg": "A swimmer in a calm, wide river below a low range of hills under a pale sky, Iceland",
  "Iceland/000017650022.jpg": "A person with red hair, seen from behind, looks over a mossy green gorge as a seabird flies past, Iceland",
  "Iceland/000017660032.jpg": "Two people in rain jackets, seen from behind, look up a steep green canyon at tall waterfalls, Iceland",
  "Iceland/000017700012.jpg": "A field of purple and pink lupines below snow-streaked mountains, Iceland",
  "Iceland/000017700013.jpg": "Close-up of lupine spikes against a pale sky, snow-capped mountains low on the horizon, Iceland",
  "Iceland/000017700019.jpg": "A slope of purple lupines rising to a steep mountainside in low sun, Iceland",
  "Iceland/000017700020.jpg": "A person in a black dress stands waist-deep in lupines, looking away, snow-capped mountains behind, Iceland",
  "Iceland/000017700032.jpg": "A figure on a bench silhouetted against a fjord at sunset, dark mountains on the far shore, Iceland",
  "Iceland/000017730006.jpg": "A hiker with a backpack stands on a grassy hill overlooking a broad green plain to the sea, Iceland",
  "Iceland/000017730034-2.jpg": "A person in a blue life jacket carries a packraft and paddle across a mossy riverbank under grey sky, Iceland",
  "Pottery/000029550036.jpg": "A potter at a wheel in a cluttered studio, seen past white bisque pots in the foreground",
  "Pottery/000029560006.jpg": "A potter in a brown zip jacket wipes their hands with a rag between wheel stations",
  "Pottery/000029560007.jpg": "Overhead view of a ribbed clay form on a wheel being dried with a torch",
  "Pottery/000029560008.jpg": "A potter in a maroon jacket and jeans dries a ribbed clay form on the wheel with a torch",
  "Pottery/000029560015.jpg": "A potter in a green top wedges clay on a paint-spattered table in a warmly lit studio",
  "Pottery/000029560016.jpg": "Close-up of hands wedging a ball of clay on a paint-spattered table",
  "Pottery/000029560019.jpg": "Black-and-white portrait of a person in safety goggles and a respirator",
  "Pottery/000029560020.jpg": "A person in a respirator sprays glaze onto a bowl in a spray booth",
};

// The /photography filters, top to bottom: the places, then (after a small gap) the filters that
// aren't places. A folder with no photos is hidden until it has some. A folder that isn't listed
// here is added to the end of the places.
export const filterGroups: FolderName[][] = [
  ["Utah", "Iceland", "New Mexico", "Hawaii"],
  ["Pottery"],
];

// The all-photos view. First these, in this order: the original grid, read left to right…
export const allPhotosLead: PhotoFile[] = [
  "photo25.jpg", "photo4.jpg", "photo1.jpg", "photo27.jpg", "photo18.jpg", "photo16.jpg",
  "photo19.jpg", "photo17.jpg", "photo6.jpg", "photo21.jpg", "photo9.jpg", "photo22.jpg",
  "photo10.jpg", "photo23.jpg", "photo11.jpg", "photo26.jpg", "photo13.jpg", "photo12.jpg",
  "photo28.jpg", "photo14.jpg", "photo8.jpg", "photo30.jpg", "photo5.jpg", "photo20.jpg",
  "photo2.jpg", "photo3.jpg",
];

// …then every other place photo, one place at a time in this rotation (each place in folder
// order), then the photos of the filters that aren't places.
export const newPhotoRotation: FolderName[] = ["Iceland", "Utah", "Hawaii", "New Mexico"];
