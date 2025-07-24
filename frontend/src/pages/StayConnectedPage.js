import React, { useState } from 'react';
import './StayConnectedPage.css';
import { subscriptionService } from '../services/api';

const StayConnectedPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: '',
    fiveForFriday: true,
    catalyst: true
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // ZIP code validation if provided
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'ZIP code format is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setApiError(null);
      
      try {
        const response = await subscriptionService.subscribe(formData);
        console.log('Subscription submitted:', response.data);
        setSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          city: '',
          state: '',
          zip: '',
          fiveForFriday: true,
          catalyst: true
        });
        
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error subscribing:', err);
        setApiError(err.response?.data?.error || 'An error occurred while subscribing. Please try again.');
        window.scrollTo(0, 0);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="stay-connected-page">
      <div className="hero-header">
        <div className="header-content">
          <h2>George W. Bush Presidential Center</h2>
          <h1 style={{color: 'white'}}>STAY CONNECTED</h1>
          <div className="red-underline"></div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="subscription-container">
          {loading && (
            <div className="alert alert-info">
              Processing your subscription, please wait...
            </div>
          )}
          
          {apiError && (
            <div className="alert alert-danger">
              {apiError}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              Thank you for subscribing to the Bush Center emails!
            </div>
          )}
          
          <div className="intro-text">
            <p>
              Stay up to date on the latest news, analysis of important issues, and event notifications by signing 
              up for email notifications from the George W. Bush Presidential Center.
            </p>
          </div>
          
          <div className="subscription-form-container">
            <div className="form-section">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group required">
                    <label htmlFor="email">EMAIL ADDRESS</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row two-columns">
                  <div className="form-group required">
                    <label htmlFor="firstName">FIRST NAME</label>
                    <input 
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group required">
                    <label htmlFor="lastName">LAST NAME</label>
                    <input 
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="city">CITY</label>
                    <input 
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">STATE</label>
                    <input 
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    <input 
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={errors.zip ? 'error' : ''}
                    />
                    {errors.zip && <span className="error-message">{errors.zip}</span>}
                  </div>
                </div>
                
                <div className="publications-section">
                  <h3>Which publications would you like to receive?</h3>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        name="fiveForFriday"
                        checked={formData.fiveForFriday}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      Five For Friday (Weekly)
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        name="catalyst"
                        checked={formData.catalyst}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      The Catalyst (Quarterly)
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="subscribe-button" 
                  disabled={loading}
                >
                  {loading ? 'PROCESSING...' : 'SUBSCRIBE'}
                </button>
              </form>
            </div>
            
            <div className="publications-info">
              <h3>About the Bush Center's email publications</h3>
              
              <ul className="publications-list">
                <li>
                  <h4>The Five for Friday</h4>
                  <p>Our weekly publication features the latest news, event announcements, analysis, and more — a weekly dose of freedom, opportunity, accountability, and compassion in your inbox.</p>
                </li>
                <li>
                  <h4>The Catalyst: A Journal of Ideas from the Bush Institute</h4>
                  <p>Released quarterly, <span className="highlight">The Catalyst</span> brings forward-thinking solutions to global and domestic issues. Read each issue as soon as it is released.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayConnectedPage; 