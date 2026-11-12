import { ogImages, pageMetadata } from "../page-metadata";

// page.tsx in this segment is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Cartography & GIS",
  description: "Editorial and environmental cartography, GIS analysis and dashboards by Evan Sanchez, for newsrooms, nonprofits, engineering firms and government agencies.",
  path: "/cartography",
  image: ogImages.cartography,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
