import React, { useState } from 'react';
import './UrgentAppointmentPage.css';
import { appointmentService } from '../services/api';

const UrgentAppointmentPage = () => {
  const [formData, setFormData] = useState({
    requestorFirstName: '',
    requestorLastName: '',
    phoneNumber: '',
    contactEmail: '',
    optIn: false,
    retireeFirstName: '',
    retireeMiddleName: '',
    retireeLastName: '',
    retireePreferredName: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    branch: '',
    rank: '',
    otherRank: '',
    retirementDate: '',
    ceremonyDate: '',
    yearsService: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingAddress3: '',
    mailingAddress4: '',
    mailingAddress5: '',
    company: '',
    poc: '',
    mailingCity: '',
    mailingState: '',
    mailingZipCode: '',
    additionalComments: ''
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
      const response = await appointmentService.submitAppointment(formData);
      console.log('Appointment submitted:', response.data);
      setSuccess(true);
      window.scrollTo(0, 0);
      // Reset form
      setFormData({
        requestorFirstName: '',
        requestorLastName: '',
        phoneNumber: '',
        contactEmail: '',
        optIn: false,
        retireeFirstName: '',
        retireeMiddleName: '',
        retireeLastName: '',
        retireePreferredName: '',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        branch: '',
        rank: '',
        otherRank: '',
        retirementDate: '',
        ceremonyDate: '',
        yearsService: '',
        mailingAddress1: '',
        mailingAddress2: '',
        mailingAddress3: '',
        mailingAddress4: '',
        mailingAddress5: '',
        company: '',
        poc: '',
        mailingCity: '',
        mailingState: '',
        mailingZipCode: '',
        additionalComments: ''
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
    <div className="military-retirement-page">
      <div className="page-header">
        <h1>Urgent Appointment</h1>
      </div>
      
      <div className="container">
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
            Your request has been submitted successfully. Thank you for your service!
          </div>
        )}
        
        <div className="content-section">
          <div className="retirement-info">
            <p>
              Thank you for your service to our Nation. Because President George W.
              Bush is no longer Commander in Chief, he is unable to sign retirement
              certificates. Since leaving office, however, President Bush has been
              honored to send letters of appreciation to retirees with at least 20 years
              of service.
            </p>
            <p>
              Please allow at least eight weeks for processing. Your request will be
              processed in the order in which it was received. Unfortunately, due to
              the high volume of requests we receive, we are unable to conduct
              individual status checks.
            </p>
            <p>
              If you have not received your Letter of Appreciation after <strong>eight weeks</strong> 
              has passed from the date of your submission, you may email
              <a href="mailto:info@ogwb.org"> info@ogwb.org</a> for more information.
            </p>
            <p>
              If your retirement ceremony is more than six months away, <strong>we kindly
              ask that you wait to submit your request until the ceremony is
              within six months.</strong>
            </p>
            <p>
              <strong>If you are medically retiring</strong> with less than 20 years of service, please
              be sure to note your medical retirement in the additional comments
              section below so we can ensure your request is processed.
            </p>
            <p>
              If you would like to submit a request for a letter of appreciation for a
              <strong> civilian retiree</strong>, please email <a href="mailto:info@ogwb.org">info@ogwb.org</a> for more information as
              this form is reserved for military only.
            </p>
          </div>

          <form className="retirement-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Requestor Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="requestorFirstName">Requestor First Name*</label>
                  <input 
                    type="text" 
                    id="requestorFirstName" 
                    name="requestorFirstName"
                    value={formData.requestorFirstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="requestorLastName">Requestor Last Name*</label>
                  <input 
                    type="text" 
                    id="requestorLastName" 
                    name="requestorLastName"
                    value={formData.requestorLastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
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
              </div>
              <div className="form-row">
                <div className="form-field">
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
              </div>
              <div className="form-row">
                <div className="form-field checkbox-field">
                  <input 
                    type="checkbox" 
                    id="optIn" 
                    name="optIn"
                    checked={formData.optIn}
                    onChange={handleChange}
                  />
                  <label htmlFor="optIn">Opt in to receive communications from the Bush Center</label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Retiree Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="retireeFirstName">Retiree First Name*</label>
                  <input 
                    type="text" 
                    id="retireeFirstName" 
                    name="retireeFirstName"
                    value={formData.retireeFirstName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="retireeMiddleName">Retiree Middle Name</label>
                  <input 
                    type="text" 
                    id="retireeMiddleName" 
                    name="retireeMiddleName"
                    value={formData.retireeMiddleName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="retireeLastName">Retiree Last Name*</label>
                  <input 
                    type="text" 
                    id="retireeLastName" 
                    name="retireeLastName"
                    value={formData.retireeLastName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="retireePreferredName">Retiree Preferred First Name*</label>
                  <input 
                    type="text" 
                    id="retireePreferredName" 
                    name="retireePreferredName"
                    value={formData.retireePreferredName}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
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
              </div>
              <div className="form-row">
                <div className="form-field">
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
              </div>
              <div className="form-row">
                <div className="form-field">
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
                <div className="form-field">
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
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="branch">Branch*</label>
                  <input 
                    type="text" 
                    id="branch" 
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="rank">Rank*</label>
                  <input 
                    type="text" 
                    id="rank" 
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="otherRank">Other Rank</label>
                  <input 
                    type="text" 
                    id="otherRank" 
                    name="otherRank"
                    value={formData.otherRank}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="retirementDate">Retirement Date*</label>
                  <input 
                    type="date" 
                    id="retirementDate" 
                    name="retirementDate"
                    value={formData.retirementDate}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="ceremonyDate">Ceremony Date</label>
                  <input 
                    type="date" 
                    id="ceremonyDate" 
                    name="ceremonyDate"
                    value={formData.ceremonyDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="yearsService">Years of Active Duty Service (Minimum of 20)*</label>
                  <input 
                    type="number" 
                    id="yearsService" 
                    name="yearsService"
                    value={formData.yearsService}
                    onChange={handleChange}
                    min="20" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Letter of Appreciation Mailing Address</h2>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingAddress1">Mailing Address Line 1 *</label>
                  <input 
                    type="text" 
                    id="mailingAddress1" 
                    name="mailingAddress1"
                    value={formData.mailingAddress1}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingAddress2">Mailing Address Line 2</label>
                  <input 
                    type="text" 
                    id="mailingAddress2" 
                    name="mailingAddress2"
                    value={formData.mailingAddress2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingAddress3">Mailing Address Line 3</label>
                  <input 
                    type="text" 
                    id="mailingAddress3" 
                    name="mailingAddress3"
                    value={formData.mailingAddress3}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingAddress4">Mailing Address Line 4</label>
                  <input 
                    type="text" 
                    id="mailingAddress4" 
                    name="mailingAddress4"
                    value={formData.mailingAddress4}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingAddress5">Mailing Address Line 5</label>
                  <input 
                    type="text" 
                    id="mailingAddress5" 
                    name="mailingAddress5"
                    value={formData.mailingAddress5}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="poc">POC</label>
                  <input 
                    type="text" 
                    id="poc" 
                    name="poc"
                    value={formData.poc}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingCity">Mailing City *</label>
                  <input 
                    type="text" 
                    id="mailingCity" 
                    name="mailingCity"
                    value={formData.mailingCity}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="mailingState">Mailing State *</label>
                  <input 
                    type="text" 
                    id="mailingState" 
                    name="mailingState"
                    value={formData.mailingState}
                    onChange={handleChange}
                    pattern="[A-Za-z]{2}" 
                    title="Please enter a valid 2-letter state code" 
                    required 
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="mailingZipCode">Mailing Zip Code *</label>
                  <input 
                    type="text" 
                    id="mailingZipCode" 
                    name="mailingZipCode"
                    value={formData.mailingZipCode}
                    onChange={handleChange}
                    pattern="[0-9]{5}(-[0-9]{4})?" 
                    title="Please enter a 5-digit zip code or ZIP+4" 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="additionalComments">Additional Comments</label>
                  <textarea 
                    id="additionalComments" 
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <div className="form-row">
                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrgentAppointmentPage; 