import React, { useState } from 'react';
import './ContactPage.css';
import { contactService } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleInquiryTypeChange = (type) => {
    setFormData(prevState => ({
      ...prevState,
      inquiryType: type
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await contactService.submitContactForm(formData);
      console.log('Contact form submitted:', response.data);
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        inquiryType: 'general'
      });
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while submitting your message');
      console.error('Error submitting form:', err);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>CONTACT US</h1>
      </div>
      
      <div className="contact-sections-container">
        {loading && (
          <div className="alert alert-info">
            Sending your message, please wait...
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {typeof error === 'string' ? error : 'There was a problem submitting your message. Please try again.'}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            Your message has been sent successfully! We'll get back to you soon.
          </div>
        )}
        
        <div className="contact-grid">
          <div className="contact-card">
            <h2>GENERAL INQUIRIES</h2>
            <div className="contact-info">
              <p>Office of George W. Bush</p>
              <p>Post Office Box 259000</p>
              <p>Dallas, Texas 75225-9000</p>
              <a href="mailto:information@ogwb.org" className="contact-email">information@ogwb.org</a>
            </div>
          </div>
          
          <div className="contact-card">
            <h2>MEDIA INQUIRIES</h2>
            <div className="contact-info">
              <a href="mailto:media@ogwb.org" className="contact-email">media@ogwb.org</a>
              <div className="contact-button-container">
                <a href="#" className="contact-button">JOIN PRESS LIST</a>
              </div>
            </div>
          </div>
          
          <div className="contact-card">
            <h2>PRESIDENTIAL CENTER</h2>
            <div className="contact-info">
              <p>2943 SMU Boulevard</p>
              <p>Dallas, Texas 75205</p>
              <a href="https://www.bushcenter.org" target="_blank" rel="noopener noreferrer" className="contact-website">www.bushcenter.org</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>SEND US A MESSAGE</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inquiryType">Inquiry Type:</label>
              <div className="inquiry-type-buttons">
                <button 
                  type="button" 
                  className={`inquiry-button ${formData.inquiryType === 'general' ? 'active' : ''}`}
                  onClick={() => handleInquiryTypeChange('general')}
                >
                  General
                </button>
                <button 
                  type="button" 
                  className={`inquiry-button ${formData.inquiryType === 'media' ? 'active' : ''}`}
                  onClick={() => handleInquiryTypeChange('media')}
                >
                  Media
                </button>
                <button 
                  type="button" 
                  className={`inquiry-button ${formData.inquiryType === 'presidential' ? 'active' : ''}`}
                  onClick={() => handleInquiryTypeChange('presidential')}
                >
                  Presidential Center
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Your Name*</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email*</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message*</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 