import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchForm from "./components/SearchForm";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import BookingForm from "./components/BookingForm";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

import './App.css';

// API base URL
const API_BASE_URL = 'http://localhost:8084/api';

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchHotels();
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/hotels`);
      if (!response.ok) throw new Error('Failed to fetch hotels');
      const data = await response.json();
      setHotels(data);
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
      let url = `${API_BASE_URL}/hotels`;
      
      if (filters.destination) {
        url = `${API_BASE_URL}/hotels/search?query=${encodeURIComponent(filters.destination)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Search failed');
      let data = await response.json();
      
      // Additional filtering
      if (filters.guests) {
        data = data.filter(hotel => hotel.maxGuests >= filters.guests);
      }
      
      if (filters.checkIn && filters.checkOut) {
        data = data.filter(hotel => hotel.availableRooms > 0);
      }
      
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <SearchForm onSearch={handleSearch} />
              <HotelList hotels={searchResults} isLoading={isLoading} />
            </>
          } />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/booking/:hotelId" element={<BookingForm user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;