const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  bloodPressure: {
    systolic: {
      type: Number,
      required: [true, 'Please add systolic blood pressure']
    },
    diastolic: {
      type: Number,
      required: [true, 'Please add diastolic blood pressure']
    }
  },
  bloodSugar: {
    type: Number,
    required: [true, 'Please add blood sugar level']
  },
  weight: {
    type: Number,
    required: [true, 'Please add weight']
  },
  heartRate: {
    type: Number,
    required: [true, 'Please add heart rate']
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
