/**
 * Converts time string (e.g., "7:50" or "7:05") to minutes since midnight
 * @param {string} timeStr - Time in format "H:MM" or "HH:MM"
 * @returns {number} Minutes since midnight, or null if invalid
 */
export const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.trim()) return null;

  const parts = timeStr.trim().split(':');
  if (parts.length !== 2) return null;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
};

/**
 * Converts minutes to hours with decimal precision
 * @param {number} minutes - Total minutes
 * @returns {number} Hours as decimal (e.g., 8.5 for 8 hours 30 minutes)
 */
export const minutesToHours = (minutes) => {
  if (!minutes || minutes < 0) return 0;
  return Math.round((minutes / 60) * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculates work hours between check-in and check-out times
 * @param {string} checkIn - Check-in time (e.g., "7:50")
 * @param {string} checkOut - Check-out time (e.g., "16:30")
 * @returns {number} Hours worked (decimal)
 */
export const calculateWorkHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const checkInMinutes = timeToMinutes(checkIn);
  const checkOutMinutes = timeToMinutes(checkOut);

  if (checkInMinutes === null || checkOutMinutes === null) return 0;
  if (checkOutMinutes <= checkInMinutes) return 0; // Invalid time range

  const workMinutes = checkOutMinutes - checkInMinutes;
  return minutesToHours(workMinutes);
};

/**
 * Formats hours to display string
 * @param {number} hours - Hours as decimal
 * @returns {string} Formatted string (e.g., "8.5 hours" or "8 hours 30 min")
 */
export const formatHours = (hours) => {
  if (!hours || hours === 0) return "0 hours";

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  }

  return `${wholeHours}h ${minutes}m`;
};

/**
 * Validates time format (H:MM or HH:MM)
 * @param {string} timeStr - Time string to validate
 * @returns {boolean} True if valid format
 */
export const isValidTimeFormat = (timeStr) => {
  if (!timeStr || !timeStr.trim()) return false;
  const parts = timeStr.trim().split(':');
  if (parts.length !== 2) return false;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  return !isNaN(hours) && !isNaN(minutes) &&
         hours >= 0 && hours <= 23 &&
         minutes >= 0 && minutes <= 59;
};

