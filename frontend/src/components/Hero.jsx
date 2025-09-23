import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect Stay
          </h1>
          <p className="hero-subtitle">
            Discover amazing hotels, resorts, and apartments across India
          </p>
          <div className="hero-tags">
            <span className="tag">RESORT</span>
            <span className="tag">HOTEL</span>
            <span className="tag">APARTMENT</span>
            <span className="tag">CHALET</span>
            <span className="tag">LODGE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;