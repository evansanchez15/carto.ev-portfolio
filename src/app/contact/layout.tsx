import { ogImages, pageMetadata } from "../page-metadata";

// page.tsx in this segment is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Evan Sanchez about cartography, GIS or photography projects.",
  path: "/contact",
  image: ogImages.photography,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
