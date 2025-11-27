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

// Check if we're in development or production
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' || 
                      window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

const LOCAL_API_BASE_URL = 'http://localhost:8084/api';
const PRODUCTION_API_BASE_URL = 'https://your-backend.railway.app/api'; // Update with actual production URL

const API_BASE_URL = IS_DEVELOPMENT ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL;

// Mock data for demo
const mockHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Marine Drive, Mumbai',
    city: 'Mumbai',
    price: 7500,
    rating: 4.5,
    reviews: 1247,
    maxGuests: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Air Conditioning'],
    description: 'Luxury hotel with stunning sea views',
    available: true
  },
  {
    id: 2,
    name: 'Sea View Resort',
    location: 'Juhu Beach, Mumbai',
    city: 'Mumbai',
    price: 12000,
    rating: 4.8,
    reviews: 892,
    maxGuests: 6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    amenities: ['Beach Access', 'Pool', 'Bar', 'Gym', 'Spa'],
    description: 'Beachfront resort with premium amenities',
    available: true
  },
];

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Load saved user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (IS_DEVELOPMENT) {
        console.log('Fetching hotels from:', API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/hotels`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setHotels(data);
        setSearchResults(data);
        setUsingMockData(false);
        console.log('Hotels loaded successfully from API');
      } else {
        // Use mock data in production
        setHotels(mockHotels);
        setSearchResults(mockHotels);
        setUsingMockData(true);
        console.log('Using mock data in production');
      }
    } catch (err) {
      console.error('Error fetching from API, using mock data:', err.message);
      setHotels(mockHotels);
      setSearchResults(mockHotels);
      setUsingMockData(true);
      setError('Using demo data. Backend not connected.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchParams) => {
    setIsLoading(true);
    setError('');

    try {
      let filteredHotels = hotels.filter(hotel => 
        hotel.city?.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
        hotel.name?.toLowerCase().includes(searchParams.destination.toLowerCase())
      );

      if (searchParams.guests) {
        filteredHotels = filteredHotels.filter(hotel => hotel.maxGuests >= searchParams.guests);
      }

      setSearchResults(filteredHotels);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
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

  // Remove basename for local dev, use only for GitHub Pages
  const routerBasename = IS_DEVELOPMENT ? undefined : '/cozystay';

  return (
    <Router basename={routerBasename}>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />

        {/* Demo Mode Banner */}
        {usingMockData && (
          <div className="demo-banner">
            <div className="container">
              <span className="demo-icon">💡</span>
              Demo Mode: Using sample data. 
              <button onClick={() => setError('')} className="banner-close">×</button>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && !usingMockData && (
          <div className="error-banner">
            <div className="container">
              <span className="error-icon">⚠</span>
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