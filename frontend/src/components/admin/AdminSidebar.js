import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Clear admin data from localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    
    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <div className="admin-sidebar-menu">
        <Link 
          to="/admin/dashboard" 
          className={`admin-sidebar-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
        >
          <i className="bi bi-speedometer2"></i>
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/admin/appointments" 
          className={`admin-sidebar-item ${isActive('/admin/appointments') ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-event"></i>
          <span>Urgent Appointments</span>
        </Link>
        <Link 
          to="/admin/scheduling" 
          className={`admin-sidebar-item ${isActive('/admin/scheduling') ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-week"></i>
          <span>Scheduling Requests</span>
        </Link>
        <Link 
          to="/admin/contacts" 
          className={`admin-sidebar-item ${isActive('/admin/contacts') ? 'active' : ''}`}
        >
          <i className="bi bi-envelope"></i>
          <span>Contacts</span>
        </Link>
        <Link 
          to="/admin/subscriptions" 
          className={`admin-sidebar-item ${isActive('/admin/subscriptions') ? 'active' : ''}`}
        >
          <i className="bi bi-person-plus"></i>
          <span>Subscriptions</span>
        </Link>
      </div>
      <div className="admin-sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 