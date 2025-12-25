/**
 * Default constants for salary calculation (used as fallback)
 */
export const DEFAULT_MONTHLY_SALARY = 30000000; // 30 million Tomans
export const DEFAULT_REQUIRED_HOURS = 176; // Required hours per month
export const DEFAULT_PAID_LEAVE_HOURS = 20; // Paid leave hours

/**
 * Calculates hourly rate based on monthly salary and required hours
 * @param {number} monthlySalary - Monthly salary in Tomans
 * @param {number} requiredHours - Required hours per month
 * @returns {number} Hourly rate in Tomans
 */
export const getHourlyRate = (monthlySalary, requiredHours) => {
  if (!monthlySalary || !requiredHours || requiredHours === 0) return 0;
  return monthlySalary / requiredHours;
};

/**
 * Calculates salary based on worked hours
 * @param {number} totalHours - Total hours worked
 * @param {number} paidLeaveUsed - Hours of paid leave used
 * @param {object} config - Configuration object with monthlySalary, requiredHours, paidLeaveHours
 * @returns {object} Salary calculation details
 */
export const calculateSalary = (
  totalHours,
  paidLeaveUsed = 0,
  config = {
    monthlySalary: DEFAULT_MONTHLY_SALARY,
    requiredHours: DEFAULT_REQUIRED_HOURS,
    paidLeaveHours: DEFAULT_PAID_LEAVE_HOURS,
  }
) => {
  const { monthlySalary, requiredHours, paidLeaveHours } = config;
  const effectiveHours = totalHours + Math.min(paidLeaveUsed, paidLeaveHours);
  const hourlyRate = getHourlyRate(monthlySalary, requiredHours);

  // If worked more than required, calculate overtime
  const regularHours = Math.min(effectiveHours, requiredHours);
  const overtimeHours = Math.max(0, effectiveHours - requiredHours);

  // Overtime is typically 1.5x the hourly rate
  const overtimeRate = hourlyRate * 1.5;

  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * overtimeRate;
  const totalPay = regularPay + overtimePay;

  const hoursRemaining = Math.max(0, requiredHours - effectiveHours);
  const hoursOver = Math.max(0, effectiveHours - requiredHours);

  return {
    totalHours: effectiveHours,
    regularHours,
    overtimeHours,
    hourlyRate,
    regularPay,
    overtimePay,
    totalPay,
    hoursRemaining,
    hoursOver,
    paidLeaveUsed: Math.min(paidLeaveUsed, paidLeaveHours),
    paidLeaveRemaining: Math.max(0, paidLeaveHours - paidLeaveUsed),
    monthlySalary,
    requiredHours,
    paidLeaveHours,
  };
};

/**
 * Formats currency in Tomans
 * @param {number} amount - Amount in Tomans
 * @returns {string} Formatted string with commas
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(Math.round(amount));
};

