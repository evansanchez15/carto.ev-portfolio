import Image from "next/image";
import Link from "next/link";
import ContactPrompt from "@/components/ContactPrompt";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { displayFont } from "@/components/fonts";
import { getPhoto, publishedSeries } from "@/content/photography";
import { photoImages } from "@/content/photo-images";
import { ogImages, pageMetadata } from "../page-metadata";

export const metadata = pageMetadata({
  title: "Photography",
  description: "Outdoor and lifestyle photography on 35mm film by Evan Sanchez: the Wasatch, Iceland and Hawaii.",
  path: "/photography",
  image: ogImages.photography,
});

const hero = getPhoto("photo24.jpg");
const heroInset = getPhoto("photo27.jpg");

// Same container as the series pages, aligned with the header and footer padding.
const container = "mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8";

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

      {/* Series index: one card per published series */}
      <div className={`${container} pt-12 sm:pt-16 md:pt-20`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
          {publishedSeries.map((s) => {
            const cover = getPhoto(s.cover);
            return (
              <Link key={s.slug} href={`/photography/${s.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#E4E4E1]">
                  <Image
                    src={photoImages[cover.file]}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1440px) 443px, (min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
                <h2
                  className="text-[#424242] text-[24px] sm:text-[28px] md:text-[24px] lg:text-[32px] leading-none tracking-[0.05em] uppercase mt-3 sm:mt-4 group-hover:text-[#626262] transition-colors"
                  style={displayFont}
                >
                  {s.title}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={`${container} mt-20 sm:mt-28 lg:mt-40`}>
        <div className="border-t border-black pt-8 sm:pt-10 md:pt-12">
          <ContactPrompt />
        </div>
      </div>

      <Footer />
    </div>
  );
}
