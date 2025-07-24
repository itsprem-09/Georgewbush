import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="social-icons-top">
        <a href="https://www.facebook.com/georgewbush/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/georgewbush/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
      </div>
      
      <div className="navbar-logo">
        <Link to="/">
          <img 
            src="https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/OGWB%20Logo_002-0001.jpg/:/rs=w:1290,h:250,cg:true,m/cr=w:1290,h:250/qt=q:95" 
            alt="Presidential Seal"
            className="seal-image"
          />
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/urgent-appointment" className="nav-link">URGENT APPOINTMENT</Link>
        <Link to="/scheduling-requests" className="nav-link">SCHEDULING REQUESTS</Link>
        <Link to="/books" className="nav-link">BOOKS</Link>
        <div className="dropdown">
          <Link to="/stay-connected" className="nav-link dropbtn">STAY CONNECTED <i className="bi bi-caret-down-fill"></i></Link>
          <div className="dropdown-content">
            <Link to="/stay-connected">Subscribe</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 