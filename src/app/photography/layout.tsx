import { ogImages, pageMetadata } from "../page-metadata";

// page.tsx in this segment is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Photography",
  description: "Outdoor and lifestyle photography on 35mm film by Evan Sanchez: the Wasatch, Iceland, Hawaii and the workshop.",
  path: "/photography",
  image: ogImages.photography,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
