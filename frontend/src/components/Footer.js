import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="social-icons">
        <a href="https://www.facebook.com/georgewbush/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/georgewbush/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
      </div>
      
      <div className="copyright">
        COPYRIGHT © {currentYear} OFFICE OF GEORGE W. BUSH - ALL RIGHTS RESERVED.
      </div>
      
      <div className="privacy-policy">
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer; 