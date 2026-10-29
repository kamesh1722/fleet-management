import express from 'express';
import { getAlerts, markAlertAsRead, resolveAlert } from '../controllers/alertController.js';

const router = express.Router();

router.route('/').get(getAlerts);
router.route('/:id/read').patch(markAlertAsRead);
router.route('/:id/resolve').patch(resolveAlert);

export default router;
