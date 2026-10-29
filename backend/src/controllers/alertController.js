import { Alert } from '../models/Alert.js';

export const getAlerts = async (req, res) => {
  try {
    const { severity, isResolved, limit = 50 } = req.query;
    const query = {};
    if (severity && severity !== 'all') query.severity = severity;
    if (isResolved !== undefined) query.isResolved = isResolved === 'true';

    const alerts = await Alert.find(query)
      .populate('vehicle', 'vehicleId plateNumber make model')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAlertAsRead = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isResolved: true, isRead: true },
      { new: true }
    );
    res.json({ success: true, data: alert, message: 'Alert resolved' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
