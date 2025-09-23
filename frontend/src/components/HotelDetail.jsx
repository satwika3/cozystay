import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './HotelDetail.css';

const API_BASE_URL = 'http://localhost:8084/api';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
      if (!response.ok) throw new Error('Hotel not found');
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookNow = () => {
    navigate(`/booking/${id}`, { state: { hotel, bookingData } });
  };

  if (isLoading) return (
    <section className="hotel-detail">
      <div className="container">
        <div className="loading">Loading hotel details...</div>
      </div>
    </section>
  );

  if (!hotel) return (
    <section className="hotel-detail">
      <div className="container">
        <div className="error">Hotel not found</div>
      </div>
    </section>
  );

  return (
    <section className="hotel-detail">
      <div className="container">
        <div className="hotel-header">
          <h1>{hotel.name}</h1>
          <p className="hotel-location">
            <i className="fas fa-map-marker-alt"></i>
            {hotel.address}, {hotel.city}, {hotel.state}
          </p>
          <div className="hotel-rating">
            <i className="fas fa-star"></i>
            <span>{hotel.rating || '4.0'} • {hotel.reviewCount || '0'} reviews</span>
          </div>
        </div>

        <div className="hotel-gallery">
          <div className="main-image">
            <img src={hotel.imageUrl || '/default-hotel.jpg'} alt={hotel.name} />
          </div>
        </div>

        <div className="hotel-content">
          <div className="hotel-info">
            <h2>About this property</h2>
            <p>{hotel.description}</p>
            
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {hotel.amenities && hotel.amenities.map(amenity => (
                <div key={amenity} className="amenity-item">
                  <i className="fas fa-check"></i>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-widget">
            <div className="price-card">
              <div className="price-header">
                <span className="price">{formatCurrency(hotel.pricePerNight)}</span>
                <span className="price-label">per night</span>
              </div>
              
              <div className="booking-dates">
                <div className="date-input">
                  <label>Check-in</label>
                  <input 
                    type="date" 
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleBookingChange}
                  />
                </div>
                <div className="date-input">
                  <label>Check-out</label>
                  <input 
                    type="date" 
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>
              
              <div className="guests-selector">
                <label>Guests</label>
                <select 
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleBookingChange}
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <button onClick={handleBookNow} className="btn book-now-btn">
                Book Now
              </button>
              
              <div className="price-breakdown">
                <div className="price-item">
                  <span>{formatCurrency(hotel.pricePerNight)} x 1 night</span>
                  <span>{formatCurrency(hotel.pricePerNight)}</span>
                </div>
                <div className="price-item">
                  <span>Service fee</span>
                  <span>{formatCurrency(hotel.pricePerNight * 0.1)}</span>
                </div>
                <div className="price-total">
                  <span>Total</span>
                  <span>{formatCurrency(hotel.pricePerNight * 1.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetail;