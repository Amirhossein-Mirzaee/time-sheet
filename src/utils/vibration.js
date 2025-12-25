/**
 * Vibration utility for PWA feedback
 */

/**
 * Check if vibration API is supported
 */
export const isVibrationSupported = () => {
  return 'vibrate' in navigator;
};

/**
 * Vibrate device
 * @param {number|number[]} pattern - Vibration pattern in milliseconds
 */
export const vibrate = (pattern = 50) => {
  if (isVibrationSupported()) {
    navigator.vibrate(pattern);
  }
};

/**
 * Success vibration pattern
 */
export const vibrateSuccess = () => {
  vibrate([50, 30, 50]);
};

/**
 * Error vibration pattern
 */
export const vibrateError = () => {
  vibrate([100, 50, 100]);
};

/**
 * Light tap vibration
 */
export const vibrateTap = () => {
  vibrate(10);
};

