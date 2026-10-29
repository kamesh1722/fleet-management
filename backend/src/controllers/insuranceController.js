import { Insurance } from '../models/Insurance.js';

export const getInsurancePolicies = async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;

    const policies = await Insurance.find(query)
      .populate('vehicle', 'vehicleId plateNumber make model')
      .sort({ expiryDate: 1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: policies.length, data: policies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createInsurancePolicy = async (req, res) => {
  try {
    const policy = new Insurance(req.body);
    await policy.save();
    res.status(201).json({ success: true, data: policy, message: 'Insurance policy created' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
