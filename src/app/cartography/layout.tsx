import { ogImages, pageMetadata } from "../page-metadata";

// page.tsx in this segment is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Cartography & GIS",
  description: "Editorial maps, GIS analysis and dashboards for newsrooms, nonprofits, engineering firms and agencies.",
  path: "/cartography",
  image: ogImages.cartography,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
