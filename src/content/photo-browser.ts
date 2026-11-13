// Builds the /photography grid and filters from the place folders (places.generated.ts) and the
// words and order in photography.ts. Runs on the server; the page passes the result to the client.
import type { StaticImageData } from "next/image";
import { photoImages, type PhotoFile } from "./photo-images";
import { allPhotosLead, filterGroups, folderPhotoAlt, getPhoto, newPhotoRotation } from "./photography";
import { folders, type FolderName, type PlaceFolder } from "./places.generated";

export type BrowserPhoto = {
  /** photoN.jpg for the original frames, "Folder/file.jpg" for the rest. */
  id: string;
  image: StaticImageData;
  alt: string;
  /** Slug of the filter (folder) the photo belongs to. */
  filter: string;
};

export type Filter = { name: string; slug: string; count: number };

function toBrowserPhoto(folder: PlaceFolder, photo: PlaceFolder["photos"][number]): BrowserPhoto {
  if ("existing" in photo) {
    return {
      id: photo.existing,
      image: photoImages[photo.existing],
      alt: getPhoto(photo.existing).alt,
      filter: folder.slug,
    };
  }
  return { id: photo.key, image: photo.image, alt: folderPhotoAlt[photo.key], filter: folder.slug };
}

export function photoBrowserData(): { photos: BrowserPhoto[]; filterGroups: Filter[][] } {
  const byName = new Map(folders.map((f) => [f.name, f]));
  const listed = new Set(filterGroups.flat());
  const unlisted = folders.map((f) => f.name).filter((name) => !listed.has(name));
  const groups: FolderName[][] = filterGroups.map((group, i) => (i === 0 ? [...group, ...unlisted] : group));

  // Every folder photo, per folder, in folder order.
  const perFolder = new Map<FolderName, BrowserPhoto[]>(
    folders.map((f) => [f.name, f.photos.map((photo) => toBrowserPhoto(f, photo))]),
  );
  const existingIn = new Map<PhotoFile, BrowserPhoto>();
  for (const list of perFolder.values()) {
    for (const photo of list) if (!photo.id.includes("/")) existingIn.set(photo.id as PhotoFile, photo);
  }

  // 1. The lead photos. Each must be in a folder, or it couldn't be filtered.
  const placed = new Set<string>();
  const ordered: BrowserPhoto[] = allPhotosLead.map((file) => {
    const photo = existingIn.get(file);
    if (!photo) throw new Error(`${file} is in allPhotosLead but not in any place folder`);
    placed.add(photo.id);
    return photo;
  });
  const remaining = (name: FolderName) => (perFolder.get(name) ?? []).filter((p) => !placed.has(p.id));

  // 2. The other place photos, one from each place in turn.
  const places = groups[0] ?? [];
  const rotation = [...newPhotoRotation, ...places.filter((name) => !newPhotoRotation.includes(name))];
  const queues = rotation.map(remaining);
  while (queues.some((q) => q.length)) {
    for (const queue of queues) {
      const photo = queue.shift();
      if (photo) ordered.push(photo);
    }
  }

  // 3. The filters that aren't places, in order.
  for (const name of groups.slice(1).flat()) ordered.push(...remaining(name));

  // A filter with no photos (an empty folder) is hidden.
  const filters = groups
    .map((group) =>
      group
        .map((name) => byName.get(name))
        .filter((f): f is PlaceFolder => !!f && f.photos.length > 0)
        .map((f) => ({ name: f.name, slug: f.slug, count: f.photos.length })),
    )
    .filter((group) => group.length > 0);

  return { photos: ordered, filterGroups: filters };
}
