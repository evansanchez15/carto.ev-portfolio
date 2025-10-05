'use client';

import Image from "next/image";
import Link from "next/link";
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
        } catch (recaptchaError) {
          console.error('reCAPTCHA error:', recaptchaError);
          setError('Security verification failed. Please try again.');
          setIsSubmitting(false);
          return;
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
      {/* Header */}
      <div className="bg-[#EBEBEB] py-4 sm:py-6 md:py-8">
        <div className="relative flex justify-start items-center pl-4 sm:pl-6 md:pl-8 pr-4 sm:pr-6 md:pr-8">
          <Link href="/" className="inline-block">
            <h1 className="text-[#424242] text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] font-bold leading-none tracking-[0.05em] hover:text-[#626262] transition-colors" style={{ fontFamily: 'Futura, Arial, sans-serif' }}>
              CARTO.EV
            </h1>
          </Link>
          
          {/* Socials Section */}
          <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2">
            <div className="flex space-x-2 sm:space-x-3 md:space-x-4 justify-end">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/carto.ev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#424242] rounded-lg flex items-center justify-center hover:bg-[#333333] transition-colors"
                  >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Twitter/X */}
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#424242] rounded-lg flex items-center justify-center hover:bg-[#333333] transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl ml-3 sm:ml-4 md:ml-6 px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Column - Photo & Bio */}
          <div>
            {/* Professional Photo */}
            <div className="mb-8">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 mx-auto md:mx-0 relative overflow-hidden rounded-lg">
                <Image
                  src="/assets/images/portfolio/photography/contact.jpeg"
                  alt="Evan Sanchez"
                  fill
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
                I&apos;m a cartographer and photographer passionate about visual storytelling through maps and imagery. 
                My work focuses on creating clear, impactful visualizations that serve journalism, research, and advocacy.
              </p>
              <p className="text-[#666666] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Let&apos;s collaborate to bring your spatial stories to life.
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
