import React from 'react';
import { Leaf, ArrowDown } from 'lucide-react';

/**
 * Hero Section Component
 * Eye-catching banner with gradient background and call-to-action
 */
const Hero = () => {
  const scrollToPledgeForm = () => {
    const pledgeSection = document.getElementById('pledge-form');
    if (pledgeSection) {
      pledgeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-ocean-500 to-primary-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6 animate-slide-up">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Leaf className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Join the Climate Action
          <br />
          <span className="text-yellow-300">Movement</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Together, we can create a sustainable future. Every action counts, every pledge matters.
        </p>

        {/* Stats preview */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white/80 text-sm">Target</p>
            <p className="text-white text-2xl font-bold">1,000,000</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white/80 text-sm">Pledges Taken</p>
            <p className="text-yellow-300 text-2xl font-bold">Growing Daily</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={scrollToPledgeForm}
            className="group bg-white text-primary-700 hover:bg-yellow-300 hover:text-primary-900 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-300/50 inline-flex items-center gap-3"
            aria-label="Scroll to pledge form"
          >
            Take the Pledge Now
            <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-white/70 text-sm">
            Join thousands of climate champions making a difference
          </p>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
