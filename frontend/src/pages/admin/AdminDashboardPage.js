import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  appointmentService, 
  schedulingService, 
  contactService,
  subscriptionService
} from '../../services/api';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    appointments: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    },
    scheduling: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    },
    contacts: {
      total: 0,
      new: 0,
      inProgress: 0,
      resolved: 0
    },
    subscriptions: {
      total: 0,
      active: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get admin info from localStorage
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointments
        const appointmentsRes = await appointmentService.getAppointments();
        const appointments = appointmentsRes.data.data;
        
        // Fetch scheduling requests
        const schedulingRes = await schedulingService.getSchedulingRequests();
        const scheduling = schedulingRes.data.data;
        
        // Fetch contacts
        const contactsRes = await contactService.getContacts();
        const contacts = contactsRes.data.data;
        
        // Fetch subscriptions
        const subscriptionsRes = await subscriptionService.getSubscriptions();
        const subscriptions = subscriptionsRes.data.data;
        
        // Update stats
        setStats({
          appointments: {
            total: appointments.length,
            pending: appointments.filter(a => a.status === 'pending').length,
            approved: appointments.filter(a => a.status === 'approved').length,
            rejected: appointments.filter(a => a.status === 'rejected').length
          },
          scheduling: {
            total: scheduling.length,
            pending: scheduling.filter(s => s.status === 'pending').length,
            approved: scheduling.filter(s => s.status === 'approved').length,
            rejected: scheduling.filter(s => s.status === 'rejected').length
          },
          contacts: {
            total: contacts.length,
            new: contacts.filter(c => c.status === 'new').length,
            inProgress: contacts.filter(c => c.status === 'in-progress').length,
            resolved: contacts.filter(c => c.status === 'resolved').length
          },
          subscriptions: {
            total: subscriptions.length,
            active: subscriptions.filter(s => s.status === 'active').length
          }
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {adminInfo.name || 'Admin'}</span>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="dashboard-stats">
          <div className="stats-card">
            <div className="stats-card-header appointments">
              <i className="bi bi-calendar-event"></i>
              <h3>Urgent Appointments</h3>
            </div>
            <div className="stats-card-body">
              <p className="stats-total">{stats.appointments.total}</p>
              <div className="stats-details">
                <span className="stats-item pending">
                  <i className="bi bi-clock"></i> Pending: {stats.appointments.pending}
                </span>
                <span className="stats-item approved">
                  <i className="bi bi-check-circle"></i> Approved: {stats.appointments.approved}
                </span>
              </div>
            </div>
            <div className="stats-card-footer">
              <Link to="/admin/appointments">View All</Link>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-card-header scheduling">
              <i className="bi bi-calendar-week"></i>
              <h3>Scheduling Requests</h3>
            </div>
            <div className="stats-card-body">
              <p className="stats-total">{stats.scheduling.total}</p>
              <div className="stats-details">
                <span className="stats-item pending">
                  <i className="bi bi-clock"></i> Pending: {stats.scheduling.pending}
                </span>
                <span className="stats-item approved">
                  <i className="bi bi-check-circle"></i> Approved: {stats.scheduling.approved}
                </span>
              </div>
            </div>
            <div className="stats-card-footer">
              <Link to="/admin/scheduling">View All</Link>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-card-header contacts">
              <i className="bi bi-envelope"></i>
              <h3>Contact Messages</h3>
            </div>
            <div className="stats-card-body">
              <p className="stats-total">{stats.contacts.total}</p>
              <div className="stats-details">
                <span className="stats-item new">
                  <i className="bi bi-envelope-fill"></i> New: {stats.contacts.new}
                </span>
                <span className="stats-item in-progress">
                  <i className="bi bi-hourglass-split"></i> In Progress: {stats.contacts.inProgress}
                </span>
              </div>
            </div>
            <div className="stats-card-footer">
              <Link to="/admin/contacts">View All</Link>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-card-header subscriptions">
              <i className="bi bi-person-plus"></i>
              <h3>Subscriptions</h3>
            </div>
            <div className="stats-card-body">
              <p className="stats-total">{stats.subscriptions.total}</p>
              <div className="stats-details">
                <span className="stats-item active">
                  <i className="bi bi-person-check"></i> Active: {stats.subscriptions.active}
                </span>
              </div>
            </div>
            <div className="stats-card-footer">
              <Link to="/admin/subscriptions">View All</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage; 