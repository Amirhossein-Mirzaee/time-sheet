import express from 'express';
import { MonthData } from '../models/MonthData.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get month data
router.get('/:year/:month', authenticateToken, (req, res) => {
  try {
    const userId = req.userId; // Keep as string
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const data = MonthData.findByUserIdAndMonth(userId, year, month);

    res.json(data);
  } catch (error) {
    console.error('Get month data error:', error);
    res.status(500).json({ error: 'Server error getting month data' });
  }
});

// Save month data
router.post('/:year/:month', authenticateToken, (req, res) => {
  try {
    const userId = req.userId; // Keep as string
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const { timeEntries, dayStatuses, paidLeaveUsed } = req.body;

    MonthData.upsert(userId, year, month, {
      timeEntries: timeEntries || {},
      dayStatuses: dayStatuses || {},
      paidLeaveUsed: paidLeaveUsed || 0,
    });

    res.json({
      message: 'Month data saved successfully',
      data: {
        timeEntries: timeEntries || {},
        dayStatuses: dayStatuses || {},
        paidLeaveUsed: paidLeaveUsed || 0,
      },
    });
  } catch (error) {
    console.error('Save month data error:', error);
    res.status(500).json({ error: 'Server error saving month data' });
  }
});

export default router;

