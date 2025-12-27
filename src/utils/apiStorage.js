/**
 * API-based storage functions
 * Uses Express backend API with MongoDB
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Save configuration to API/MongoDB
 * @param {object} config - Configuration object
 * @param {string} userId - User ID (not needed, handled by token)
 */
export const saveConfig = async (config) => {
  try {
    await apiRequest('/config', {
      method: 'POST',
      body: JSON.stringify({ config }),
    });
  } catch (error) {
    console.error('Error saving config:', error);
    throw error;
  }
};

/**
 * Load configuration from API/MongoDB
 * @param {string} userId - User ID (not needed, handled by token)
 * @returns {object|null} Configuration object or null if not found
 */
export const loadConfig = async () => {
  try {
    const data = await apiRequest('/config');
    return data.config || null;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
};

/**
 * Save month data to API/MongoDB
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {object} data - Month data object
 * @param {string} userId - User ID (not needed, handled by token)
 */
export const saveMonthData = async (year, month, data) => {
  try {
    await apiRequest(`/data/${year}/${month}`, {
      method: 'POST',
      body: JSON.stringify({
        timeEntries: data.timeEntries || {},
        dayStatuses: data.dayStatuses || {},
        paidLeaveUsed: data.paidLeaveUsed || 0,
      }),
    });
  } catch (error) {
    console.error('Error saving month data:', error);
    throw error;
  }
};

/**
 * Load month data from API/MongoDB
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {string} userId - User ID (not needed, handled by token)
 * @returns {object|null} Month data object or null if not found
 */
export const loadMonthData = async (year, month) => {
  try {
    const data = await apiRequest(`/data/${year}/${month}`);
    return {
      timeEntries: data.timeEntries || {},
      dayStatuses: data.dayStatuses || {},
      paidLeaveUsed: data.paidLeaveUsed || 0,
    };
  } catch (error) {
    console.error('Error loading month data:', error);
    return null;
  }
};

/**
 * Clear configuration from API/MongoDB
 * @param {string} userId - User ID (not needed, handled by token)
 */
export const clearConfig = async () => {
  try {
    await apiRequest('/config', {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error clearing config:', error);
    throw error;
  }
};

