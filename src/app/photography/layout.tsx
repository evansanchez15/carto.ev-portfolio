import { ogImages, pageMetadata } from "../page-metadata";

// page.tsx in this segment is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Photography",
  description: "Outdoor lifestyle and adventure photography by Evan Sanchez, shot on 35mm film in Utah's Wasatch Range, Iceland and Hawaii.",
  path: "/photography",
  image: ogImages.photography,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
