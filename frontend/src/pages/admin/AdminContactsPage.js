import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/api';
import './AdminContactsPage.css';

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentContact, setCurrentContact] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await contactService.getContacts();
        setContacts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, status) => {
    try {
      await contactService.updateContactStatus(id, { status });
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status } : contact
      ));
      
      // Update detail view if open
      if (currentContact && currentContact._id === id) {
        setCurrentContact({ ...currentContact, status });
      }
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('Failed to update status');
    }
  };

  // Handle contact deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        
        // Update local state
        setContacts(contacts.filter(contact => contact._id !== id));
        
        // Close detail view if open
        if (currentContact && currentContact._id === id) {
          setCurrentContact(null);
        }
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Failed to delete contact');
      }
    }
  };

  // Filter contacts based on status and search term
  const filteredContacts = contacts.filter(contact => {
    const matchesStatus = filter === 'all' || contact.status === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchLower) || 
      contact.email.toLowerCase().includes(searchLower) || 
      contact.message.toLowerCase().includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-contacts">
      <div className="contacts-header">
        <h1>Contact Messages</h1>
        <div className="filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search contacts..."
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
              className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
              onClick={() => setFilter('new')}
            >
              New
            </button>
            <button 
              className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
              onClick={() => setFilter('resolved')}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="contacts-content">
        <div className="contacts-list">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="no-results">No contacts found</div>
          ) : (
            <div className="contact-table-container">
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Inquiry Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map(contact => (
                    <tr 
                      key={contact._id} 
                      className={currentContact && currentContact._id === contact._id ? 'selected' : ''}
                      onClick={() => setCurrentContact(contact)}
                    >
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>
                        {contact.inquiryType === 'general' ? 'General' : 
                         contact.inquiryType === 'media' ? 'Media' : 'Presidential'}
                      </td>
                      <td>{formatDate(contact.createdAt)}</td>
                      <td>
                        <span className={`status-badge ${contact.status}`}>
                          {contact.status === 'new' ? 'New' : 
                           contact.status === 'in-progress' ? 'In Progress' : 'Resolved'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view-btn" 
                            onClick={(e) => { e.stopPropagation(); setCurrentContact(contact); }}
                            title="View"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                          <button 
                            className="action-btn progress-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(contact._id, 'in-progress'); }}
                            disabled={contact.status === 'in-progress'}
                            title="Mark In Progress"
                          >
                            <i className="bi bi-hourglass-split"></i>
                          </button>
                          <button 
                            className="action-btn resolve-btn" 
                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(contact._id, 'resolved'); }}
                            disabled={contact.status === 'resolved'}
                            title="Mark Resolved"
                          >
                            <i className="bi bi-check-circle-fill"></i>
                          </button>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
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
        
        {currentContact && (
          <div className="contact-details">
            <div className="details-header">
              <h2>Contact Details</h2>
              <button className="close-btn" onClick={() => setCurrentContact(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <h3>Contact Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${currentContact.status}`}>
                      {currentContact.status === 'new' ? 'New' : 
                       currentContact.status === 'in-progress' ? 'In Progress' : 'Resolved'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date Received:</span>
                    <span>{formatDate(currentContact.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span>{currentContact.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span>{currentContact.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Inquiry Type:</span>
                    <span>
                      {currentContact.inquiryType === 'general' ? 'General' : 
                       currentContact.inquiryType === 'media' ? 'Media' : 'Presidential'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Message</h3>
                <div className="message-container">
                  <p className="message-text">{currentContact.message}</p>
                </div>
              </div>
              
              <div className="details-actions">
                {currentContact.status === 'new' && (
                  <button 
                    className="btn btn-progress" 
                    onClick={() => handleStatusUpdate(currentContact._id, 'in-progress')}
                  >
                    Mark as In Progress
                  </button>
                )}
                {(currentContact.status === 'new' || currentContact.status === 'in-progress') && (
                  <button 
                    className="btn btn-resolve" 
                    onClick={() => handleStatusUpdate(currentContact._id, 'resolved')}
                  >
                    Mark as Resolved
                  </button>
                )}
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDelete(currentContact._id)}
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

export default AdminContactsPage; 