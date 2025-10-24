import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import {
  validateName,
  validateEmail,
  validateMobile,
  validateState,
  validateProfileType,
  validateCommitments,
  formatMobile,
  INDIAN_STATES
} from '../utils/validators';
import { savePledge } from '../utils/storage';
import PrivacyNote from './PrivacyNote';

/**
 * PledgeForm Component
 * Comprehensive form with validation and error handling
 */
const PledgeForm = ({ onPledgeSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profileType: '',
    commitments: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState(null);

  // Commitment themes
  const commitmentThemes = [
    {
      title: 'Energy & Resources',
      icon: '⚡',
      commitments: [
        'Save electricity',
        'Use renewable energy',
        'Reduce water usage'
      ]
    },
    {
      title: 'Transportation & Food',
      icon: '🚌',
      commitments: [
        'Use public transport',
        'Eat plant-based meals',
        'Reduce food waste'
      ]
    },
    {
      title: 'Waste & Advocacy',
      icon: '♻️',
      commitments: [
        'Recycle & compost',
        'Avoid single-use plastics',
        'Spread climate awareness'
      ]
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    // Real-time validation for specific fields
    if (field === 'mobile') {
      const formatted = formatMobile(value);
      setFormData(prev => ({ ...prev, mobile: formatted }));
    }

    if (field === 'email' && value.includes('@')) {
      const emailValidation = validateEmail(value);
      if (emailValidation.suggestion) {
        setEmailSuggestion(emailValidation.suggestion);
      } else {
        setEmailSuggestion(null);
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let validation;

    switch (field) {
      case 'name':
        validation = validateName(formData.name);
        break;
      case 'email':
        validation = validateEmail(formData.email);
        break;
      case 'mobile':
        validation = validateMobile(formData.mobile);
        break;
      case 'state':
        validation = validateState(formData.state);
        break;
      case 'profileType':
        validation = validateProfileType(formData.profileType);
        break;
      case 'commitments':
        validation = validateCommitments(formData.commitments);
        break;
      default:
        return;
    }

    if (!validation.valid) {
      setErrors(prev => ({ ...prev, [field]: validation.error }));
    }
  };

  const handleCommitmentToggle = (commitment) => {
    setFormData(prev => {
      const commitments = prev.commitments.includes(commitment)
        ? prev.commitments.filter(c => c !== commitment)
        : [...prev.commitments, commitment];
      return { ...prev, commitments };
    });

    if (errors.commitments) {
      setErrors(prev => ({ ...prev, commitments: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const allFields = ['name', 'email', 'mobile', 'state', 'profileType', 'commitments'];
    const newErrors = {};
    let hasErrors = false;

    allFields.forEach(field => {
      let validation;

      switch (field) {
        case 'name':
          validation = validateName(formData.name);
          break;
        case 'email':
          validation = validateEmail(formData.email);
          break;
        case 'mobile':
          validation = validateMobile(formData.mobile);
          break;
        case 'state':
          validation = validateState(formData.state);
          break;
        case 'profileType':
          validation = validateProfileType(formData.profileType);
          break;
        case 'commitments':
          validation = validateCommitments(formData.commitments);
          break;
      }

      if (!validation.valid) {
        newErrors[field] = validation.error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched(
        allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      return;
    }

    // Submit the form
    setIsSubmitting(true);

    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPledge = savePledge(formData);

      // Call success callback
      if (onPledgeSuccess) {
        onPledgeSuccess(newPledge);
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        state: '',
        profileType: '',
        commitments: []
      });
      setErrors({});
      setTouched({});
      setEmailSuggestion(null);

    } catch (error) {
      setErrors({ submit: 'Failed to submit pledge. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pledge-form" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Take Your <span className="text-primary-600">Climate Pledge</span>
          </h2>
          <p className="text-xl text-gray-600">
            Make your commitment to a sustainable future
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Personal Information
            </h3>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.name && touched.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                  }`}
                  placeholder="Enter your full name"
                  aria-invalid={errors.name && touched.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email && touched.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                  }`}
                  placeholder="your.email@example.com"
                  aria-invalid={errors.email && touched.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {emailSuggestion && !errors.email && (
                  <p className="mt-2 text-sm text-blue-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {emailSuggestion}
                  </p>
                )}
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.mobile && touched.mobile
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                  }`}
                  placeholder="98765-43210"
                  maxLength="11"
                  aria-invalid={errors.mobile && touched.mobile}
                  aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                />
                {errors.mobile && touched.mobile && (
                  <p id="mobile-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Privacy Note */}
              <PrivacyNote />

              {/* State Dropdown */}
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  onBlur={() => handleBlur('state')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.state && touched.state
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                  }`}
                  aria-invalid={errors.state && touched.state}
                  aria-describedby={errors.state ? 'state-error' : undefined}
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && touched.state && (
                  <p id="state-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.state}
                  </p>
                )}
              </div>

              {/* Profile Type Radio Buttons */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Profile Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {['Student', 'Working Professional', 'Other'].map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="profileType"
                        value={type}
                        checked={formData.profileType === type}
                        onChange={(e) => handleInputChange('profileType', e.target.value)}
                        className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.profileType && touched.profileType && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.profileType}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Commitments */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Your Commitments
            </h3>

            <div className="space-y-6">
              {commitmentThemes.map((theme, themeIndex) => (
                <div key={themeIndex} className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">{theme.icon}</span>
                    {theme.title}
                  </h4>
                  <div className="space-y-3">
                    {theme.commitments.map((commitment, commitmentIndex) => (
                      <label
                        key={commitmentIndex}
                        className="flex items-center gap-3 p-3 bg-white border-2 rounded-lg cursor-pointer hover:bg-primary-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.commitments.includes(commitment)}
                          onChange={() => handleCommitmentToggle(commitment)}
                          className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-gray-700 font-medium">{commitment}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {errors.commitments && touched.commitments && (
              <p className="mt-4 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.commitments}
              </p>
            )}

            {formData.commitments.length > 0 && (
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm font-semibold text-primary-800">
                  {formData.commitments.length} commitment{formData.commitments.length !== 1 ? 's' : ''} selected
                  {formData.commitments.length >= 7 && ' - Amazing! ⭐⭐⭐⭐⭐'}
                  {formData.commitments.length >= 4 && formData.commitments.length < 7 && ' - Great! ⭐⭐⭐⭐'}
                  {formData.commitments.length < 4 && ' - Good start! ⭐⭐⭐'}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {errors.submit}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-500 to-ocean-500 hover:from-primary-600 hover:to-ocean-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Submitting Your Pledge...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Submit My Pledge
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By submitting, you agree to join the climate action movement
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PledgeForm;
