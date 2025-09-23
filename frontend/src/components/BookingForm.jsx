import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css';

const API_BASE_URL = 'http://localhost:8084/api';

const BookingForm = ({ user }) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    numberOfRooms: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (location.state?.hotel) {
      setHotel(location.state.hotel);
      setBookingData(prev => ({
        ...prev,
        ...location.state.bookingData
      }));
      setIsLoading(false);
    } else {
      fetchHotel();
    }
  }, [hotelId, user, navigate, location]);

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}`);
      if (!response.ok) throw new Error('Hotel not found');
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    if (!hotel) return 0;
    const nights = Math.max(1, Math.ceil((new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24)));
    return hotel.pricePerNight * nights * bookingData.numberOfRooms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingPayload = {
        hotelId: parseInt(hotelId),
        userId: user.id,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        numberOfGuests: parseInt(bookingData.numberOfGuests),
        numberOfRooms: parseInt(bookingData.numberOfRooms),
        totalAmount: calculateTotal()
      };

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        alert('Booking confirmed successfully!');
        navigate('/');
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <section className="booking-form">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    );
  }

  if (!hotel) {
    return (
      <section className="booking-form">
        <div className="container">
          <div className="error">Hotel not found</div>
        </div>
      </section>
    );
  }

  const totalAmount = calculateTotal();
  const nights = Math.max(1, Math.ceil((new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24)));

  return (
    <section className="booking-form">
      <div className="container">
        <div className="booking-header">
          <h1>Complete Your Booking</h1>
          <p>Review your details and confirm your reservation</p>
        </div>

        <div className="booking-content">
          <div className="booking-details">
            <div className="hotel-summary">
              <h2>{hotel.name}</h2>
              <p><i className="fas fa-map-marker-alt"></i> {hotel.city}, {hotel.state}</p>
              <div className="booking-dates-summary">
                <p><strong>Check-in:</strong> {bookingData.checkInDate}</p>
                <p><strong>Check-out:</strong> {bookingData.checkOutDate}</p>
                <p><strong>Guests:</strong> {bookingData.numberOfGuests}</p>
                <p><strong>Rooms:</strong> {bookingData.numberOfRooms}</p>
                <p><strong>Duration:</strong> {nights} night{nights > 1 ? 's' : ''}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form-fields">
              <h3>Guest Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={user.name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={user.email}
                    disabled
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input 
                    type="date" 
                    name="checkInDate"
                    value={bookingData.checkInDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input 
                    type="date" 
                    name="checkOutDate"
                    value={bookingData.checkOutDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select 
                    name="numberOfGuests"
                    value={bookingData.numberOfGuests}
                    onChange={handleChange}
                    required
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Number of Rooms</label>
                  <select 
                    name="numberOfRooms"
                    value={bookingData.numberOfRooms}
                    onChange={handleChange}
                    required
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn confirm-booking-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>

          <div className="price-summary">
            <div className="price-card">
              <h3>Price Summary</h3>
              <div className="price-details">
                <div className="price-item">
                  <span>{formatCurrency(hotel.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''} × {bookingData.numberOfRooms} room{bookingData.numberOfRooms > 1 ? 's' : ''}</span>
                  <span>{formatCurrency(hotel.pricePerNight * nights * bookingData.numberOfRooms)}</span>
                </div>
                <div className="price-item">
                  <span>Service fee</span>
                  <span>{formatCurrency(totalAmount * 0.1)}</span>
                </div>
                <div className="price-total">
                  <span>Total</span>
                  <span>{formatCurrency(totalAmount * 1.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;