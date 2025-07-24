const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactMessages,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { contactValidation } = require('../middleware/validators');

// Route: /api/contact
router
  .route('/')
  .post(contactValidation, submitContactForm)
  .get(getContactMessages);

// Route: /api/contact/:id
router
  .route('/:id')
  .get(getContactById)
  .put(updateContactStatus)
  .delete(deleteContact);

module.exports = router; 