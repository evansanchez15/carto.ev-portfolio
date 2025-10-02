'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartographyPage() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="min-h-screen bg-[#FEFFFE] relative">
      {/* Topographic Background - Header Area */}
      <div className="absolute top-0 left-0 w-full h-[100vh] min-h-[800px] max-h-[1400px] overflow-hidden opacity-80">
        <Image
          src="/assets/images/portfolio/cartography/Contour3.svg"
          alt="Topographic contour lines background"
          width={1728}
          height={1117}
          className="object-cover object-top w-full h-auto"
          style={{ zIndex: 0 }}
        />
      </div>
      {/* Brand Name - Top Left */}
      <div className="absolute top-[30px] left-[20px] sm:top-[50px] sm:left-[40px] md:top-[67px] md:left-[67px] z-10">
        <Link href="/">
          <h1 className="text-[#424242] text-[48px] sm:text-[72px] md:text-[96px] lg:text-[128px] font-bold leading-none tracking-[0.05em] cursor-pointer hover:text-[#626262] transition-colors" style={{ fontFamily: 'Futura, Arial, sans-serif' }}>
            CARTO.EV
          </h1>
        </Link>
      </div>

      {/* Your Name - Top Right */}
      <div className="absolute top-[15%] sm:top-[18%] md:top-[20%] lg:top-[25%] xl:top-[30%] right-[20px] sm:right-[30px] md:right-[40px] z-10 text-right">
        <h2 className="text-[#5B5B5B] text-[36px] sm:text-[56px] md:text-[76px] lg:text-[96px] font-bold leading-tight tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          EVAN<br />
          SANCHEZ
        </h2>
      </div>

      {/* Subtitle */}
      <div className="absolute top-[45%] sm:top-[50%] md:top-[55%] lg:top-[60%] xl:top-[65%] left-[20px] sm:left-[30px] md:left-[36px] z-10">
        <h3 className="text-[#333333] text-[16px] sm:text-[22px] md:text-[28px] font-bold tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          CARTOGRAPHY AS COMMUNICATION
        </h3>
        <p className="text-[#242424] text-[12px] sm:text-[16px] md:text-[20px] font-bold tracking-[0.05em] mt-[15px]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          Designing clear maps that inform journalism,<br />
          research, and impact
        </p>
      </div>

      {/* Contact Button */}
      <div className="absolute top-[65%] sm:top-[70%] md:top-[75%] lg:top-[80%] xl:top-[85%] right-[20px] sm:right-[30px] md:right-[36px] z-10">
        <Link href="/contact">
          <button className="bg-[#B9B9B9] text-black px-[16px] py-[8px] sm:px-[20px] sm:py-[10px] md:px-[24px] md:py-[12px] rounded-lg text-[14px] sm:text-[15px] md:text-[16px] font-bold tracking-[0.05em] hover:bg-[#A9A9A9] transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            CONTACT
          </button>
        </Link>
      </div>

      {/* Green Decorative Elements - Minimal Accent */}
      <div 
        style={{
          position: 'absolute',
          top: '400px',
          right: '250px',
          zIndex: 15
        }}
      >
        {/* Small green triangle accent */}
        <svg width="8" height="6" fill="none">
          <path 
            d="M4 1 L7 5 L1 5 Z" 
            stroke="#C3CE9D" 
            strokeWidth="1" 
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: 'max(100vh, 800px)' }}>
        {/* Large Hero Image - Gondola */}
        <div className="relative w-full">
          {/* Gondola Title and Tools */}
          <div className="mx-[20px] sm:mx-[40px] md:mx-[75px] mb-[40px] md:mb-[60px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
              <h4 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-italic tracking-[0.05em] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                The Gondola - 2025
              </h4>
              <p className="text-black text-[14px] sm:text-[18px] md:text-[24px] font-bold leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                QGIS, Adobe Illustrator, Excel
              </p>
            </div>
            {/* Horizontal line */}
            <div className="w-full h-[1px] bg-black mt-2 sm:mt-0"></div>
          </div>
          
          <div className="mx-[20px] sm:mx-[40px] md:mx-[75px] mb-[150px] sm:mb-[200px] md:mb-[250px]">
            <Image
              src="/assets/images/portfolio/cartography/GondolaFinal.png"
              alt="Gondola Cartography Project"
              width={1578}
              height={1081}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

            {/* Election Map */}
            <div className="relative w-full mb-[100px] sm:mb-[130px] md:mb-[170px]">
              <div className="flex flex-col md:flex-row">
                <div className="mx-[20px] sm:mx-[40px] md:ml-[170px] md:mr-[60px] flex-shrink-0 md:w-[700px] mb-[30px] md:mb-0">
                  <div 
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal("/assets/images/portfolio/cartography/utah-election-2024.png")}
                  >
                    <img
                      src="/assets/images/portfolio/cartography/utah-election-2024.png"
                      alt="2024 Presidential Election by County Utah"
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        display: 'block'
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1 mx-[20px] sm:mx-[40px] md:mx-0 md:pt-[200px] md:pr-[100px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                    <h4 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-italic tracking-[0.05em] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                      Election Mapping - 2025
                    </h4>
                    <p className="text-black text-[14px] sm:text-[18px] md:text-[24px] font-bold leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      QGIS, Adobe Illustrator, Excel
                    </p>
                  </div>
                  {/* Horizontal line */}
                  <div className="w-full h-[1px] bg-black mt-2 sm:mt-0 mb-[8px]"></div>
                  <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    This project visualizes the political geography of Utah and Salt Lake City during the 2024 U.S. presidential election. County and precinct-level maps highlight the stark urban–rural divide, showing Salt Lake City as a Democratic enclave in an otherwise Republican state.
                  </p>
                </div>
              </div>
            </div>

            {/* Great Salt Lake Map */}
            <div className="relative w-full mb-[150px] sm:mb-[200px] md:mb-[250px]">
              <div className="flex flex-col md:flex-row">
                <div className="mx-[20px] sm:mx-[40px] md:ml-[170px] md:mr-[60px] flex-shrink-0 md:w-[700px] mb-[30px] md:mb-0">
                  <div 
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal("/assets/images/portfolio/cartography/GreatSaltLakeFinal.png")}
                  >
                    <Image
                      src="/assets/images/portfolio/cartography/GreatSaltLakeFinal.png"
                      alt="Great Salt Lake Cartography"
                      width={717}
                      height={1043}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
            <div className="flex-1 mx-[20px] sm:mx-[40px] md:mx-0 md:pt-[400px] md:pr-[100px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                <h4 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-italic tracking-[0.05em] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                  The Great Salt Lake - 2025
                </h4>
                <p className="text-black text-[14px] sm:text-[18px] md:text-[24px] font-bold leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  QGIS, Adobe Illustrator, Excel
                </p>
              </div>
              {/* Horizontal line */}
              <div className="w-full h-[1px] bg-black mt-2 sm:mt-0 mb-[8px]"></div>
              <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                This map illustrates the dramatic decline of the Great Salt Lake, which in August 2025 reached its lowest recorded level. The map combines shaded relief with hydrological datasets to compare historical extents (1984, average, 2024) against the current shoreline. A timeline chart beneath the map contextualizes the lake&apos;s fall relative to historical averages, presenting both geographic and temporal dimensions of the crisis.
              </p>
            </div>
          </div>
        </div>

        {/* Unified Health Section */}
        <div className="relative w-full mb-[20px] sm:mb-[25px] md:mb-[30px]">
          <div className="flex flex-col md:flex-row">
            <div className="mx-[20px] sm:mx-[40px] md:ml-[75px] md:mr-[60px] flex-shrink-0 md:w-[700px] mb-[30px] md:mb-0">
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal("/assets/images/portfolio/cartography/Unified1.png")}
              >
                <Image
                  src="/assets/images/portfolio/cartography/Unified1.png"
                  alt="Unified Health Main Dashboard"
                  width={700}
                  height={467}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            
            <div className="flex-1 mx-[20px] sm:mx-[40px] md:mx-0 md:pt-[0px] md:pr-[100px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                <h4 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-italic tracking-[0.05em] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                  Unified Health - 2025
                </h4>
                <p className="text-black text-[14px] sm:text-[18px] md:text-[24px] font-bold leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Power BI, SQL Server, ArcGIS
                </p>
              </div>
              {/* Horizontal line */}
              <div className="w-full h-[1px] bg-black mt-2 sm:mt-0 mb-[8px]"></div>
              <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                To support lead management and enrollment tracking at Unified Health, I designed interactive dashboards and geographic maps that visualize call center performance, Medicare Advantage enrollment trends, and LIS/SEP eligibility patterns. These dashboards integrate large-scale lead data with FIPS-level geography, enabling teams to filter by state, county, and product type. Automated SQL pipelines ensure daily refresh, while spatial layers highlight enrollment distribution and market opportunities.
              </p>
            </div>
          </div>

          {/* Bottom Grid - Multiple Small Maps */}
          <div className="relative w-full mb-[130px] sm:mb-[150px] md:mb-[170px] mt-[60px] sm:mt-[80px] md:mt-[100px]">
            <div className="mx-[20px] sm:mx-[40px] md:mx-[61px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[40px] sm:gap-[60px] md:gap-[87px]">
              {/* First Row */}
              <div className="relative">
                <Image
                  src="/assets/images/portfolio/cartography/Unified5.png"
                  alt="Unified Map 1"
                  width={331}
                  height={209}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="relative">
                <Image
                  src="/assets/images/portfolio/cartography/Unified2.png"
                  alt="Unified Map 2"
                  width={351}
                  height={245}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="relative">
                <Image
                  src="/assets/images/portfolio/cartography/Unified3.png"
                  alt="Unified Map 3"
                  width={321}
                  height={245}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="relative">
                <Image
                  src="/assets/images/portfolio/cartography/Unified4.png"
                  alt="Unified Map 4"
                  width={321}
                  height={245}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Hurricane Milton Tracker */}
        <div className="relative w-full mb-[100px] sm:mb-[130px] md:mb-[170px]">
          <div className="flex flex-col md:flex-row">
            <div className="mx-[20px] sm:mx-[40px] md:ml-[170px] md:mr-[60px] flex-shrink-0 md:w-[700px] mb-[30px] md:mb-0">
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal("/assets/images/portfolio/cartography/HurricaneDash.png")}
              >
                <Image
                  src="/assets/images/portfolio/cartography/HurricaneDash.png"
                  alt="Hurricane Milton Tracker Dashboard"
                  width={600}
                  height={482}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            
            <div className="flex-1 mx-[20px] sm:mx-[40px] md:mx-0 md:pt-[120px] md:pr-[100px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                <h4 className="text-black text-[18px] sm:text-[20px] md:text-[24px] font-italic tracking-[0.05em] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                  Interactive Web Maps - 2024
                </h4>
                <p className="text-black text-[14px] sm:text-[16px] md:text-[18px] font-bold leading-none sm:text-right sm:whitespace-nowrap" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  ArcGIS Online, JavaScript, HTML/CSS
                </p>
              </div>
              {/* Horizontal line */}
              <div className="w-full h-[1px] bg-black mt-2 sm:mt-0 mb-[8px]"></div>
              <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Created dashboards that tracked disaster impacts in real time. This Hurricane Milton tracker integrated live weather data, employee location tracking, and business impact assessments to support emergency response coordination across multiple insurance companies in Florida during the 2024 hurricane season.
              </p>
            </div>
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

      {/* Modal for Full-Screen Image */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-auto"
          onClick={closeModal}
        >
          <div className="min-h-screen flex items-start justify-center p-4">
            <div className="relative">
              <Image
                src={modalImage}
                alt="Full-screen view"
                width={1753}
                height={957}
                className="max-w-none h-auto"
                style={{ minWidth: '1753px' }}
              />
              {/* Close button */}
              <button
                onClick={closeModal}
                className="fixed top-6 right-6 text-white text-3xl font-bold hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                aria-label="Close modal"
              >
                ×
              </button>
              {/* Instructions */}
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
                <p className="text-sm opacity-75 bg-black bg-opacity-50 px-4 py-2 rounded">Click anywhere to close • Scroll to view full image</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
