export const CONFIG_STORAGE_KEY = 'timesheet_config';
const DATA_STORAGE_PREFIX = 'timesheet_data_';

/**
 * Get storage key for month data
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {string} Storage key
 */
const getMonthDataKey = (year, month) => {
  return `${DATA_STORAGE_PREFIX}${year}_${month}`;
};

/**
 * Save configuration to localStorage
 * @param {object} config - Configuration object
 */
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config to localStorage:', error);
  }
};

/**
 * Load configuration from localStorage
 * @returns {object|null} Configuration object or null if not found
 */
export const loadConfig = () => {
  try {
    const configStr = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (configStr) {
      return JSON.parse(configStr);
    }
  } catch (error) {
    console.error('Error loading config from localStorage:', error);
  }
  return null;
};

/**
 * Clear configuration from localStorage
 */
export const clearConfig = () => {
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing config from localStorage:', error);
  }
};

/**
 * Save month data to localStorage
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {object} data - Month data object containing:
 *   - timeEntries: { [day]: { checkIn, checkOut } }
 *   - dayStatuses: { [day]: { notGoing, holiday } }
 *   - paidLeaveUsed: number
 */
export const saveMonthData = (year, month, data) => {
  try {
    const key = getMonthDataKey(year, month);
    const dataToSave = {
      timeEntries: data.timeEntries || {},
      dayStatuses: data.dayStatuses || {},
      paidLeaveUsed: data.paidLeaveUsed || 0,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving month data to localStorage:', error);
  }
};

/**
 * Load month data from localStorage
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {object|null} Month data object or null if not found
 */
export const loadMonthData = (year, month) => {
  try {
    const key = getMonthDataKey(year, month);
    const dataStr = localStorage.getItem(key);
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      return {
        timeEntries: parsed.timeEntries || {},
        dayStatuses: parsed.dayStatuses || {},
        paidLeaveUsed: parsed.paidLeaveUsed || 0,
      };
    }
  } catch (error) {
    console.error('Error loading month data from localStorage:', error);
  }
  return null;
};

/**
 * Clear month data from localStorage
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 */
export const clearMonthData = (year, month) => {
  try {
    const key = getMonthDataKey(year, month);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing month data from localStorage:', error);
  }
};

/**
 * Get all stored month keys
 * @returns {string[]} Array of storage keys
 */
export const getAllMonthKeys = () => {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(DATA_STORAGE_PREFIX)) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.error('Error getting all month keys:', error);
    return [];
  }
};

