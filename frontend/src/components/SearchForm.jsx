import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });

  const navigate = useNavigate();

  // Set default dates on component mount
  React.useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setSearchParams(prev => ({
      ...prev,
      checkIn: today.toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0],
      destination: 'Mumbai'
    }));
  }, []);

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validate dates
    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);
    
    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    if (!searchParams.destination.trim()) {
      alert('Please enter a destination');
      return;
    }

    // Navigate to hotel list with search parameters
    const queryParams = new URLSearchParams({
      destination: searchParams.destination,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      rooms: searchParams.rooms
    });

    navigate(`/hotels?${queryParams.toString()}`);
  };

  const popularDestinations = [
    { name: 'Mumbai', hotels: 245 },
    { name: 'Delhi', hotels: 189 },
    { name: 'Bangalore', hotels: 167 },
    { name: 'Goa', hotels: 134 }
  ];

  return (
    <div className="search-form-container">
      <div className="search-hero">
        <div className="container">
          <h1>CozyStay</h1>
          <p className="hero-subtitle">Find your perfect stay across India</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-grid">
              <div className="form-group">
                <label>Where are you going?</label>
                <input
                  type="text"
                  placeholder="Enter city or hotel name"
                  value={searchParams.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Check-in</label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Check-out</label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  min={searchParams.checkIn}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Guests & Rooms</label>
                <div className="guests-rooms-selector">
                  <div className="selector-group">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('guests', Math.max(1, searchParams.guests - 1))}
                      className="selector-btn"
                    >
                      -
                    </button>
                    <span>{searchParams.guests} Guest{searchParams.guests !== 1 ? 's' : ''}</span>
                    <button 
                      type="button"
                      onClick={() => handleInputChange('guests', searchParams.guests + 1)}
                      className="selector-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="selector-group">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('rooms', Math.max(1, searchParams.rooms - 1))}
                      className="selector-btn"
                    >
                      -
                    </button>
                    <span>{searchParams.rooms} Room{searchParams.rooms !== 1 ? 's' : ''}</span>
                    <button 
                      type="button"
                      onClick={() => handleInputChange('rooms', searchParams.rooms + 1)}
                      className="selector-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </form>

          {/* Popular Destinations */}
          <div className="popular-destinations">
            <p>Popular destinations:</p>
            <div className="destination-tags">
              {popularDestinations.map(dest => (
                <button
                  key={dest.name}
                  type="button"
                  className="destination-tag"
                  onClick={() => {
                    handleInputChange('destination', dest.name);
                    // Auto-submit after selecting destination
                    setTimeout(() => {
                      document.querySelector('.search-btn').click();
                    }, 100);
                  }}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;