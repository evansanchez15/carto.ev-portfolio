'use client';

import Image from "next/image";
import styles from "./photography.module.css";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { getPhoto } from "@/content/photography";
import { photoImages, type PhotoFile } from "@/content/photo-images";

// Grid order, as on the original site (df1c5a2). The columns aren't height-balanced;
// on mobile the single column shows column1, then column2.
const column1: PhotoFile[] = [
  "photo25.jpg", "photo1.jpg", "photo18.jpg", "photo19.jpg", "photo6.jpg", "photo9.jpg",
  "photo10.jpg", "photo11.jpg", "photo13.jpg", "photo28.jpg", "photo8.jpg", "photo5.jpg",
];

const column2: PhotoFile[] = [
  "photo4.jpg", "photo27.jpg", "photo16.jpg", "photo17.jpg", "photo21.jpg", "photo22.jpg",
  "photo23.jpg", "photo26.jpg", "photo12.jpg", "photo14.jpg", "photo30.jpg", "photo20.jpg",
  "photo2.jpg", "photo3.jpg",
];

const hero = getPhoto("photo24.jpg");
const heroInset = getPhoto("photo27.jpg");

// Grid columns are ~686px wide at most (1400px container), full width below 768px.
const gridSizes = "(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 690px";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — bg is photo24's average colour, so the first paint is never white */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[1118px] overflow-hidden bg-[#7D887C]">
        {/* Hero Background Image */}
        <Image
          src={photoImages[hero.file]}
          alt={hero.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          priority
        />
        
        {/* Top Right Corner Image */}
        <div className="absolute top-[20px] right-[20px] sm:top-[30px] sm:right-[50px] md:top-[49px] md:right-[182px] z-10">
          <Image
            src={photoImages[heroInset.file]}
            alt={heroInset.alt}
            width={200}
            height={133}
            sizes="(min-width: 768px) 445px, (min-width: 640px) 300px, 200px"
            placeholder="blur"
            priority
            className="object-cover sm:w-[300px] sm:h-[200px] md:w-[445px] md:h-[295px]"
          />
        </div>

            {/* Header Text */}
            <div className="absolute top-[32%] sm:top-[40%] right-[20px] sm:right-[50px] md:top-[305px] md:right-[136px] z-10 text-right">
              <Wordmark className="text-white text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] font-black leading-none tracking-[0.05em] cursor-pointer hover:text-gray-200 transition-colors" />
              <h2 className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-bold tracking-normal mt-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                PHOTOGRAPHY
              </h2>
            </div>

            {/* Left Side Vertical Text - Evan Sanchez */}
            <div className="absolute left-[15px] sm:left-[25px] md:left-[40px] bottom-[40px] sm:bottom-[80px] md:top-[900px] z-10">
              <div className="transform -rotate-90 origin-left">
                <h3 className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-normal tracking-normal whitespace-nowrap" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  EVAN SANCHEZ
                </h3>
              </div>
            </div>

            {/* Left Side Vertical Text - Coordinates */}
            <div className="absolute left-[15px] sm:left-[25px] md:left-[40px] bottom-[140px] sm:bottom-[150px] md:top-[750px] z-10">
              <div className="transform -rotate-90 origin-left">
                <p className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-normal tracking-normal whitespace-nowrap" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  40.532602, -111.713069
                </p>
              </div>
            </div>
      </div>

      {/* Photo Grid Section */}
      <div className={styles.photographyGridContainer}>
        <div className={styles.photographyGrid}>
          {/* Column 1 - Left */}
          <div className={styles.column1}>
            {column1.map(getPhoto).map((photo) => (
              <div key={photo.file} className={styles.photoItem}>
                <Image
                  src={photoImages[photo.file]}
                  alt={photo.alt}
                  sizes={gridSizes}
                  placeholder="blur"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          {/* Column 2 - Right */}
          <div className={styles.column2}>
            {column2.map(getPhoto).map((photo) => (
              <div key={photo.file} className={styles.photoItem}>
                <Image
                  src={photoImages[photo.file]}
                  alt={photo.alt}
                  sizes={gridSizes}
                  placeholder="blur"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
