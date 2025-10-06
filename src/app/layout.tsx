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
  description: "Photography and cartography portfolio by Evan Sanchez",
  icons: {
    icon: '/assets/images/portfolio/photography/contact.jpeg',
    apple: '/assets/images/portfolio/photography/contact.jpeg',
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
