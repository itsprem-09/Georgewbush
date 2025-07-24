const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  requestorFirstName: {
    type: String,
    required: true
  },
  requestorLastName: {
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
  optIn: {
    type: Boolean,
    default: false
  },
  retireeFirstName: {
    type: String,
    required: true
  },
  retireeMiddleName: {
    type: String
  },
  retireeLastName: {
    type: String,
    required: true
  },
  retireePreferredName: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
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
  branch: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  otherRank: {
    type: String
  },
  retirementDate: {
    type: Date,
    required: true
  },
  ceremonyDate: {
    type: Date
  },
  yearsService: {
    type: Number,
    required: true,
    min: 20
  },
  mailingAddress1: {
    type: String,
    required: true
  },
  mailingAddress2: {
    type: String
  },
  mailingAddress3: {
    type: String
  },
  mailingAddress4: {
    type: String
  },
  mailingAddress5: {
    type: String
  },
  company: {
    type: String
  },
  poc: {
    type: String
  },
  mailingCity: {
    type: String,
    required: true
  },
  mailingState: {
    type: String,
    required: true
  },
  mailingZipCode: {
    type: String,
    required: true
  },
  additionalComments: {
    type: String
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

module.exports = mongoose.model('Appointment', AppointmentSchema); 