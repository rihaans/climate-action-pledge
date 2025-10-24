import React from 'react';
import { Heart, Globe, TrendingUp, Users } from 'lucide-react';

/**
 * WhyTakeAction Section Component
 * Compelling content about climate action importance
 */
const WhyTakeAction = () => {
  return (
    <section id="why-take-action" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Your Pledge <span className="text-primary-600">Matters</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-ocean-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-ocean-50 rounded-2xl p-8 md:p-12 animate-slide-up">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary-500 p-3 rounded-xl flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Individual Responsibility, Collective Power</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Climate change is the defining challenge of our generation, and every single one of us has a role to play.
              Your individual actions—whether it's conserving energy, reducing waste, or choosing sustainable
              transportation—create ripples that extend far beyond your immediate surroundings. When you take the
              pledge, you're not just making a personal commitment; you're joining a movement of conscious citizens
              who understand that real change begins with individual responsibility.
            </p>
          </div>

          <div className="bg-gradient-to-br from-ocean-50 to-purple-50 rounded-2xl p-8 md:p-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-ocean-500 p-3 rounded-xl flex-shrink-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Part of a Global Movement</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              You're not alone in this journey. Thousands of students, professionals, and changemakers across India
              and around the world are taking similar pledges every day. Together, we form a powerful network of
              climate champions who inspire each other, share best practices, and demonstrate that sustainable living
              is not only possible but also rewarding. Our collective voice amplifies the urgency for systemic change
              while our collective actions create immediate, measurable impact in our communities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Small Actions, Measurable Impact</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Don't underestimate the power of your commitments. If just 10,000 people pledge to save electricity,
              we could reduce carbon emissions equivalent to planting 50,000 trees annually. When 10,000 individuals
              switch to public transport once a week, we prevent thousands of tons of CO₂ from entering our atmosphere.
              Your pledge to reduce food waste, use renewable energy, or spread climate awareness creates a domino
              effect—inspiring friends, family, and colleagues to do the same. The data is clear: individual actions,
              when multiplied across our growing community, lead to transformative environmental outcomes.
            </p>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Join a Community</h4>
            <p className="text-gray-600">
              Connect with like-minded individuals committed to climate action
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-ocean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-ocean-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Track Your Impact</h4>
            <p className="text-gray-600">
              See how your commitments contribute to our collective goals
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Make a Difference</h4>
            <p className="text-gray-600">
              Every action counts towards a sustainable, livable planet
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary-500 to-ocean-500 rounded-2xl p-1">
            <div className="bg-white rounded-xl px-8 py-6">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                The time for climate action is NOW
              </p>
              <p className="text-lg text-gray-600">
                Take your pledge today and be the change you wish to see in the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTakeAction;
