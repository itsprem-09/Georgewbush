# George W. Bush Backend API

This is the backend server for the George W. Bush website. It provides API endpoints for various form submissions and data management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/georgewbush-db
```

3. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Urgent Appointments

- **POST** `/api/appointments` - Submit a new appointment request
- **GET** `/api/appointments` - Get all appointment requests
- **GET** `/api/appointments/:id` - Get a specific appointment request
- **PUT** `/api/appointments/:id` - Update appointment status
- **DELETE** `/api/appointments/:id` - Delete an appointment request

### Scheduling Requests

- **POST** `/api/scheduling` - Submit a new scheduling request
- **GET** `/api/scheduling` - Get all scheduling requests
- **GET** `/api/scheduling/:id` - Get a specific scheduling request
- **PUT** `/api/scheduling/:id` - Update scheduling request status
- **DELETE** `/api/scheduling/:id` - Delete a scheduling request

### Newsletter Subscriptions

- **POST** `/api/subscribe` - Subscribe to newsletters
- **GET** `/api/subscribe` - Get all subscriptions
- **GET** `/api/subscribe/:id` - Get a specific subscription
- **PUT** `/api/subscribe/:id` - Update a subscription
- **PUT** `/api/subscribe/unsubscribe` - Unsubscribe from newsletters
- **DELETE** `/api/subscribe/:id` - Delete a subscription

### Contact Form

- **POST** `/api/contact` - Submit a contact form message
- **GET** `/api/contact` - Get all contact messages
- **GET** `/api/contact/:id` - Get a specific contact message
- **PUT** `/api/contact/:id` - Update contact message status
- **DELETE** `/api/contact/:id` - Delete a contact message

## Models

### Appointment

Fields for urgent appointment requests from military retirees.

### SchedulingRequest

Fields for scheduling requests for events with President Bush.

### Subscription

Fields for email subscriptions and newsletter preferences.

### Contact

Fields for contact form submissions.

## Validation

Input validation is implemented using express-validator middleware to ensure data integrity.

## Database

This API uses MongoDB for data storage with Mongoose as the ODM (Object-Document Mapper). 