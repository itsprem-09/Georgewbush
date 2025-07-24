import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import UrgentAppointmentPage from './pages/UrgentAppointmentPage';
import SchedulingRequestsPage from './pages/SchedulingRequestsPage';
import BooksPage from './pages/BooksPage';
import StayConnectedPage from './pages/StayConnectedPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminSchedulingPage from './pages/admin/AdminSchedulingPage';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminSubscriptionsPage from './pages/admin/AdminSubscriptionsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="appointments" element={<AdminAppointmentsPage />} />
          <Route path="scheduling" element={<AdminSchedulingPage />} />
          <Route path="contacts" element={<AdminContactsPage />} />
          <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
        </Route>
        
        {/* Public Routes */}
        <Route path="/" element={
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/urgent-appointment" element={<UrgentAppointmentPage />} />
                <Route path="/scheduling-requests" element={<SchedulingRequestsPage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/stay-connected" element={<StayConnectedPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
