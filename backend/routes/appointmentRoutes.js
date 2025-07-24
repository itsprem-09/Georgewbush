const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');
const { appointmentValidation } = require('../middleware/validators');

// Route: /api/appointments
router
  .route('/')
  .post(appointmentValidation, createAppointment)
  .get(getAppointments);

// Route: /api/appointments/:id
router
  .route('/:id')
  .get(getAppointmentById)
  .put(updateAppointmentStatus)
  .delete(deleteAppointment);

module.exports = router; 