const express = require('express');
const router = express.Router();
const {
  createSchedulingRequest,
  getSchedulingRequests,
  getSchedulingRequestById,
  updateSchedulingRequestStatus,
  deleteSchedulingRequest
} = require('../controllers/schedulingController');
const { schedulingValidation } = require('../middleware/validators');

// Route: /api/scheduling
router
  .route('/')
  .post(schedulingValidation, createSchedulingRequest)
  .get(getSchedulingRequests);

// Route: /api/scheduling/:id
router
  .route('/:id')
  .get(getSchedulingRequestById)
  .put(updateSchedulingRequestStatus)
  .delete(deleteSchedulingRequest);

module.exports = router; 