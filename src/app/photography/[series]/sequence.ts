// Lays a series' frames out as rows, in file order, so the page has a rhythm
// rather than a uniform grid. Pure and deterministic: the same frames always give
// the same layout.
//
// - Two portraits in a row sit side by side ("portraits").
// - A run of landscapes cycles through: full width ("wide"), a narrower frame
//   pushed to one side ("inset", alternating sides), then two side by side
//   ("landscapes"). If the next frame can't complete a pair, that step is skipped.
// - A portrait on its own is a narrow frame, set on the side opposite the last inset.
// Square frames are treated as landscapes.

import type { Photo } from "@/content/photography";

export type Side = "left" | "right";

export type Row =
  | { kind: "wide"; photos: [Photo] }
  | { kind: "inset"; side: Side; photos: [Photo] }
  | { kind: "landscapes"; photos: [Photo, Photo] }
  | { kind: "portraits"; photos: [Photo, Photo] }
  | { kind: "portrait"; side: Side; photos: [Photo] };

const isPortrait = (p: Photo | undefined) => p?.orientation === "portrait";
const isLandscape = (p: Photo | undefined) => p !== undefined && !isPortrait(p);

const landscapeCycle = ["wide", "inset", "landscapes"] as const;

export function sequence(frames: Photo[]): Row[] {
  const rows: Row[] = [];
  let step = 0; // position in landscapeCycle
  let side: Side = "right"; // side of the next inset
  let i = 0;

  while (i < frames.length) {
    const photo = frames[i];
    const next = frames[i + 1];

    if (isPortrait(photo)) {
      if (isPortrait(next)) {
        rows.push({ kind: "portraits", photos: [photo, next!] });
        i += 2;
      } else {
        rows.push({ kind: "portrait", side, photos: [photo] });
        side = side === "left" ? "right" : "left";
        i += 1;
      }
      continue;
    }

    let kind = landscapeCycle[step % landscapeCycle.length];
    if (kind === "landscapes" && !isLandscape(next)) {
      step += 1;
      kind = landscapeCycle[step % landscapeCycle.length];
    }
    step += 1;

    if (kind === "landscapes") {
      rows.push({ kind, photos: [photo, next!] });
      i += 2;
    } else if (kind === "inset") {
      rows.push({ kind, side, photos: [photo] });
      side = side === "left" ? "right" : "left";
      i += 1;
    } else {
      rows.push({ kind, photos: [photo] });
      i += 1;
    }
  }

  return rows;
}
