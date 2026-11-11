import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import { homePage, pageMetadata, siteName } from "./page-metadata";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  // Fallback for any route without its own metadata. Each route sets its own
  // title, description, canonical and Open Graph image (see page-metadata.ts).
  ...pageMetadata(homePage),
  title: {
    default: `${homePage.title} | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  keywords: ["photography", "cartography", "portfolio", "Evan Sanchez", "maps", "visual storytelling", "journalism", "GIS", "data visualization"],
  authors: [{ name: "Evan Sanchez" }],
  creator: "Evan Sanchez",
  metadataBase: new URL('https://cartoev.com'),
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
