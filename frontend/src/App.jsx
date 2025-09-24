import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import HotelList from './components/HotelList';
import HotelDetail from './components/HotelDetail';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import './App.css';

// API base URL - Match your Spring Boot port 8084
const API_BASE_URL = 'http://localhost:8084/api';

// Sample hotels data for Delhi, Bangalore, and Goa
const sampleHotels = [
  // Delhi Hotels
  {
    id: 1,
    name: "The Imperial New Delhi",
    city: "Delhi",
    price: 8500,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400",
    description: "Luxury heritage hotel in the heart of Delhi",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant"],
    maxGuests: 4
  },
  {
    id: 2,
    name: "Taj Palace Delhi",
    city: "Delhi",
    price: 12000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    description: "5-star luxury with exquisite dining options",
    amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center", "Business Center"],
    maxGuests: 6
  },
  {
    id: 3,
    name: "Le Meridien New Delhi",
    city: "Delhi",
    price: 6500,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    description: "Contemporary luxury in central Delhi",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Bar"],
    maxGuests: 3
  },

  // Bangalore Hotels
  {
    id: 4,
    name: "ITC Gardenia Bangalore",
    city: "Bangalore",
    price: 9500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400",
    description: "Luxury eco-friendly hotel in Bengaluru",
    amenities: ["Free WiFi", "Pool", "Spa", "Multiple Restaurants", "Gym"],
    maxGuests: 5
  },
  {
    id: 5,
    name: "The Oberoi Bengaluru",
    city: "Bangalore",
    price: 11000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    description: "Ultra-luxury hotel with exceptional service",
    amenities: ["Free WiFi", "Infinity Pool", "Luxury Spa", "Fine Dining", "Concierge"],
    maxGuests: 4
  },
  {
    id: 6,
    name: "Taj West End Bangalore",
    city: "Bangalore",
    price: 8000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400",
    description: "Heritage hotel set in lush gardens",
    amenities: ["Free WiFi", "Pool", "Tennis Court", "Spa", "Multiple Dining Options"],
    maxGuests: 6
  },

  // Goa Hotels
  {
    id: 7,
    name: "Taj Fort Aguada Resort & Spa",
    city: "Goa",
    price: 15000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    description: "Beachfront luxury resort in Goa",
    amenities: ["Private Beach", "Pool", "Spa", "Water Sports", "Multiple Restaurants"],
    maxGuests: 8
  },
  {
    id: 8,
    name: "Park Hyatt Goa",
    city: "Goa",
    price: 12500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    description: "Village-style luxury resort on Arossim Beach",
    amenities: ["Beach Access", "Lagoon Pool", "Spa", "Golf", "Kids Club"],
    maxGuests: 7
  },
  {
    id: 9,
    name: "Le Meridien Goa",
    city: "Goa",
    price: 9000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    description: "Contemporary beach resort with panoramic sea views",
    amenities: ["Beach Front", "Pool", "Spa", "Fitness Center", "Water Sports"],
    maxGuests: 5
  }
];

function App() {
  const [hotels, setHotels] = useState(sampleHotels);
  const [searchResults, setSearchResults] = useState(sampleHotels);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for saved user on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Initialize with sample hotels
    setHotels(sampleHotels);
    setSearchResults(sampleHotels);
  }, []);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError('');
    
    try {
      let filteredHotels = hotels.filter(hotel => {
        const matchesDestination = 
          hotel.city?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
          hotel.name?.toLowerCase().includes(searchParams.destination.toLowerCase());
        
        const matchesGuests = searchParams.guests ? hotel.maxGuests >= searchParams.guests : true;
        
        return matchesDestination && matchesGuests;
      });
      
      setSearchResults(filteredHotels.length > 0 ? filteredHotels : []);
      
      if (filteredHotels.length === 0) {
        setError(`No hotels found in ${searchParams.destination}. Showing all available hotels.`);
        setSearchResults(hotels);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
      setSearchResults(hotels);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setError('');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        
        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <div className="container">
              <span className="error-icon">⚠️</span>
              {error}
              <button onClick={() => setError('')} className="error-close">×</button>
            </div>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <SearchForm onSearch={handleSearch} />
              <HotelList hotels={searchResults} isLoading={isLoading} />
            </>
          } />
          <Route path="/hotels" element={<HotelList hotels={searchResults} isLoading={isLoading} />} />
          <Route path="/hotel/:id" element={<HotelDetail hotels={hotels} />} />
          <Route path="/booking/:hotelId" element={<BookingForm user={user} hotels={hotels} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;