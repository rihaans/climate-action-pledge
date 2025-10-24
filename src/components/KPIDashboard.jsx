import React, { useState, useEffect } from 'react';
import { Target, Users, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { getPledgeStats } from '../utils/storage';

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

/**
 * KPI Card Component
 */
const KPICard = ({ icon: Icon, label, value, color, isAnimated = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 animate-slide-up">
      <div className="flex items-center gap-4">
        <div className={`${color} p-4 rounded-xl`}>
          <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-800">
            {isAnimated ? <AnimatedCounter value={value} /> : value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * KPI Dashboard Component
 * Displays live statistics about pledges taken
 */
const KPIDashboard = ({ refreshTrigger = 0 }) => {
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    workingProfessionals: 0,
    others: 0,
    workshops: 0
  });

  const TARGET_PLEDGES = 1000000;

  useEffect(() => {
    updateStats();
  }, [refreshTrigger]);

  const updateStats = () => {
    const pledgeStats = getPledgeStats();
    setStats(pledgeStats);
  };

  const progressPercentage = (stats.total / TARGET_PLEDGES) * 100;

  return (
    <section id="kpi-dashboard" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Live Impact Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track our collective progress towards a sustainable future
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Progress to Target</p>
              <p className="text-2xl font-bold text-primary-600">
                <AnimatedCounter value={stats.total} /> / {TARGET_PLEDGES.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-600">
                {progressPercentage.toFixed(3)}%
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-ocean-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            >
              <div className="w-full h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Pledges */}
          <KPICard
            icon={Target}
            label="Total Pledges"
            value={stats.total}
            color="bg-gradient-to-br from-primary-500 to-primary-600"
          />

          {/* Students */}
          <KPICard
            icon={GraduationCap}
            label="Students"
            value={stats.students}
            color="bg-gradient-to-br from-ocean-500 to-ocean-600"
          />

          {/* Working Professionals */}
          <KPICard
            icon={Briefcase}
            label="Working Professionals"
            value={stats.workingProfessionals}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />

          {/* Workshops/Events */}
          <KPICard
            icon={Calendar}
            label="Workshops Organized"
            value={stats.workshops}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
          />
        </div>

        {/* Additional Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-6 py-3 rounded-full">
            <Users className="w-5 h-5" />
            <p className="font-semibold">
              {stats.others.toLocaleString()} others have also joined the movement
            </p>
          </div>
        </div>

        {/* Motivational message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            Every pledge brings us closer to our goal. Together, we're creating lasting change!
          </p>
        </div>
      </div>
    </section>
  );
};

export default KPIDashboard;
