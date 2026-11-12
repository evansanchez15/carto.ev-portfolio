import type { Metadata } from "next";

// Per-route metadata. Child openGraph/twitter objects replace the root ones
// rather than merging, so each route gets the full set from here.

export const siteName = "CARTO.EV";

export const ogImages = {
  home: {
    url: "/assets/images/og/home-split.jpg",
    alt: "A shaded-relief terrain map beside a film photograph of a person looking out over a bay in Iceland",
  },
  photography: {
    url: "/assets/images/og/photo24.jpg",
    alt: "A hiker with trekking poles crosses a tilted granite ridge under streaked cloud, Wasatch Range, Utah",
  },
  cartography: {
    url: "/assets/images/og/cartography.jpg",
    alt: "The Gondola, an editorial map of Little Cottonwood Canyon, Utah, by Evan Sanchez",
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string; // omitted only for the root layout's fallback, so no route inherits a canonical
  image: { url: string; alt: string };
};

export const homePage = {
  title: "Evan Sanchez — Cartography & Photography",
  description:
    "Cartography and photography by Evan Sanchez: editorial maps and GIS analysis for journalism, research and advocacy, and outdoor lifestyle photography shot on 35mm film.",
  image: ogImages.home,
};

export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      title: fullTitle,
      description,
      ...(path && { url: path }),
      siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
