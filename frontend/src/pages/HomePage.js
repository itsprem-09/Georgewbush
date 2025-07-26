import React from 'react';
import HomeCarousel from '../components/HomeCarousel';
import FeatureCard from '../components/FeatureCard';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      title: 'URGENT APPOINTMENT',
      imageSrc: 'https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/W100_LM3938.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2320,h:1547',
      linkTo: '/urgent-appointment'
    },
    {
      title: 'SCHEDULING REQUESTS',
      imageSrc: 'https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/W100_LM3938.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2320,h:1547',
      linkTo: '/scheduling-requests'
    },
    {
      title: 'BOOKS',
      imageSrc: 'https://img1.wsimg.com/isteam/ip/f7edcadd-a0bc-42f9-98cd-55420a02dcab/W100_LM3938.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2320,h:1547',
      linkTo: '/books'
    }
  ];

  return (
    <div className="home-page">
      <HomeCarousel />
      
      <div className="features-section">
        <div className="container">
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 mb-4">
                <FeatureCard
                  title={feature.title}
                  imageSrc={feature.imageSrc}
                  linkTo={feature.linkTo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 