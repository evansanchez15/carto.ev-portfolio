'use client';

import Image from "next/image";
import Link from "next/link";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[1118px] overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="/assets/images/portfolio/photography/photo24.jpg"
          alt="Photography Hero"
          fill
          className="object-cover"
          priority
        />
        
        {/* Top Right Corner Image */}
        <div className="absolute top-[20px] right-[20px] sm:top-[30px] sm:right-[50px] md:top-[49px] md:right-[182px] z-10">
          <Image
            src="/assets/images/portfolio/photography/photo27.jpg"
            alt="Portfolio piece"
            width={200}
            height={133}
            className="object-cover sm:w-[300px] sm:h-[200px] md:w-[445px] md:h-[295px]"
          />
        </div>

            {/* Header Text */}
            <div className="absolute top-[32%] sm:top-[40%] right-[20px] sm:right-[50px] md:top-[305px] md:right-[136px] z-10 text-right">
              <Link href="/">
                <h1 className="text-white text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] font-bold leading-none tracking-[0.05em] cursor-pointer hover:text-gray-200 transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  CARTO.EV
                </h1>
              </Link>
              <h2 className="text-white text-[10px] sm:text-[12px] md:text-[14px] font-bold tracking-normal -mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
      <div className="photography-grid-container">
        <div className="photography-grid">
          {/* Column 1 - Left */}
          <div className="column-1">
            {[
              "photo25.jpg",
              "photo1.jpg",
              "photo18.jpg", 
              "photo19.jpg",
              "photo6.jpg",
              "photo9.jpg",              
              "photo10.jpg",
              "photo11.jpg",
              "photo13.jpg",
              "photo28.jpg",
              "photo8.jpg",
              "photo5.jpg",
            ].map((filename) => (
              <div key={filename} className="photo-item">
                <Image
                  src={`/assets/images/portfolio/photography/${filename}`}
                  alt="Photography portfolio"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          {/* Column 2 - Right */}
          <div className="column-2">
            {[
              "photo4.jpg",
              "photo27.jpg",
              "photo16.jpg",
              "photo17.jpg",
              "photo21.jpg",
              "photo22.jpg",
              "photo23.jpg",
              "photo26.jpg", 
              "photo12.jpg",
              "photo14.jpg",
              "photo30.jpg",
              "photo20.jpg",
              "photo2.jpg",
              "photo3.jpg",
            ].map((filename) => (
              <div key={filename} className="photo-item">
                <Image
                  src={`/assets/images/portfolio/photography/${filename}`}
                  alt="Photography portfolio"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#E4E4E1] py-8 sm:py-12 md:py-16 mt-10 sm:mt-15 md:mt-20">
        <div className="pl-4 sm:pl-6 md:pl-8 flex flex-col sm:flex-row sm:items-end sm:justify-between pr-4 sm:pr-6 md:pr-8">
          {/* Large Footer Text */}
          <div className="text-left mb-4 sm:mb-0">
            <Link href="/">
              <h2 className="text-[#424242] text-[60px] sm:text-[90px] md:text-[120px] lg:text-[180px] font-bold leading-none tracking-[0.05em] cursor-pointer hover:text-[#626262] transition-colors" style={{ fontFamily: 'Futura, Arial, sans-serif' }}>
                CARTO.EV
              </h2>
            </Link>
          </div>
          
          {/* Email */}
          <div className="text-left sm:text-right sm:pb-4 md:pb-6">
            <p className="text-[#424242] text-[16px] sm:text-[18px] md:text-[20px] tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <a href="mailto:evanmsanchez15@gmail.com" className="hover:text-[#626262] transition-colors">
                evanmsanchez15@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .photography-grid-container {
          padding: 60px 10px 20px 10px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .photography-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          align-items: start;
        }

        .photo-item {
          position: relative;
          overflow: hidden;
          border-radius: 0;
          background: transparent;
          margin-bottom: 8px;
        }

        .column-1 {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .column-2 {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .photography-grid {
            grid-template-columns: 1fr;
          }
          
          .column-1 {
            grid-column: 1;
          }
          
          .column-2 {
            grid-column: 1;
          }
          
          .photography-grid-container {
            padding: 10px 10px;
          }
        }
      `}</style>
    </div>
  );
}
