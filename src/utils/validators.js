/**
 * Form validation utilities for Climate Action Pledge
 * Provides validation functions for all form fields
 */

/**
 * Validate name field
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (name.trim().length > 50) {
    return { valid: false, error: 'Name must be less than 50 characters' };
  }
  if (!/^[a-zA-Z\s.]+$/.test(name)) {
    return { valid: false, error: 'Name can only contain letters and spaces' };
  }
  return { valid: true, error: null };
};

/**
 * Validate email field with suggestions
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required', suggestion: null };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address', suggestion: null };
  }

  // Common typo suggestions
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const [localPart, domain] = email.split('@');

  if (domain) {
    const typoMap = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'hotmial.com': 'hotmail.com'
    };

    if (typoMap[domain.toLowerCase()]) {
      return {
        valid: true,
        error: null,
        suggestion: `Did you mean ${localPart}@${typoMap[domain.toLowerCase()]}?`
      };
    }
  }

  return { valid: true, error: null, suggestion: null };
};

/**
 * Validate mobile number (10-digit Indian format)
 */
export const validateMobile = (mobile) => {
  if (!mobile || mobile.trim().length === 0) {
    return { valid: false, error: 'Mobile number is required' };
  }

  // Remove all non-digit characters
  const digits = mobile.replace(/\D/g, '');

  if (digits.length !== 10) {
    return { valid: false, error: 'Mobile number must be exactly 10 digits' };
  }

  // Indian mobile numbers start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digits)) {
    return { valid: false, error: 'Invalid Indian mobile number format' };
  }

  return { valid: true, error: null };
};

/**
 * Format mobile number as user types
 */
export const formatMobile = (mobile) => {
  const digits = mobile.replace(/\D/g, '');

  if (digits.length <= 5) {
    return digits;
  } else if (digits.length <= 10) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5, 10)}`;
};

/**
 * Validate state selection
 */
export const validateState = (state) => {
  if (!state || state === '') {
    return { valid: false, error: 'Please select your state' };
  }
  return { valid: true, error: null };
};

/**
 * Validate profile type selection
 */
export const validateProfileType = (profileType) => {
  if (!profileType || profileType === '') {
    return { valid: false, error: 'Please select your profile type' };
  }
  const validTypes = ['Student', 'Working Professional', 'Other'];
  if (!validTypes.includes(profileType)) {
    return { valid: false, error: 'Invalid profile type' };
  }
  return { valid: true, error: null };
};

/**
 * Validate commitments selection
 */
export const validateCommitments = (commitments) => {
  if (!commitments || commitments.length === 0) {
    return { valid: false, error: 'Please select at least one commitment' };
  }
  if (commitments.length > 9) {
    return { valid: false, error: 'Maximum 9 commitments allowed' };
  }
  return { valid: true, error: null };
};

/**
 * Validate entire form
 */
export const validateForm = (formData) => {
  const errors = {};

  const nameValidation = validateName(formData.name);
  if (!nameValidation.valid) errors.name = nameValidation.error;

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) errors.email = emailValidation.error;

  const mobileValidation = validateMobile(formData.mobile);
  if (!mobileValidation.valid) errors.mobile = mobileValidation.error;

  const stateValidation = validateState(formData.state);
  if (!stateValidation.valid) errors.state = stateValidation.error;

  const profileValidation = validateProfileType(formData.profileType);
  if (!profileValidation.valid) errors.profileType = profileValidation.error;

  const commitmentsValidation = validateCommitments(formData.commitments);
  if (!commitmentsValidation.valid) errors.commitments = commitmentsValidation.error;

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * List of Indian states and union territories
 */
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];
