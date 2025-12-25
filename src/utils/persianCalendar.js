import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';

/**
 * Persian month names
 */
export const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

/**
 * Fingilish (Persian written in English) month names
 */
export const FINGILISH_MONTHS = [
  'Farvardin',
  'Ordibehesht',
  'Khordad',
  'Tir',
  'Mordad',
  'Shahrivar',
  'Mehr',
  'Aban',
  'Azar',
  'Dey',
  'Bahman',
  'Esfand'
];

/**
 * Persian day names
 */
export const PERSIAN_DAYS = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه'
];

/**
 * English day names
 */
export const ENGLISH_DAYS = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

/**
 * Get current Persian date
 * @returns {object} { year, month, day }
 */
export const getCurrentPersianDate = () => {
  const now = new Date();
  const jalaali = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  return {
    year: jalaali.jy,
    month: jalaali.jm,
    day: jalaali.jd
  };
};

/**
 * Get number of days in a Persian month
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @returns {number} Number of days in the month
 */
export const getDaysInPersianMonth = (year, month) => {
  return jalaaliMonthLength(year, month);
};

/**
 * Get Persian day name for a specific date
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @param {number} day - Day of month
 * @returns {string} Day name in Persian
 */
export const getPersianDayName = (year, month, day) => {
  const gregorian = toGregorian(year, month, day);
  const date = new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
  const dayOfWeek = date.getDay();
  // Convert to Persian week (Saturday = 0)
  const persianDayIndex = (dayOfWeek + 1) % 7;
  return PERSIAN_DAYS[persianDayIndex];
};

/**
 * Get English day name for a specific date
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @param {number} day - Day of month
 * @returns {string} Day name in English
 */
export const getEnglishDayName = (year, month, day) => {
  const gregorian = toGregorian(year, month, day);
  const date = new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
  const dayOfWeek = date.getDay();
  // Convert to English week (Saturday = 0)
  const englishDayIndex = (dayOfWeek + 1) % 7;
  return ENGLISH_DAYS[englishDayIndex];
};

/**
 * Format Persian date string
 * @param {number} year - Persian year
 * @param {number} month - Persian month (1-12)
 * @param {number} day - Day of month
 * @returns {string} Formatted date string
 */
export const formatPersianDate = (year, month, day) => {
  return `${day} ${PERSIAN_MONTHS[month - 1]} ${year}`;
};

/**
 * Get month name in Persian
 * @param {number} month - Month number (1-12)
 * @returns {string} Month name
 */
export const getPersianMonthName = (month) => {
  return PERSIAN_MONTHS[month - 1] || '';
};

/**
 * Get month name in Fingilish (Persian written in English)
 * @param {number} month - Month number (1-12)
 * @returns {string} Month name in Fingilish
 */
export const getFingilishMonthName = (month) => {
  return FINGILISH_MONTHS[month - 1] || '';
};

