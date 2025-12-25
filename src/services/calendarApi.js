import { getDaysInPersianMonth, getEnglishDayName, getCurrentPersianDate, getFingilishMonthName } from '../utils/persianCalendar';

/**
 * Fetch month data for a Persian month
 * This uses local calculation but can be extended to use external APIs
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @returns {Promise<object>} Month data with days information
 */
export const fetchMonthData = async (year, month) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const daysInMonth = getDaysInPersianMonth(year, month);
  const days = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayName = getEnglishDayName(year, month, day);
    const isWeekend = dayName === 'Friday' || dayName === 'Thursday';

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
 * @returns {Promise<object>} Current month data
 */
export const getCurrentMonthData = async () => {
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

