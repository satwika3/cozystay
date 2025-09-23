import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CozyStay</h3>
            <p>Find your perfect stay across India. Book hotels, resorts, and apartments with ease.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Rooms</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Popular Destinations</h4>
            <ul>
              <li><a href="#">Hotels in Mumbai</a></li>
              <li><a href="#">Hotels in Delhi</a></li>
              <li><a href="#">Hotels in Bangalore</a></li>
              <li><a href="#">Hotels in Goa</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li><i className="fas fa-phone"></i> +91 98765 43210</li>
              <li><i className="fas fa-envelope"></i> info@cozystay.com</li>
              <li><i className="fas fa-map-marker-alt"></i> Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 CozyStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;