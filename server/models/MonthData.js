import { readDB, writeDB } from '../database.js';

export class MonthData {
  static findByUserIdAndMonth(userId, year, month) {
    const db = readDB();
    const data = db.monthData.find(
      d => d.userId === userId && d.year === year && d.month === month
    );

    if (!data) {
      return {
        timeEntries: {},
        dayStatuses: {},
        paidLeaveUsed: 0
      };
    }

    return {
      timeEntries: data.timeEntries || {},
      dayStatuses: data.dayStatuses || {},
      paidLeaveUsed: data.paidLeaveUsed || 0
    };
  }

  static upsert(userId, year, month, data) {
    const db = readDB();
    const existingIndex = db.monthData.findIndex(
      d => d.userId === userId && d.year === year && d.month === month
    );

    const monthData = {
      userId: userId,
      year: year,
      month: month,
      timeEntries: data.timeEntries || {},
      dayStatuses: data.dayStatuses || {},
      paidLeaveUsed: data.paidLeaveUsed || 0,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      db.monthData[existingIndex] = monthData;
    } else {
      db.monthData.push(monthData);
    }

    writeDB(db);
  }

  static deleteByUserId(userId) {
    const db = readDB();
    db.monthData = db.monthData.filter(d => d.userId !== userId);
    writeDB(db);
  }
}
