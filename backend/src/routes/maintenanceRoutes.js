import express from 'express';
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
  updateMaintenanceStatus,
} from '../controllers/maintenanceController.js';

const router = express.Router();

router.route('/').get(getMaintenanceRecords).post(createMaintenanceRecord);
router.route('/:id/status').patch(updateMaintenanceStatus);

export default router;
