const { body, validationResult } = require('express-validator');

// Helper function to validate results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validators for Urgent Appointment form
const appointmentValidation = [
  body('requestorFirstName').notEmpty().withMessage('Requestor first name is required'),
  body('requestorLastName').notEmpty().withMessage('Requestor last name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('contactEmail').isEmail().withMessage('Valid email address is required'),
  body('retireeFirstName').notEmpty().withMessage('Retiree first name is required'),
  body('retireeLastName').notEmpty().withMessage('Retiree last name is required'),
  body('retireePreferredName').notEmpty().withMessage('Retiree preferred name is required'),
  body('addressLine1').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipCode').notEmpty().withMessage('Zip code is required'),
  body('branch').notEmpty().withMessage('Branch is required'),
  body('rank').notEmpty().withMessage('Rank is required'),
  body('retirementDate').notEmpty().withMessage('Retirement date is required'),
  body('yearsService').notEmpty().isInt({ min: 20 }).withMessage('Years of service (minimum 20) is required'),
  body('mailingAddress1').notEmpty().withMessage('Mailing address is required'),
  body('mailingCity').notEmpty().withMessage('Mailing city is required'),
  body('mailingState').notEmpty().withMessage('Mailing state is required'),
  body('mailingZipCode').notEmpty().withMessage('Mailing zip code is required'),
  validate
];

// Validators for Scheduling Request form
const schedulingValidation = [
  body('requestFor').notEmpty().withMessage('Request for is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('addressLine1').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipCode').notEmpty().withMessage('Zip code is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('contactEmail').isEmail().withMessage('Valid email address is required'),
  body('eventName').notEmpty().withMessage('Event name is required'),
  body('eventLocation').notEmpty().withMessage('Event location is required'),
  body('eventDate').notEmpty().withMessage('Event date is required'),
  validate
];

// Validators for Subscription form
const subscriptionValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  validate
];

// Validators for Contact form
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email address is required'),
  body('message').notEmpty().withMessage('Message is required'),
  validate
];

module.exports = {
  appointmentValidation,
  schedulingValidation,
  subscriptionValidation,
  contactValidation
}; 