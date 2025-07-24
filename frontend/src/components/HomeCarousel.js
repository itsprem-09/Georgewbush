import React, { useEffect } from 'react';
import './HomeCarousel.css';

const HomeCarousel = () => {
  useEffect(() => {
    // Initialize the Bootstrap carousel when component mounts
    const carousel = document.getElementById('homeCarousel');
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true
      });
    }
  }, []);

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-image">
            <img 
              src="https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/W100_LM3938.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2320,h:1547" 
              alt="President Bush meeting with hospital patients" 
              className="d-block w-100"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-image">
            <img 
              src="https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/Finish.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:984,h:657" 
              alt="Bike riders at W100K event" 
              className="d-block w-100"
            />
          </div>
        </div>
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeCarousel; 