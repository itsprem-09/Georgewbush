const mongoose = require('mongoose');

const SchedulingRequestSchema = new mongoose.Schema({
  requestFor: {
    type: String,
    required: true,
    enum: ['President George W Bush', 'President Bush and Mrs Laura Bush']
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  organization: {
    type: String
  },
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String
  },
  eventLocation: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  optIn: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SchedulingRequest', SchedulingRequestSchema); 