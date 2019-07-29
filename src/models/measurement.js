const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  weight: {
    type: Number
  },
  chest: {
    type: Number
  },
  bicep: {
    type: Number
  },
  shoulder: {
    type: Number
  },
  forearm: {
    type: Number
  },
  upperAbs: {
    type: Number
  },
  lowerAbs: {
    type: Number
  },
  hip: {
    type: Number
  },
  thigh: {
    type: Number
  },
  calf: {
    type: Number
  },
  height: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
