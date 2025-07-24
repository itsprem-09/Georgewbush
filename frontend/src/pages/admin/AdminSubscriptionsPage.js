import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../../services/api';
import './AdminSubscriptionsPage.css';

const AdminSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await subscriptionService.getSubscriptions();
        setSubscriptions(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscriptions');
        setLoading(false);
      }
    };
    
    fetchSubscriptions();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await subscriptionService.updateSubscriptionStatus(id, { status });
      
      // Update local state
      setSubscriptions(subscriptions.map(subscription => 
        subscription._id === id ? { ...subscription, status } : subscription
      ));
      
      // Update detail view if open
      if (currentSubscription && currentSubscription._id === id) {
        setCurrentSubscription({ ...currentSubscription, status });
      }
    } catch (err) {
      console.error('Error updating subscription status:', err);
      setError('Failed to update status');
    }
  };

  // Handle subscription deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionService.deleteSubscription(id);
        
        // Update local state
        setSubscriptions(subscriptions.filter(subscription => subscription._id !== id));
        
        // Close detail view if open
        if (currentSubscription && currentSubscription._id === id) {
          setCurrentSubscription(null);
        }
      } catch (err) {
        console.error('Error deleting subscription:', err);
        setError('Failed to delete subscription');
      }
    }
  };

  // Filter subscriptions based on status and search term
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesStatus = filter === 'all' || subscription.status === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      subscription.firstName.toLowerCase().includes(searchLower) || 
      subscription.lastName.toLowerCase().includes(searchLower) || 
      subscription.email.toLowerCase().includes(searchLower) ||
      (subscription.city && subscription.city.toLowerCase().includes(searchLower)) ||
      (subscription.state && subscription.state.toLowerCase().includes(searchLower));
    
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-subscriptions">
      <div className="subscriptions-header">
        <h1>Email Subscriptions</h1>
        <div className="filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search subscriptions..."
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
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'unsubscribed' ? 'active' : ''}`}
              onClick={() => setFilter('unsubscribed')}
            >
              Unsubscribed
            </button>
          </div>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="subscriptions-content">
        <div className="subscriptions-list">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="no-results">No subscriptions found</div>
          ) : (
            <div className="subscription-table-container">
              <table className="subscription-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map(subscription => (
                    <tr 
                      key={subscription._id} 
                      className={currentSubscription && currentSubscription._id === subscription._id ? 'selected' : ''}
                      onClick={() => setCurrentSubscription(subscription)}
                    >
                      <td>{`${subscription.firstName} ${subscription.lastName}`}</td>
                      <td>{subscription.email}</td>
                      <td>{subscription.city && subscription.state ? 
                          `${subscription.city}, ${subscription.state}` : 
                          (subscription.city || subscription.state || 'N/A')}
                      </td>
                      <td>{formatDate(subscription.createdAt)}</td>
                      <td>
                        <span className={`status-badge ${subscription.status}`}>
                          {subscription.status === 'active' ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view-btn" 
                            onClick={(e) => { e.stopPropagation(); setCurrentSubscription(subscription); }}
                            title="View"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                          {subscription.status === 'unsubscribed' ? (
                            <button 
                              className="action-btn activate-btn" 
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(subscription._id, 'active'); }}
                              title="Activate"
                            >
                              <i className="bi bi-person-check-fill"></i>
                            </button>
                          ) : (
                            <button 
                              className="action-btn unsubscribe-btn" 
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(subscription._id, 'unsubscribed'); }}
                              title="Unsubscribe"
                            >
                              <i className="bi bi-person-dash-fill"></i>
                            </button>
                          )}
                          <button 
                            className="action-btn delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(subscription._id); }}
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
        
        {currentSubscription && (
          <div className="subscription-details">
            <div className="details-header">
              <h2>Subscription Details</h2>
              <button className="close-btn" onClick={() => setCurrentSubscription(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <h3>Subscription Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${currentSubscription.status}`}>
                      {currentSubscription.status === 'active' ? 'Active' : 'Unsubscribed'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Subscribed On:</span>
                    <span>{formatDate(currentSubscription.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Personal Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">First Name:</span>
                    <span>{currentSubscription.firstName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Name:</span>
                    <span>{currentSubscription.lastName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span>{currentSubscription.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">City:</span>
                    <span>{currentSubscription.city || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">State:</span>
                    <span>{currentSubscription.state || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Zip:</span>
                    <span>{currentSubscription.zip || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Subscription Preferences</h3>
                <div className="preferences-grid">
                  <div className="preference-item">
                    <span className="preference-label">Five For Friday:</span>
                    <span className={`preference-value ${currentSubscription.fiveForFriday ? 'active' : 'inactive'}`}>
                      {currentSubscription.fiveForFriday ? 'Subscribed' : 'Not Subscribed'}
                    </span>
                  </div>
                  <div className="preference-item">
                    <span className="preference-label">Catalyst:</span>
                    <span className={`preference-value ${currentSubscription.catalyst ? 'active' : 'inactive'}`}>
                      {currentSubscription.catalyst ? 'Subscribed' : 'Not Subscribed'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="details-actions">
                {currentSubscription.status === 'unsubscribed' ? (
                  <button 
                    className="btn btn-activate" 
                    onClick={() => handleStatusUpdate(currentSubscription._id, 'active')}
                  >
                    Activate Subscription
                  </button>
                ) : (
                  <button 
                    className="btn btn-unsubscribe" 
                    onClick={() => handleStatusUpdate(currentSubscription._id, 'unsubscribed')}
                  >
                    Unsubscribe
                  </button>
                )}
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDelete(currentSubscription._id)}
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

export default AdminSubscriptionsPage; 