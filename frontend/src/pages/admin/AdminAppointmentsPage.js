import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/api';
import './AdminAppointmentsPage.css';

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await appointmentService.getAppointments();
        setAppointments(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments');
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await appointmentService.updateAppointmentStatus(id, { status });
      
      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment._id === id ? { ...appointment, status } : appointment
      ));
      
      // Close detail view if open
      if (currentAppointment && currentAppointment._id === id) {
        setCurrentAppointment({ ...currentAppointment, status });
      }
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Failed to update status');
    }
  };

  // Handle appointment deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id);
        
        // Update local state
        setAppointments(appointments.filter(appointment => appointment._id !== id));
        
        // Close detail view if open
        if (currentAppointment && currentAppointment._id === id) {
          setCurrentAppointment(null);
        }
      } catch (err) {
        console.error('Error deleting appointment:', err);
        setError('Failed to delete appointment');
      }
    }
  };

  // Filter appointments based on status and search term
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filter === 'all' || appointment.status === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      appointment.requestorFirstName.toLowerCase().includes(searchLower) || 
      appointment.requestorLastName.toLowerCase().includes(searchLower) || 
      appointment.retireeLastName.toLowerCase().includes(searchLower) ||
      appointment.contactEmail.toLowerCase().includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-appointments">
      <div className="appointments-header">
        <h1>Urgent Appointments</h1>
        <div className="filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="status-filter">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved
            </button>
            <button 
              className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="appointments-content">
        <div className="appointments-list">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="no-results">No appointments found</div>
          ) : (
            <div className="appointment-table-container">
              <table className="appointment-table">
                <thead>
                  <tr>
                    <th>Retiree Name</th>
                    <th>Requestor</th>
                    <th>Ceremony Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(appointment => (
                    <tr 
                      key={appointment._id} 
                      className={currentAppointment && currentAppointment._id === appointment._id ? 'selected' : ''}
                      onClick={() => setCurrentAppointment(appointment)}
                    >
                      <td>{`${appointment.retireePreferredName} ${appointment.retireeLastName}`}</td>
                      <td>{`${appointment.requestorFirstName} ${appointment.requestorLastName}`}</td>
                      <td>{appointment.ceremonyDate ? formatDate(appointment.ceremonyDate) : 'Not specified'}</td>
                      <td>
                        <span className={`status-badge ${appointment.status}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view-btn" 
                            onClick={(e) => { e.stopPropagation(); setCurrentAppointment(appointment); }}
                            title="View"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                          <button 
                            className="action-btn approve-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(appointment._id, 'approved'); }}
                            disabled={appointment.status === 'approved'}
                            title="Approve"
                          >
                            <i className="bi bi-check-circle-fill"></i>
                          </button>
                          <button 
                            className="action-btn reject-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(appointment._id, 'rejected'); }}
                            disabled={appointment.status === 'rejected'}
                            title="Reject"
                          >
                            <i className="bi bi-x-circle-fill"></i>
                          </button>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(appointment._id); }}
                            title="Delete"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {currentAppointment && (
          <div className="appointment-details">
            <div className="details-header">
              <h2>Appointment Details</h2>
              <button className="close-btn" onClick={() => setCurrentAppointment(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <h3>Request Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${currentAppointment.status}`}>
                      {currentAppointment.status.charAt(0).toUpperCase() + currentAppointment.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Submitted:</span>
                    <span>{formatDate(currentAppointment.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Requestor Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span>{`${currentAppointment.requestorFirstName} ${currentAppointment.requestorLastName}`}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span>{currentAppointment.phoneNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span>{currentAppointment.contactEmail}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Retiree Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Name:</span>
                    <span>
                      {`${currentAppointment.retireeFirstName} ${currentAppointment.retireeMiddleName || ''} ${currentAppointment.retireeLastName}`}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Preferred Name:</span>
                    <span>{currentAppointment.retireePreferredName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span>
                      {`${currentAppointment.addressLine1}, ${currentAppointment.city}, ${currentAppointment.state} ${currentAppointment.zipCode}`}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Service Branch:</span>
                    <span>{currentAppointment.branch}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rank:</span>
                    <span>{currentAppointment.rank}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Years of Service:</span>
                    <span>{currentAppointment.yearsService}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Retirement Date:</span>
                    <span>{formatDate(currentAppointment.retirementDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ceremony Date:</span>
                    <span>{currentAppointment.ceremonyDate ? formatDate(currentAppointment.ceremonyDate) : 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              {currentAppointment.additionalComments && (
                <div className="details-section">
                  <h3>Additional Comments</h3>
                  <p className="comments-text">{currentAppointment.additionalComments}</p>
                </div>
              )}
              
              <div className="details-actions">
                <button 
                  className="btn btn-approve" 
                  onClick={() => handleStatusUpdate(currentAppointment._id, 'approved')}
                  disabled={currentAppointment.status === 'approved'}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-reject" 
                  onClick={() => handleStatusUpdate(currentAppointment._id, 'rejected')}
                  disabled={currentAppointment.status === 'rejected'}
                >
                  Reject
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDelete(currentAppointment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointmentsPage; 