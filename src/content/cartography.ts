// Cartography content: the five projects on /cartography, as they exist today.
// Edit text here; the page reads from this file. Layout and the hand-tuned spacing
// of each section stay in src/app/cartography/page.tsx.
//
// Image paths point into public/assets/images/optimized/cartography/ (never the originals).

export type MapImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CartographyProject = {
  slug: string;
  title: string;
  year: string;
  tools: string;
  description?: string;
  image: MapImage;
  /** Full-resolution image opened in the click-to-zoom modal. */
  modalSrc?: string;
  /** Extra detail views shown below the project. */
  details?: MapImage[];
};

const dir = "/assets/images/optimized/cartography";

export const cartographyProjects = [
  {
    slug: "gondola",
    title: "The Gondola",
    year: "2025",
    tools: "QGIS, Adobe Illustrator, Excel",
    image: { src: `${dir}/GondolaFinal.png`, alt: "Gondola Cartography Project", width: 1578, height: 1081 },
  },
  {
    slug: "election",
    title: "Election Mapping",
    year: "2025",
    tools: "QGIS, Adobe Illustrator, Excel",
    description:
      "This project visualizes the political geography of Utah and Salt Lake City during the 2024 U.S. presidential election. County and precinct-level maps highlight the stark urban–rural divide, showing Salt Lake City as a Democratic enclave in an otherwise Republican state.",
    // A 1400px WebP in a raw <img> on the page; the modal opens the full lossless PNG.
    image: { src: `${dir}/utah-election-2024-1400.webp`, alt: "2024 Presidential Election by County Utah", width: 1400, height: 1103 },
    modalSrc: `${dir}/utah-election-2024.png`,
  },
  {
    slug: "great-salt-lake",
    title: "The Great Salt Lake",
    year: "2025",
    tools: "QGIS, Adobe Illustrator, Excel",
    description:
      "This map illustrates the dramatic decline of the Great Salt Lake, which in August 2025 reached its lowest recorded level. The map combines shaded relief with hydrological datasets to compare historical extents (1984, average, 2024) against the current shoreline. A timeline chart beneath the map contextualizes the lake's fall relative to historical averages, presenting both geographic and temporal dimensions of the crisis.",
    image: { src: `${dir}/GreatSaltLakeFinal.png`, alt: "Great Salt Lake Cartography", width: 717, height: 1043 },
    modalSrc: `${dir}/GreatSaltLakeFinal.png`,
  },
  {
    slug: "hurricane-milton",
    title: "Interactive Web Maps",
    year: "2024",
    tools: "ArcGIS Online, JavaScript, HTML/CSS",
    description:
      "Created dashboards that tracked disaster impacts in real time. This Hurricane Milton tracker integrated live weather data, employee location tracking, and business impact assessments to support emergency response coordination across multiple insurance companies in Florida during the 2024 hurricane season.",
    image: { src: `${dir}/HurricaneDash.png`, alt: "Hurricane Milton Tracker Dashboard", width: 600, height: 482 },
    modalSrc: `${dir}/HurricaneDash.png`,
  },
  {
    slug: "unified-health",
    title: "Unified Health",
    year: "2025",
    tools: "Power BI, SQL Server, ArcGIS",
    description:
      "To support lead management and enrollment tracking at Unified Health, I designed interactive dashboards and geographic maps that visualize call center performance, Medicare Advantage enrollment trends, and LIS/SEP eligibility patterns. These dashboards integrate large-scale lead data with FIPS-level geography, enabling teams to filter by state, county, and product type. Automated SQL pipelines ensure daily refresh, while spatial layers highlight enrollment distribution and market opportunities.",
    image: { src: `${dir}/Unified5.png`, alt: "Unified Health Main Dashboard", width: 700, height: 467 },
    // Known inconsistency: the section shows Unified5 but the modal opens Unified1.
    // Kept as is until Evan confirms which one he wants.
    modalSrc: `${dir}/Unified1.png`,
    details: [
      { src: `${dir}/Unified1.png`, alt: "Unified Map 1", width: 331, height: 209 },
      { src: `${dir}/Unified2.png`, alt: "Unified Map 2", width: 351, height: 245 },
      { src: `${dir}/Unified3.png`, alt: "Unified Map 3", width: 321, height: 245 },
      { src: `${dir}/Unified4.png`, alt: "Unified Map 4", width: 321, height: 245 },
    ],
  },
] as const satisfies readonly CartographyProject[];

type Project = (typeof cartographyProjects)[number];
export type CartographySlug = Project["slug"];

/** Look up a project by slug, typed to that project's own fields. */
export function getProject<S extends CartographySlug>(slug: S) {
  return cartographyProjects.find((p): p is Extract<Project, { slug: S }> => p.slug === slug)!;
}
