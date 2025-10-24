import React, { useRef } from 'react';
import { Download, Share2, X, Award, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';

/**
 * Certificate Component
 * Generates and displays personalized certificate
 */
const Certificate = ({ pledge, onClose }) => {
  const certificateRef = useRef(null);

  if (!pledge) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  const handleDownload = async () => {
    try {
      const certificate = certificateRef.current;
      if (!certificate) return;

      const canvas = await html2canvas(certificate, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      const link = document.createElement('a');
      link.download = `Climate-Pledge-Certificate-${pledge.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const handleShare = (platform) => {
    const text = `I just took the Climate Action Pledge! Join me in making a difference for our planet. #ClimateAction #CoolEnoughToCare`;
    const url = window.location.href;

    let shareUrl;
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-7 h-7 text-primary-600" />
            Your Climate Pledge Certificate
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close certificate"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate */}
        <div className="p-6">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-primary-50 via-white to-ocean-50 border-8 border-primary-500 rounded-xl p-12 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-200 rounded-full -translate-x-16 -translate-y-16 opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-ocean-200 rounded-full translate-x-20 translate-y-20 opacity-30"></div>
            <div className="absolute top-1/2 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-primary-500 to-ocean-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  Climate Action Champion
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  Certificate of Commitment
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-ocean-500 mx-auto rounded-full"></div>
              </div>

              {/* Main text */}
              <div className="text-center mb-8">
                <p className="text-xl text-gray-700 mb-6">
                  This certifies that
                </p>
                <p className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                  {pledge.name}
                </p>
                <p className="text-xl text-gray-700 mb-4">
                  has pledged to take climate action by committing to
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-6">
                  {pledge.commitments.length} sustainable practices
                </p>
              </div>

              {/* Cool Enough to Care */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border-2 border-primary-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                  <p className="text-3xl font-bold text-gray-900">
                    Cool Enough to Care!
                  </p>
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                <div className="text-center">
                  <p className="text-4xl mb-2">
                    {renderStars(pledge.stars)}
                  </p>
                  <p className="text-lg text-gray-600 font-semibold">
                    Love for Planet Rating
                  </p>
                </div>
              </div>

              {/* Commitments List */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-center font-bold text-gray-900 mb-4 text-xl">
                  Your Commitments:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {pledge.commitments.map((commitment, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="text-primary-500 font-bold">✓</span>
                      <span>{commitment}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer info */}
              <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold">Pledge ID</p>
                  <p className="text-primary-600 font-mono">{pledge.id}</p>
                </div>
                <div>
                  <p className="font-semibold">Date</p>
                  <p>{formatDate(pledge.timestamp)}</p>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{pledge.state}, India</p>
                </div>
              </div>

              {/* Signature line */}
              <div className="mt-8 pt-6 border-t-2 border-gray-300">
                <div className="text-center">
                  <div className="inline-block">
                    <p className="text-2xl font-bold text-primary-600 mb-1">Climate Action Movement</p>
                    <p className="text-sm text-gray-600">Together for a Sustainable Future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Certificate
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Share on Twitter
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="bg-[#4267B2] hover:bg-[#365899] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Share on Facebook
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="bg-[#0077B5] hover:bg-[#006399] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Share on LinkedIn
            </button>

            <button
              onClick={() => handleShare('whatsapp')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
