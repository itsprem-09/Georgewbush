import React, { useState, useEffect } from 'react';
import { schedulingService } from '../../services/api';
import './AdminSchedulingPage.css';

const AdminSchedulingPage = () => {
  const [schedulingRequests, setSchedulingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentRequest, setCurrentRequest] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch scheduling requests
  useEffect(() => {
    const fetchSchedulingRequests = async () => {
      try {
        setLoading(true);
        const response = await schedulingService.getSchedulingRequests();
        setSchedulingRequests(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching scheduling requests:', err);
        setError('Failed to load scheduling requests');
        setLoading(false);
      }
    };
    
    fetchSchedulingRequests();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await schedulingService.updateSchedulingStatus(id, { status });
      
      // Update local state
      setSchedulingRequests(schedulingRequests.map(request => 
        request._id === id ? { ...request, status } : request
      ));
      
      // Update detail view if open
      if (currentRequest && currentRequest._id === id) {
        setCurrentRequest({ ...currentRequest, status });
      }
    } catch (err) {
      console.error('Error updating scheduling request status:', err);
      setError('Failed to update status');
    }
  };

  // Handle request deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheduling request?')) {
      try {
        await schedulingService.deleteSchedulingRequest(id);
        
        // Update local state
        setSchedulingRequests(schedulingRequests.filter(request => request._id !== id));
        
        // Close detail view if open
        if (currentRequest && currentRequest._id === id) {
          setCurrentRequest(null);
        }
      } catch (err) {
        console.error('Error deleting scheduling request:', err);
        setError('Failed to delete scheduling request');
      }
    }
  };

  // Filter scheduling requests based on status and search term
  const filteredRequests = schedulingRequests.filter(request => {
    const matchesStatus = filter === 'all' || request.status === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      request.firstName.toLowerCase().includes(searchLower) || 
      request.lastName.toLowerCase().includes(searchLower) || 
      (request.organization && request.organization.toLowerCase().includes(searchLower)) ||
      request.contactEmail.toLowerCase().includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-scheduling">
      <div className="scheduling-header">
        <h1>Scheduling Requests</h1>
        <div className="filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search scheduling requests..."
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
      
      <div className="scheduling-content">
        <div className="scheduling-list">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredRequests.length === 0 ? (
            <div className="no-results">No scheduling requests found</div>
          ) : (
            <div className="scheduling-table-container">
              <table className="scheduling-table">
                <thead>
                  <tr>
                    <th>Requestor</th>
                    <th>Organization</th>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Request For</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr 
                      key={request._id} 
                      className={currentRequest && currentRequest._id === request._id ? 'selected' : ''}
                      onClick={() => setCurrentRequest(request)}
                    >
                      <td>{`${request.firstName} ${request.lastName}`}</td>
                      <td>{request.organization || 'N/A'}</td>
                      <td>{request.eventName}</td>
                      <td>{request.eventDate}</td>
                      <td>{request.requestFor}</td>
                      <td>
                        <span className={`status-badge ${request.status}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view-btn" 
                            onClick={(e) => { e.stopPropagation(); setCurrentRequest(request); }}
                            title="View"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                          <button 
                            className="action-btn approve-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(request._id, 'approved'); }}
                            disabled={request.status === 'approved'}
                            title="Approve"
                          >
                            <i className="bi bi-check-circle-fill"></i>
                          </button>
                          <button 
                            className="action-btn reject-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(request._id, 'rejected'); }}
                            disabled={request.status === 'rejected'}
                            title="Reject"
                          >
                            <i className="bi bi-x-circle-fill"></i>
                          </button>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(request._id); }}
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
        
        {currentRequest && (
          <div className="scheduling-details">
            <div className="details-header">
              <h2>Scheduling Request Details</h2>
              <button className="close-btn" onClick={() => setCurrentRequest(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <h3>Request Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${currentRequest.status}`}>
                      {currentRequest.status.charAt(0).toUpperCase() + currentRequest.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Submitted:</span>
                    <span>{formatDate(currentRequest.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Request For:</span>
                    <span>{currentRequest.requestFor}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Requestor Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span>{`${currentRequest.firstName} ${currentRequest.lastName}`}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Organization:</span>
                    <span>{currentRequest.organization || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span>{currentRequest.contactEmail}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span>{currentRequest.phoneNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span>
                      {`${currentRequest.addressLine1}${currentRequest.addressLine2 ? ', ' + currentRequest.addressLine2 : ''}, ${currentRequest.city}, ${currentRequest.state} ${currentRequest.zipCode}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Event Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Event Name:</span>
                    <span>{currentRequest.eventName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Event Date:</span>
                    <span>{currentRequest.eventDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Event Location:</span>
                    <span>{currentRequest.eventLocation}</span>
                  </div>
                </div>
              </div>
              
              {currentRequest.eventDescription && (
                <div className="details-section">
                  <h3>Event Description</h3>
                  <p className="description-text">{currentRequest.eventDescription}</p>
                </div>
              )}
              
              <div className="details-actions">
                <button 
                  className="btn btn-approve" 
                  onClick={() => handleStatusUpdate(currentRequest._id, 'approved')}
                  disabled={currentRequest.status === 'approved'}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-reject" 
                  onClick={() => handleStatusUpdate(currentRequest._id, 'rejected')}
                  disabled={currentRequest.status === 'rejected'}
                >
                  Reject
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDelete(currentRequest._id)}
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

export default AdminSchedulingPage; 