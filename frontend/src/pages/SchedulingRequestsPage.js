import React, { useState } from 'react';
import './SchedulingRequestsPage.css';
import { schedulingService } from '../services/api';

const SchedulingRequestsPage = () => {
  const [formData, setFormData] = useState({
    requestFor: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    contactEmail: '',
    organization: '',
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    eventDate: '',
    optIn: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await schedulingService.submitSchedulingRequest(formData);
      console.log('Scheduling request submitted:', response.data);
      setSuccess(true);
      window.scrollTo(0, 0);
      // Reset form
      setFormData({
        requestFor: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        contactEmail: '',
        organization: '',
        eventName: '',
        eventDescription: '',
        eventLocation: '',
        eventDate: '',
        optIn: false
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while submitting the form');
      console.error('Error submitting form:', err);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scheduling-page">
      <div className="page-content">
        <div className="center-image">
          <img 
            src="https://form-builder-by-hulkapps.s3.amazonaws.com/uploads/b8f5f3.myshopify.com/backend_image/backend_image/6718/Image20230606181700.jpg" 
            alt="Bush Presidential Center" 
            className="header-image"
          />
        </div>
        
        <h1>Scheduling Requests</h1>
        
        <div className="intro-text">
          {loading && (
            <div className="alert alert-info">
              Submitting your request, please wait...
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger">
              {typeof error === 'string' ? error : 'There was a problem submitting your form. Please try again.'}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              Your scheduling request has been submitted successfully. We'll review your request and contact you soon.
            </div>
          )}
          
          <p>
            Thank you for your interest. As President Bush's schedule continues to
            develop, your request will be given every consideration. We will contact
            you once a final decision has been made. <strong>Please note that this may take
            up to six weeks.</strong>
          </p>
        </div>
        
        <form className="scheduling-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="requestFor">Request for*</label>
            <select 
              id="requestFor" 
              name="requestFor"
              value={formData.requestFor}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="President George W Bush">President George W Bush</option>
              <option value="President Bush and Mrs Laura Bush">President Bush and Mrs Laura Bush</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name*</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1*</label>
            <input 
              type="text" 
              id="addressLine1" 
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2</label>
            <input 
              type="text" 
              id="addressLine2" 
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City*</label>
            <input 
              type="text" 
              id="city" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="state">State*</label>
              <input 
                type="text" 
                id="state" 
                name="state"
                value={formData.state}
                onChange={handleChange}
                pattern="[A-Za-z]{2}" 
                title="Please enter a valid 2-letter state code" 
                required 
              />
            </div>
            <div className="form-group half">
              <label htmlFor="zipCode">Zip Code*</label>
              <input 
                type="text" 
                id="zipCode" 
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                pattern="[0-9]{5}(-[0-9]{4})?" 
                title="Please enter a 5-digit zip code or ZIP+4" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]{10}" 
              title="Please enter a 10-digit phone number" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email*</label>
            <input 
              type="email" 
              id="contactEmail" 
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="organization">Organization</label>
            <input 
              type="text" 
              id="organization" 
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="eventName">Event Name*</label>
            <input 
              type="text" 
              id="eventName" 
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea 
              id="eventDescription" 
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="eventLocation">Event City, State and Country*</label>
            <input 
              type="text" 
              id="eventLocation" 
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="eventDate">Event Date (Local to Location)*</label>
            <input 
              type="text" 
              id="eventDate" 
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group checkbox-container">
            <input 
              type="checkbox" 
              id="optIn" 
              name="optIn"
              checked={formData.optIn}
              onChange={handleChange}
            />
            <label htmlFor="optIn">Opt in to receive communications from the Bush Center</label>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchedulingRequestsPage; 