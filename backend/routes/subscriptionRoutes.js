const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  unsubscribe,
  deleteSubscription
} = require('../controllers/subscriptionController');
const { subscriptionValidation } = require('../middleware/validators');

// Route: /api/subscribe
router
  .route('/')
  .post(subscriptionValidation, createSubscription)
  .get(getSubscriptions);

// Route: /api/subscribe/unsubscribe
router.route('/unsubscribe').put(unsubscribe);

// Route: /api/subscribe/:id
router
  .route('/:id')
  .get(getSubscriptionById)
  .put(updateSubscription)
  .delete(deleteSubscription);

module.exports = router; 