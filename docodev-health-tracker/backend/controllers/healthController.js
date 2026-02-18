const asyncHandler = require('express-async-handler');
const HealthRecord = require('../models/HealthRecord');

// @desc    Add health record
// @route   POST /api/health/add
// @access  Private
const addHealthRecord = asyncHandler(async (req, res) => {
  const { date, bloodPressure, bloodSugar, weight, heartRate, notes } = req.body;

  if (!bloodPressure || !bloodSugar || !weight || !heartRate) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const record = await HealthRecord.create({
    user: req.user._id,
    date: date || Date.now(),
    bloodPressure,
    bloodSugar,
    weight,
    heartRate,
    notes
  });

  res.status(201).json({
    success: true,
    data: record
  });
});

// @desc    Get all health records for user
// @route   GET /api/health/all
// @access  Private
const getAllRecords = asyncHandler(async (req, res) => {
  const records = await HealthRecord.find({ user: req.user._id }).sort({ date: -1 });

  res.json({
    success: true,
    count: records.length,
    data: records
  });
});

// @desc    Get single health record
// @route   GET /api/health/:id
// @access  Private
const getRecord = asyncHandler(async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Record not found');
  }

  // Make sure user owns the record
  if (record.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.json({
    success: true,
    data: record
  });
});

// @desc    Update health record
// @route   PUT /api/health/:id
// @access  Private
const updateRecord = asyncHandler(async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Record not found');
  }

  // Make sure user owns the record
  if (record.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedRecord = await HealthRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: updatedRecord
  });
});

// @desc    Delete health record
// @route   DELETE /api/health/:id
// @access  Private
const deleteRecord = asyncHandler(async (req, res) => {
  const record = await HealthRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Record not found');
  }

  // Make sure user owns the record
  if (record.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await record.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Get health statistics
// @route   GET /api/health/stats
// @access  Private
const getStats = asyncHandler(async (req, res) => {
  const records = await HealthRecord.find({ user: req.user._id });

  if (records.length === 0) {
    return res.json({
      success: true,
      data: {
        totalRecords: 0,
        avgBloodPressure: { systolic: 0, diastolic: 0 },
        avgBloodSugar: 0,
        avgWeight: 0,
        avgHeartRate: 0
      }
    });
  }

  const stats = records.reduce((acc, record) => {
    acc.systolic += record.bloodPressure.systolic;
    acc.diastolic += record.bloodPressure.diastolic;
    acc.bloodSugar += record.bloodSugar;
    acc.weight += record.weight;
    acc.heartRate += record.heartRate;
    return acc;
  }, { systolic: 0, diastolic: 0, bloodSugar: 0, weight: 0, heartRate: 0 });

  const count = records.length;

  res.json({
    success: true,
    data: {
      totalRecords: count,
      avgBloodPressure: {
        systolic: Math.round(stats.systolic / count),
        diastolic: Math.round(stats.diastolic / count)
      },
      avgBloodSugar: Math.round(stats.bloodSugar / count),
      avgWeight: Math.round(stats.weight / count),
      avgHeartRate: Math.round(stats.heartRate / count)
    }
  });
});

module.exports = {
  addHealthRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  getStats
};
