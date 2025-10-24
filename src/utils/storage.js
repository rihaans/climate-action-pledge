/**
 * Local Storage utility functions for Climate Action Pledge
 * Handles all data persistence operations
 */

const STORAGE_KEY = 'climate_pledges';

/**
 * Initialize storage with sample data if empty
 */
export const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const samplePledges = generateSamplePledges(75);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePledges));
  }
};

/**
 * Get all pledges from localStorage
 */
export const getAllPledges = () => {
  try {
    const pledges = localStorage.getItem(STORAGE_KEY);
    return pledges ? JSON.parse(pledges) : [];
  } catch (error) {
    console.error('Error reading pledges:', error);
    return [];
  }
};

/**
 * Save a new pledge to localStorage
 */
export const savePledge = (pledgeData) => {
  try {
    const pledges = getAllPledges();
    const newPledge = {
      id: generatePledgeId(pledges.length + 1),
      ...pledgeData,
      timestamp: new Date().toISOString(),
      stars: calculateStars(pledgeData.commitments.length)
    };
    pledges.unshift(newPledge); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pledges));
    return newPledge;
  } catch (error) {
    console.error('Error saving pledge:', error);
    throw new Error('Failed to save pledge');
  }
};

/**
 * Generate unique pledge ID
 */
export const generatePledgeId = (number) => {
  return `CLP-${String(number).padStart(4, '0')}`;
};

/**
 * Calculate stars based on commitment count
 */
export const calculateStars = (commitmentCount) => {
  if (commitmentCount >= 7) return 5;
  if (commitmentCount >= 4) return 4;
  return 3;
};

/**
 * Get pledge statistics for KPI dashboard
 */
export const getPledgeStats = () => {
  const pledges = getAllPledges();
  return {
    total: pledges.length,
    students: pledges.filter(p => p.profileType === 'Student').length,
    workingProfessionals: pledges.filter(p => p.profileType === 'Working Professional').length,
    others: pledges.filter(p => p.profileType === 'Other').length,
    workshops: Math.floor(pledges.length / 10) // 1 workshop per 10 pledges
  };
};

/**
 * Generate sample pledges for demonstration
 */
const generateSamplePledges = (count) => {
  const names = [
    'Aarav Sharma', 'Ananya Patel', 'Arjun Kumar', 'Diya Singh', 'Ishaan Verma',
    'Kavya Reddy', 'Rohan Gupta', 'Saanvi Iyer', 'Vihaan Mehta', 'Aisha Khan',
    'Dev Nair', 'Isha Joshi', 'Kabir Malhotra', 'Myra Kapoor', 'Advait Desai',
    'Navya Rao', 'Reyansh Bose', 'Siya Agarwal', 'Vivaan Pillai', 'Zara Saxena',
    'Aditya Chawla', 'Kiara Trivedi', 'Arnav Kulkarni', 'Priya Menon', 'Ayaan Shah',
    'Avni Choudhury', 'Dhruv Banerjee', 'Tanvi Pandey', 'Shivansh Jain', 'Anvi Shetty'
  ];

  const states = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat',
    'Rajasthan', 'Kerala', 'West Bengal', 'Telangana', 'Uttar Pradesh',
    'Madhya Pradesh', 'Haryana', 'Punjab', 'Andhra Pradesh', 'Odisha'
  ];

  const profileTypes = ['Student', 'Working Professional', 'Other'];

  const commitments = [
    'Save electricity', 'Use renewable energy', 'Reduce water usage',
    'Use public transport', 'Eat plant-based meals', 'Reduce food waste',
    'Recycle & compost', 'Avoid single-use plastics', 'Spread climate awareness'
  ];

  const pledges = [];

  for (let i = 0; i < count; i++) {
    const numCommitments = Math.floor(Math.random() * 7) + 3; // 3-9 commitments
    const selectedCommitments = commitments
      .sort(() => 0.5 - Math.random())
      .slice(0, numCommitments);

    const daysAgo = Math.floor(Math.random() * 90); // Last 90 days
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - daysAgo);

    pledges.push({
      id: generatePledgeId(i + 1),
      name: names[Math.floor(Math.random() * names.length)],
      email: `user${i + 1}@example.com`,
      mobile: `98${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      state: states[Math.floor(Math.random() * states.length)],
      profileType: profileTypes[Math.floor(Math.random() * profileTypes.length)],
      commitments: selectedCommitments,
      timestamp: timestamp.toISOString(),
      stars: calculateStars(selectedCommitments.length)
    });
  }

  return pledges.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

/**
 * Clear all pledges (for testing)
 */
export const clearAllPledges = () => {
  localStorage.removeItem(STORAGE_KEY);
};
