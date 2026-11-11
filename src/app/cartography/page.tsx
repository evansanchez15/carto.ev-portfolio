'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { getProject } from "@/content/cartography";

const gondola = getProject("gondola");
const election = getProject("election");
const greatSaltLake = getProject("great-salt-lake");
const hurricane = getProject("hurricane-milton");
const unified = getProject("unified-health");

export default function CartographyPage() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="min-h-screen bg-[#FEFFFE] relative overflow-x-hidden">
      {/* Hero Section Container */}
      <div className="relative w-full h-[85vh] sm:h-[90vh] md:h-screen min-h-[500px] max-h-[1200px] overflow-hidden">
        {/* Topographic Background */}
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/assets/images/portfolio/cartography/Contour3.svg"
            alt="Topographic contour lines background"
            fill
            priority
            className="object-cover object-top md:object-center"
            style={{ zIndex: 0 }}
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Section - Just CARTO.EV */}
          <div className="flex justify-start items-start p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Brand Name - Top Left */}
            <Wordmark className="text-[#424242] text-[56px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] font-black leading-none tracking-[0.05em] cursor-pointer hover:text-[#626262] transition-colors" />
          </div>
          
          {/* Middle Section - EVAN SANCHEZ positioned just ABOVE the green line */}
          <div className="absolute top-[68%] right-4 sm:right-6 md:right-8 lg:right-12" style={{ transform: 'translateY(-100%)' }}>
            <div className="text-right">
              <h2 className="text-[#5B5B5B] text-[28px] sm:text-[38px] md:text-[48px] lg:text-[58px] xl:text-[68px] font-bold leading-tight tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                EVAN<br />
                SANCHEZ
              </h2>
            </div>
          </div>
          
          {/* Spacer to push bottom content down */}
          <div className="flex-1"></div>
          
          {/* Bottom Section - Higher on mobile */}
          <div className="flex justify-between items-end p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Subtitle - Bottom Left */}
            <div>
              <h3 className="text-[#333333] text-[18px] sm:text-[18px] md:text-[24px] lg:text-[28px] font-bold tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                CARTOGRAPHY AS COMMUNICATION
              </h3>
              <p className="text-[#242424] text-[14px] sm:text-[14px] md:text-[18px] lg:text-[20px] font-bold tracking-[0.05em] mt-2 sm:mt-3 md:mt-4 max-w-[280px] sm:max-w-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Designing clear maps that inform journalism, research, and impact
              </p>
            </div>
            
            {/* Contact Button - Bottom Right */}
            <Link href="/contact">
              <button className="bg-[#B9B9B9] text-black px-4 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-[14px] sm:text-[14px] md:text-[16px] font-bold tracking-[0.05em] hover:bg-[#A9A9A9] transition-colors" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                CONTACT
              </button>
            </Link>
          </div>
        </div>
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
      <div className="pt-[60px] sm:pt-12 md:pt-16">
        {/* Large Hero Image - Gondola */}
        <div className="relative w-full">
          {/* Gondola Title and Tools */}
          <div className="mx-[20px] sm:mx-[40px] md:mx-[75px] mb-[40px] md:mb-[60px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-x-4 sm:flex-wrap border-b border-black pb-0 mb-[4px]">
              <h4 className="text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-italic tracking-[0.05em] leading-none mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                {`${gondola.title} - ${gondola.year}`}
              </h4>
              <p className="text-black text-[10px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-bold leading-none text-right min-w-0 sm:ml-auto mt-0 sm:mt-0 mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                {gondola.tools}
              </p>
            </div>
          </div>
          
          <div className="mx-[20px] sm:mx-[40px] md:mx-[75px] mb-[150px] sm:mb-[200px] md:mb-[250px]">
            <Image
              src={gondola.image.src}
              alt={gondola.image.alt}
              width={gondola.image.width}
              height={gondola.image.height}
              sizes="(min-width: 768px) calc(100vw - 150px), (min-width: 640px) calc(100vw - 80px), calc(100vw - 40px)"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

            {/* Election Map */}
            <div className="relative w-full mb-[100px] sm:mb-[130px] md:mb-[170px] overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Text section - shows first on mobile, right side on desktop */}
                <div className="flex-1 min-w-0 mx-[20px] sm:mx-[40px] lg:mx-[20px] lg:pt-[200px] lg:pr-[20px] xl:pr-[40px] order-1 lg:order-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-x-4 sm:flex-wrap overflow-hidden border-b border-black pb-0 mb-[4px]">
                    <h4 className="text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-italic tracking-[0.05em] leading-none mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                      {`${election.title} - ${election.year}`}
                    </h4>
                    <p className="text-black text-[10px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-bold leading-none text-right min-w-0 sm:ml-auto mt-0 sm:mt-0 mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {election.tools}
                    </p>
                  </div>
                  <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[10px] lg:mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {election.description}
                  </p>
                </div>
                
                {/* Map image - shows second on mobile, left side on desktop */}
                <div className="mx-[20px] sm:mx-[40px] lg:ml-[170px] lg:mr-[60px] flex-shrink-0 lg:w-[600px] xl:w-[700px] order-2 lg:order-1">
                  <div 
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal(election.modalSrc)}
                  >
                    <img
                      src={election.image.src}
                      alt={election.image.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        display: 'block'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Great Salt Lake Map */}
            <div className="relative w-full mb-[150px] sm:mb-[200px] md:mb-[250px] overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Text section - shows first on mobile, right side on desktop */}
                <div className="flex-1 min-w-0 mx-[20px] sm:mx-[40px] lg:mx-[20px] lg:pt-[400px] lg:pr-[20px] xl:pr-[40px] order-1 lg:order-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-x-4 sm:flex-wrap overflow-hidden border-b border-black pb-0 mb-[4px]">
                    <h4 className="text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-italic tracking-[0.05em] leading-none mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                      {`${greatSaltLake.title} - ${greatSaltLake.year}`}
                    </h4>
                    <p className="text-black text-[10px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-bold leading-none text-right min-w-0 sm:ml-auto mt-0 sm:mt-0 mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {greatSaltLake.tools}
                    </p>
                  </div>
                  <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[10px] lg:mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {greatSaltLake.description}
                  </p>
                </div>
                
                {/* Map image - shows second on mobile, left side on desktop */}
                <div className="mx-[20px] sm:mx-[40px] lg:ml-[170px] lg:mr-[60px] flex-shrink-0 lg:w-[600px] xl:w-[700px] order-2 lg:order-1">
                  <div 
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal(greatSaltLake.modalSrc)}
                  >
                    <Image
                      src={greatSaltLake.image.src}
                      alt={greatSaltLake.image.alt}
                      width={greatSaltLake.image.width}
                      height={greatSaltLake.image.height}
                      sizes="(min-width: 1280px) 700px, (min-width: 1024px) 600px, 100vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
            </div>
          </div>
        </div>

        {/* Hurricane Milton Tracker */}
        <div className="relative w-full mb-[100px] sm:mb-[130px] md:mb-[170px] overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Text section - shows first on mobile, right side on desktop */}
            <div className="flex-1 min-w-0 mx-[20px] sm:mx-[40px] lg:mx-[20px] lg:pt-[120px] lg:pr-[20px] xl:pr-[40px] order-1 lg:order-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-x-4 sm:flex-wrap overflow-hidden border-b border-black pb-0 mb-[4px]">
                <h4 className="text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-italic tracking-[0.05em] leading-none mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                  {`${hurricane.title} - ${hurricane.year}`}
                </h4>
                <p className="text-black text-[10px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-bold leading-none text-right min-w-0 sm:ml-auto mt-0 sm:mt-0 mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {hurricane.tools}
                </p>
              </div>
              <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[10px] lg:mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                {hurricane.description}
              </p>
            </div>
            
            {/* Map image - shows second on mobile, left side on desktop */}
            <div className="mx-[20px] sm:mx-[40px] lg:ml-[170px] lg:mr-[60px] flex-shrink-0 lg:w-[600px] xl:w-[700px] order-2 lg:order-1">
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(hurricane.modalSrc)}
              >
                <Image
                  src={hurricane.image.src}
                  alt={hurricane.image.alt}
                  width={hurricane.image.width}
                  height={hurricane.image.height}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 600px, 100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Unified Health Section */}
        <div className="relative w-full mb-[20px] sm:mb-[25px] md:mb-[30px] overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Text section - shows first on mobile, right side on desktop */}
            <div className="flex-1 min-w-0 mx-[20px] sm:mx-[40px] lg:mx-[20px] lg:pt-[0px] lg:pr-[20px] xl:pr-[40px] order-1 lg:order-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0 sm:gap-x-4 sm:flex-wrap overflow-hidden border-b border-black pb-0 mb-[4px]">
                <h4 className="text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-italic tracking-[0.05em] leading-none mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontStyle: 'italic' }}>
                  {`${unified.title} - ${unified.year}`}
                </h4>
                <p className="text-black text-[10px] xs:text-[10px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-bold leading-none text-right min-w-0 sm:ml-auto mt-0 sm:mt-0 mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {unified.tools}
                </p>
              </div>
              <p className="text-[#636363] text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[10px] lg:mb-0" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                {unified.description}
              </p>
            </div>
            
            {/* Map image - shows second on mobile, left side on desktop */}
            <div className="mx-[20px] sm:mx-[40px] lg:ml-[75px] lg:mr-[60px] flex-shrink-0 lg:w-[600px] xl:w-[700px] order-2 lg:order-1">
              <div 
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(unified.modalSrc)}
              >
                <Image
                  src={unified.image.src}
                  alt={unified.image.alt}
                  width={unified.image.width}
                  height={unified.image.height}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 600px, 100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            </div>
          </div>

          {/* Bottom Grid - Multiple Small Maps */}
          <div className="relative w-full mb-[130px] sm:mb-[150px] md:mb-[170px] mt-[60px] sm:mt-[80px] md:mt-[100px]">
            <div className="mx-[20px] sm:mx-[40px] md:mx-[61px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[40px] sm:gap-[60px] md:gap-[87px]">
              {unified.details.map((detail) => (
                <div key={detail.src} className="relative">
                  <Image
                    src={detail.src}
                    alt={detail.alt}
                    width={detail.width}
                    height={detail.height}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

      <Footer contactButton />

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
