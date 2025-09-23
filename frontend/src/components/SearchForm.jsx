import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Jaipur', 'Goa', 'Kochi', 'Udaipur',
    'Agra', 'Varanasi', 'Shimla', 'Manali', 'Darjeeling'
  ];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-form-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="destination">Where are you going?</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={filters.destination}
                onChange={handleChange}
                placeholder="Enter city or hotel name"
                list="cities"
              />
              <datalist id="cities">
                {indianCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            
            <div className="form-group">
              <label htmlFor="checkIn">Check-in</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={filters.checkIn}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="checkOut">Check-out</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={filters.checkOut}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="guests">Guests & Rooms</label>
              <div className="guests-rooms-selector">
                <select 
                  name="guests" 
                  value={filters.guests} 
                  onChange={handleChange}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <select 
                  name="rooms" 
                  value={filters.rooms} 
                  onChange={handleChange}
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn search-btn">
              <i className="fas fa-search"></i> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;