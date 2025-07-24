import React from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page">
      <div className="page-header">
        <h1>PRIVACY POLICY</h1>
      </div>
      
      <div className="container">
        <div className="privacy-content">
          <h2>Privacy Policy for Office of George W. Bush</h2>
          <p>Last Updated: July 17, 2025</p>
          
          <div className="policy-section">
            <h3>Introduction</h3>
            <p>
              The Office of George W. Bush ("we," "our," or "us") respects your privacy and is committed to 
              protecting it through our compliance with this Privacy Policy. This policy describes the types 
              of information we may collect from you or that you may provide when you visit our website and 
              our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </div>
          
          <div className="policy-section">
            <h3>Information We Collect</h3>
            <p>We may collect several types of information from and about users of our website, including:</p>
            <ul>
              <li>
                Personal information such as name, postal address, email address, telephone number, 
                and any other identifier by which you may be contacted online or offline when you 
                provide it to us voluntarily.
              </li>
              <li>
                Information about your internet connection, the equipment you use to access our website, 
                and usage details.
              </li>
            </ul>
          </div>
          
          <div className="policy-section">
            <h3>How We Use Your Information</h3>
            <p>We use information that we collect about you or that you provide to us:</p>
            <ul>
              <li>To present our website and its contents to you.</li>
              <li>To provide you with information or services that you request from us.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To carry out our obligations and enforce our rights.</li>
              <li>To notify you about changes to our website or any products or services we offer.</li>
              <li>For any other purpose with your consent.</li>
            </ul>
          </div>
          
          <div className="policy-section">
            <h3>Disclosure of Your Information</h3>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              except as described in this Privacy Policy.
            </p>
          </div>
          
          <div className="policy-section">
            <h3>Contact Information</h3>
            <p>
              If you have any questions or comments about this Privacy Policy, please contact us at:<br />
              Email: <a href="mailto:privacy@georgewbush.com">privacy@georgewbush.com</a><br />
              Mailing Address:<br />
              Office of George W. Bush<br />
              Attn: Privacy Officer<br />
              P.O. Box 259000<br />
              Dallas, TX 75225-9000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 