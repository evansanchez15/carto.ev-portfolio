import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EBEBEB] relative overflow-hidden">
      {/* Brand Name - Above the photo completely */}
      <div className="absolute top-4 left-4 md:top-6 md:left-12 z-10">
        <h1 className="text-[#C3C3C3] text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-none tracking-tight font-black" style={{ fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif', fontWeight: 900 }}>
          CARTO.EV
        </h1>
      </div>

      {/* Your Name - Higher */}
      <div className="absolute top-8 right-4 md:top-12 md:right-24 z-10 text-right">
        <Link href="/contact">
          <h2 className="text-[#626262] text-[24px] sm:text-[32px] md:text-[48px] lg:text-[60px] leading-none tracking-tight font-black cursor-pointer hover:text-[#424242] transition-colors" style={{ fontFamily: 'var(--font-archivo-black), "Archivo Black", sans-serif', fontWeight: 900 }}>
            EVAN<br />
            SANCHEZ
          </h2>
        </Link>
      </div>

      {/* Main Content Grid - positioned to fill remaining space */}
      <div className="absolute top-20 left-4 right-4 bottom-4 sm:top-24 sm:left-6 sm:right-6 sm:bottom-6 md:top-32 md:left-12 md:right-12 md:bottom-12 flex flex-col md:flex-row">
            {/* Left Section - Cartography */}
            <Link href="/cartography" className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden mb-2 md:mb-0 md:mr-3 block cursor-pointer group">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/images/hero/planet-volumes-SO0alFysHTg-unsplash.jpg"
                  alt="Topographical landscape"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  priority
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors duration-500" />
              
              {/* Text */}
              <div className="absolute bottom-2 left-3 md:bottom-0 md:left-6 z-10">
                    <h3 className="text-white text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.05em] font-helvetica drop-shadow-lg group-hover:text-gray-100 transition-colors duration-500">
                  CARTOGRAPHY
                </h3>
              </div>
            </Link>

            {/* Right Section - Photography */}
            <Link href="/photography" className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden mt-2 md:mt-0 md:ml-3 block cursor-pointer group">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/images/hero/000017650003-2.jpg"
                  alt="Coastal landscape photography"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  priority
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors duration-500" />
              
                  {/* Text */}
                  <div className="absolute bottom-2 right-3 md:bottom-0 md:right-6 z-10">
                    <h3 className="text-white text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.05em] font-helvetica drop-shadow-lg group-hover:text-gray-100 transition-colors duration-500">
                      PHOTOGRAPHY
                    </h3>
                  </div>
            </Link>
      </div>
    </div>
  );
}
