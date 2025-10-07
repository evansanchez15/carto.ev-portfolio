import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "Evan Sanchez - Photography & Cartography Portfolio",
  description: "Photography and cartography portfolio by Evan Sanchez. Specializing in visual storytelling through maps and imagery, creating clear impactful visualizations for journalism, research, and advocacy.",
  keywords: ["photography", "cartography", "portfolio", "Evan Sanchez", "maps", "visual storytelling", "journalism", "GIS", "data visualization"],
  authors: [{ name: "Evan Sanchez" }],
  creator: "Evan Sanchez",
  metadataBase: new URL('https://cartoev.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Evan Sanchez - Photography & Cartography Portfolio",
    description: "Photography and cartography portfolio by Evan Sanchez. Specializing in visual storytelling through maps and imagery.",
    url: 'https://cartoev.com',
    siteName: 'CARTO.EV',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Evan Sanchez - Photography & Cartography Portfolio",
    description: "Photography and cartography portfolio by Evan Sanchez",
    creator: '@carto_ev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/images/portfolio/cartography/Circle.png',
    apple: '/assets/images/portfolio/cartography/Circle.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${archivoBlack.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
