import express from 'express';
import { getInsurancePolicies, createInsurancePolicy } from '../controllers/insuranceController.js';

const router = express.Router();

router.route('/').get(getInsurancePolicies).post(createInsurancePolicy);

export default router;
