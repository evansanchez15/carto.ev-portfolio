'use client';

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import styles from "./photography.module.css";
import photo1 from "../../../public/assets/images/optimized/photography/photo1.jpg";
import photo3 from "../../../public/assets/images/optimized/photography/photo3.jpg";
import photo4 from "../../../public/assets/images/optimized/photography/photo4.jpg";
import photo5 from "../../../public/assets/images/optimized/photography/photo5.jpg";
import photo6 from "../../../public/assets/images/optimized/photography/photo6.jpg";
import photo8 from "../../../public/assets/images/optimized/photography/photo8.jpg";
import photo9 from "../../../public/assets/images/optimized/photography/photo9.jpg";
import photo10 from "../../../public/assets/images/optimized/photography/photo10.jpg";
import photo11 from "../../../public/assets/images/optimized/photography/photo11.jpg";
import photo12 from "../../../public/assets/images/optimized/photography/photo12.jpg";
import photo13 from "../../../public/assets/images/optimized/photography/photo13.jpg";
import photo14 from "../../../public/assets/images/optimized/photography/photo14.jpg";
import photo16 from "../../../public/assets/images/optimized/photography/photo16.jpg";
import photo17 from "../../../public/assets/images/optimized/photography/photo17.jpg";
import photo18 from "../../../public/assets/images/optimized/photography/photo18.jpg";
import photo19 from "../../../public/assets/images/optimized/photography/photo19.jpg";
import photo20 from "../../../public/assets/images/optimized/photography/photo20.jpg";
import photo21 from "../../../public/assets/images/optimized/photography/photo21.jpg";
import photo22 from "../../../public/assets/images/optimized/photography/photo22.jpg";
import photo23 from "../../../public/assets/images/optimized/photography/photo23.jpg";
import photo24 from "../../../public/assets/images/optimized/photography/photo24.jpg";
import photo25 from "../../../public/assets/images/optimized/photography/photo25.jpg";
import photo26 from "../../../public/assets/images/optimized/photography/photo26.jpg";
import photo27 from "../../../public/assets/images/optimized/photography/photo27.jpg";
import photo28 from "../../../public/assets/images/optimized/photography/photo28.jpg";
import photo30 from "../../../public/assets/images/optimized/photography/photo30.jpg";

type Photo = { src: StaticImageData; alt: string };

const column1: Photo[] = [
  { src: photo25, alt: "Black-and-white view down a jagged granite ridge into a forested valley, Wasatch Range, Utah" },
  { src: photo1, alt: "Rows of colourful houses on a grassy rise above a calm bay at golden hour, Iceland" },
  { src: photo18, alt: "A person in light clothes sits in tall grass in front of a mountain range at dusk, Hawaii" },
  { src: photo19, alt: "Looking up through the spiky leaves of a pandanus tree against a pale sky, Hawaii" },
  { src: photo6, alt: "A blue corrugated-metal shed with a red roof beside a fjord, snow-streaked mountains behind, Iceland" },
  { src: photo9, alt: "A person in a cap and olive jacket leans on a railing beside a wide waterfall, Iceland" },
  { src: photo10, alt: "Two pairs of hiking boots on lichen-covered granite, Wasatch Range, Utah" },
  { src: photo11, alt: "A person in a black dress stands in a field of purple lupines below snow-capped mountains, Iceland" },
  { src: photo13, alt: "A person works at a bench in a studio workshop, lined tubs and shelves of supplies around them, seen past a doorframe" },
  { src: photo28, alt: "Black-and-white: a sheer, striated granite face above a boulder field, Wasatch Range, Utah" },
  { src: photo8, alt: "A blue rowing boat on a wooden dock beneath a red crane arm, a calm fjord behind, Iceland" },
  { src: photo3, alt: "A person in a white beanie and olive jacket, seen from behind, looks over a bay of small islands beside red-roofed houses, Iceland" },
];

const column2: Photo[] = [
  { src: photo4, alt: "Houses along a low rocky point on a still bay, a distant headland on the horizon, Iceland" },
  { src: photo16, alt: "Palm fronds silhouetted against a low sun over the coast, Hawaii" },
  { src: photo17, alt: "A person in a white top stands with hands behind their head against green mountains and a cloudy sky, Hawaii" },
  { src: photo21, alt: "Late-summer shrubs in the foreground below rugged grey peaks, Wasatch Range, Utah" },
  { src: photo22, alt: "A hiker in a navy fleece and backpack stands among granite boulders, mountains behind, Wasatch Range, Utah" },
  { src: photo23, alt: "Granite boulders above a deep glacial valley and jagged ridgelines, Wasatch Range, Utah" },
  { src: photo26, alt: "Black-and-white portrait of a hiker with a backpack on a boulder field below a pointed peak, Wasatch Range, Utah" },
  { src: photo12, alt: "A sailboat anchored on a glassy fjord at dusk, two swimmers nearby and red-lit mountains behind, Iceland" },
  { src: photo14, alt: "Through a doorway, a person works at a bench at the back of a studio workshop under ventilation ducts" },
  { src: photo30, alt: "Black-and-white: a hiker in a cap looks up at the sky beside a large granite boulder, Wasatch Range, Utah" },
  { src: photo20, alt: "A sandstone cliff edge dropping to blue ocean, a small boat on the horizon, Hawaii" },
  { src: photo5, alt: "A person in shadow sits above a dark crater lake ringed by green hills under heavy cloud, Iceland" },
];

// Grid columns are ~686px wide at most (1400px container), full width below 768px.
const gridSizes = "(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 690px";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — bg is photo24's average colour, so the first paint is never white */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[1118px] overflow-hidden bg-[#7D887C]">
        {/* Hero Background Image */}
        <Image
          src={photo24}
          alt="A hiker with trekking poles crosses a tilted granite ridge under streaked cloud, Wasatch Range, Utah"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          priority
        />
        
        {/* Top Right Corner Image */}
        <div className="absolute top-[20px] right-[20px] sm:top-[30px] sm:right-[50px] md:top-[49px] md:right-[182px] z-10">
          <Image
            src={photo27}
            alt="Black-and-white: a hiker in a cap and backpack looks down from a rocky summit ridge, Wasatch Range, Utah"
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
            {column1.map((photo) => (
              <div key={photo.src.src} className={styles.photoItem}>
                <Image
                  src={photo.src}
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
            {column2.map((photo) => (
              <div key={photo.src.src} className={styles.photoItem}>
                <Image
                  src={photo.src}
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
