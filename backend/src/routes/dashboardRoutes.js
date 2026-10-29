import express from 'express';
import {
  getDashboardSummary,
  getRecentActivity,
  getReminders,
  getAnalytics,
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary', getDashboardSummary);
router.get('/recent-activity', getRecentActivity);
router.get('/reminders', getReminders);
router.get('/analytics', getAnalytics);

export default router;
