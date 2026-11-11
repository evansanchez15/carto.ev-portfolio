'use client';

import Image from "next/image";
import Header from "@/components/Header";
// Imported directly (not via the photo registry) so this client page bundles one image, not all 31.
import portraitImage from "../../../public/assets/images/optimized/photography/contact.jpg";
import { portrait } from "@/content/about";
import { useState, FormEvent, useEffect } from "react";

// Declare grecaptcha type
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured');
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let recaptchaToken = '';
      
      // Get reCAPTCHA token
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey && recaptchaLoaded && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });
          console.log('reCAPTCHA token obtained successfully');
        } catch (recaptchaError) {
          console.error('reCAPTCHA client error:', recaptchaError);
          // Don't block submission - just log the error and continue
          console.warn('Continuing without reCAPTCHA token');
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success popup
        setShowSuccessPopup(true);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        // Hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <div className="max-w-4xl ml-3 sm:ml-4 md:ml-6 px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Column - Photo & Bio */}
          <div>
            {/* Professional Photo */}
            <div className="mb-8">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 mx-auto md:mx-0 relative overflow-hidden rounded-lg">
                <Image
                  src={portraitImage}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 768px) 480px, (min-width: 640px) 384px, 320px"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <h3 className="text-[#333333] text-[20px] sm:text-[24px] md:text-[28px] font-bold mb-4 tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                EVAN SANCHEZ
              </h3>
              <p className="text-[#666666] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                I&apos;m a cartographer and photographer specializing in data-driven visual storytelling. My work blends GIS analysis with clean, editorial design to create maps and imagery used in journalism, research, and public advocacy.
              </p>
              <p className="text-[#666666] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Tools I work with daily: <strong className="text-[#333333]">QGIS, ArcGIS Pro, Adobe Illustrator, Figma, Blender, and LiDAR/DEM</strong> workflows. Whether it&apos;s building disaster dashboards, mapping elections, or documenting landscapes, I focus on clarity, accuracy, and impact.
              </p>
              <p className="text-[#666666] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                I help organizations turn complex spatial data into visuals that inform, persuade, and inspire.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h3 className="text-[#333333] text-[18px] sm:text-[20px] md:text-[24px] font-bold mb-6 tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              LET&apos;S WORK TOGETHER
            </h3>
            
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[#333333] text-[16px] font-bold mb-2 tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg focus:border-[#666666] focus:outline-none text-[16px] text-[#333333]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[#333333] text-[16px] font-bold mb-2 tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg focus:border-[#666666] focus:outline-none text-[16px] text-[#333333]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-[#333333] text-[16px] font-bold mb-2 tracking-[0.05em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg focus:border-[#666666] focus:outline-none text-[16px] text-[#333333] resize-vertical placeholder:text-[#999999]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  placeholder="Tell me about your project..."
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-[14px]">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#424242] text-white px-8 py-3 rounded-lg text-[16px] font-bold tracking-[0.05em] transition-colors ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#333333]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {/* reCAPTCHA Notice */}
              <p className="text-[12px] text-[#999999] mt-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#666666]">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#666666]">
                  Terms of Service
                </a>{' '}
                apply.
              </p>
            </form>

            {/* Direct Contact Info */}
            <div className="mt-8 pt-8 border-t border-[#EEEEEE]">
              <p className="text-[#666666] text-[16px] mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <strong>Email:</strong> <a href="mailto:evanmsanchez15@gmail.com" className="text-[#424242] hover:text-[#333333] transition-colors">evanmsanchez15@gmail.com</a>
              </p>
              <p className="text-[#666666] text-[16px]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <strong>Response time:</strong> Usually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 
                className="text-[24px] font-bold text-[#333333] mb-3 tracking-[0.05em]" 
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Message Sent Successfully!
              </h3>
              
              <p 
                className="text-[16px] text-[#666666] mb-6" 
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Thank you for reaching out! I&apos;ll get back to you within 24-48 hours.
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-[#424242] text-white px-6 py-2 rounded-lg text-[16px] font-bold tracking-[0.05em] hover:bg-[#333333] transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
