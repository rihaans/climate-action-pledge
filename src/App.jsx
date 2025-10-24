import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Hero from './components/Hero';
import KPIDashboard from './components/KPIDashboard';
import WhyTakeAction from './components/WhyTakeAction';
import PledgeForm from './components/PledgeForm';
import Certificate from './components/Certificate';
import PledgeWall from './components/PledgeWall';
import { initializeStorage } from './utils/storage';

/**
 * Main App Component
 * Integrates all sections and manages state
 */
function App() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentPledge, setCurrentPledge] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Initialize storage with sample data
    initializeStorage();
  }, []);

  const handlePledgeSuccess = (pledge) => {
    // Show success animation
    triggerConfetti();

    // Set current pledge for certificate
    setCurrentPledge(pledge);
    setShowCertificate(true);

    // Trigger refresh for KPI dashboard and pledge wall
    setRefreshTrigger(prev => prev + 1);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from different positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#0ea5e9', '#eab308', '#f97316']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#0ea5e9', '#eab308', '#f97316']
      });
    }, 250);

    // Additional burst at the center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#0ea5e9', '#eab308', '#f97316']
      });
    }, 100);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    setCurrentPledge(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* KPI Dashboard */}
      <KPIDashboard refreshTrigger={refreshTrigger} />

      {/* Why Take Action */}
      <WhyTakeAction />

      {/* Pledge Form */}
      <PledgeForm onPledgeSuccess={handlePledgeSuccess} />

      {/* Pledge Wall */}
      <PledgeWall refreshTrigger={refreshTrigger} />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary-600 to-ocean-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Climate Action Movement</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Together, we're building a sustainable future. Every pledge counts, every action matters.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="#hero" className="text-white/90 hover:text-white transition-colors">
                Home
              </a>
              <a href="#kpi-dashboard" className="text-white/90 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="#why-take-action" className="text-white/90 hover:text-white transition-colors">
                Why Join
              </a>
              <a href="#pledge-form" className="text-white/90 hover:text-white transition-colors">
                Take Pledge
              </a>
              <a href="#pledge-wall" className="text-white/90 hover:text-white transition-colors">
                Wall of Champions
              </a>
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/70 text-sm">
                &copy; {new Date().getFullYear()} Climate Action Movement. Built with passion for the planet.
              </p>
              <p className="text-white/70 text-sm mt-2">
                Join us in making a difference. #CoolEnoughToCare
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {showCertificate && currentPledge && (
        <Certificate pledge={currentPledge} onClose={handleCloseCertificate} />
      )}
    </div>
  );
}

export default App;
