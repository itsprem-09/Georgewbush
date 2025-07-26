import axios from 'axios';

// Create API base URL - in production, this would come from environment variables
const API_URL = 'https://georgewbush.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
api.interceptors.request.use(
  config => {
    // Add auth headers for admin routes
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && (
      config.url.includes('/auth') ||
      config.url.includes('/appointments') ||
      config.url.includes('/scheduling') ||
      config.url.includes('/subscribe') ||
      config.url.includes('/contact')
    )) {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle unauthorized errors (status 401)
    if (error.response && error.response.status === 401) {
      // If on admin route, redirect to login
      if (window.location.pathname.includes('/admin')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        window.location.href = '/admin/login';
      }
    }
    
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Define API services for specific endpoints
const appointmentService = {
  submitAppointment: (data) => api.post('/appointments', data),
  getAppointments: () => api.get('/appointments'),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  updateAppointmentStatus: (id, data) => api.put(`/appointments/${id}`, data),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`)
};

const schedulingService = {
  submitSchedulingRequest: (data) => api.post('/scheduling', data),
  getSchedulingRequests: () => api.get('/scheduling'),
  getSchedulingRequestById: (id) => api.get(`/scheduling/${id}`),
  updateSchedulingStatus: (id, data) => api.put(`/scheduling/${id}`, data),
  deleteSchedulingRequest: (id) => api.delete(`/scheduling/${id}`)
};

const subscriptionService = {
  subscribe: (data) => api.post('/subscribe', data),
  unsubscribe: (email) => api.put('/subscribe/unsubscribe', { email }),
  getSubscriptions: () => api.get('/subscribe'),
  getSubscriptionById: (id) => api.get(`/subscribe/${id}`),
  updateSubscriptionStatus: (id, data) => api.put(`/subscribe/${id}`, data),
  deleteSubscription: (id) => api.delete(`/subscribe/${id}`)
};

const contactService = {
  submitContactForm: (data) => api.post('/contact', data),
  getContacts: () => api.get('/contact'),
  getContactById: (id) => api.get(`/contact/${id}`),
  updateContactStatus: (id, data) => api.put(`/contact/${id}`, data),
  deleteContact: (id) => api.delete(`/contact/${id}`)
};

const adminService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me')
};

export {
  api,
  appointmentService,
  schedulingService,
  subscriptionService,
  contactService,
  adminService
}; 