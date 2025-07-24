import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureCard.css';

const FeatureCard = ({ title, imageSrc, linkTo }) => {
  return (
    <div className="feature-card">
      <h2 className="feature-title">{title}</h2>
      <div className="feature-image">
        <img src={imageSrc} alt={title} />
      </div>
      <Link to={linkTo} className="feature-link">
        LEARN MORE
      </Link>
    </div>
  );
};

export default FeatureCard; 