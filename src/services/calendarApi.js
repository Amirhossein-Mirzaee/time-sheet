import { getDaysInPersianMonth, getEnglishDayName, getCurrentPersianDate, getFingilishMonthName } from '../utils/persianCalendar';

/**
 * Fetch month data for a Persian month
 * This uses local calculation
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @param {object} config - Configuration object with thursdayIsWeekend property
 * @returns {object} Month data with days information
 */
export const fetchMonthData = (year, month, config = {}) => {
  const daysInMonth = getDaysInPersianMonth(year, month);
  const days = [];
  const thursdayIsWeekend = config.thursdayIsWeekend ?? true; // Default to true for backward compatibility

  for (let day = 1; day <= daysInMonth; day++) {
    const dayName = getEnglishDayName(year, month, day);
    // Determine weekend: always Friday, and Thursday if configured
    const isWeekend = dayName === 'Friday' || (thursdayIsWeekend && dayName === 'Thursday');

    days.push({
      day,
      dayName,
      isWeekend,
      persianDate: { year, month, day }
    });
  }

  return {
    year,
    month,
    monthName: getFingilishMonthName(month),
    daysInMonth,
    days
  };
};

/**
 * Get current month data
 * @returns {object} Current month data
 */
export const getCurrentMonthData = () => {
  const current = getCurrentPersianDate();
  return fetchMonthData(current.year, current.month);
};

/**
 * Get list of available years (current year ± 2)
 * @returns {number[]} Array of years
 */
export const getAvailableYears = () => {
  const current = getCurrentPersianDate();
  const years = [];
  for (let i = current.year - 2; i <= current.year + 2; i++) {
    years.push(i);
  }
  return years;
};

