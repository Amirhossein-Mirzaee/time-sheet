import express from 'express';
import { UserConfig } from '../models/UserConfig.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user config
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.userId; // Keep as string
    const config = UserConfig.findByUserId(userId);

    res.json({ config });
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({ error: 'Server error getting config' });
  }
});

// Save user config
router.post('/', authenticateToken, (req, res) => {
  try {
    const userId = req.userId; // Keep as string
    const { config } = req.body;

    UserConfig.upsert(userId, config || {});

    res.json({ message: 'Config saved successfully', config: config || {} });
  } catch (error) {
    console.error('Save config error:', error);
    res.status(500).json({ error: 'Server error saving config' });
  }
});

export default router;

