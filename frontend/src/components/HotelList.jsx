import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HotelList.css';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    rating: 0,
    amenities: []
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Get search parameters from URL
  const getSearchParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      destination: searchParams.get('destination') || 'Mumbai',
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: parseInt(searchParams.get('guests')) || 1,
      rooms: parseInt(searchParams.get('rooms')) || 1
    };
  };

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Enhanced sample hotel data with proper city names
  const getSampleHotels = () => {
    return [
      // Mumbai Hotels
      {
        id: 1,
        name: 'Grand Plaza Hotel',
        location: 'Marine Drive, Mumbai',
        city: 'Mumbai',
        price: 7500,
        rating: 4.5,
        reviews: 1247,
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
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        amenities: ['Beach Access', 'Pool', 'Bar', 'Gym', 'Spa'],
        description: 'Beachfront resort with premium amenities',
        available: true
      },
      {
        id: 3,
        name: 'Business Inn',
        location: 'Bandra Kurla Complex, Mumbai',
        city: 'Mumbai',
        price: 4500,
        rating: 4.2,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        amenities: ['Free WiFi', 'Conference Room', 'Gym', 'Restaurant'],
        description: 'Perfect for business travelers',
        available: true
      },
      {
        id: 4,
        name: 'Taj Mahal Palace',
        location: 'Colaba, Mumbai',
        city: 'Mumbai',
        price: 25000,
        rating: 4.9,
        reviews: 2156,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
        amenities: ['Luxury Spa', 'Fine Dining', 'Pool', 'Butler Service'],
        description: 'Iconic 5-star luxury hotel',
        available: true
      },
      {
        id: 5,
        name: 'Metro Inn',
        location: 'Andheri East, Mumbai',
        city: 'Mumbai',
        price: 3200,
        rating: 3.8,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
        amenities: ['Free WiFi', 'Restaurant', '24/7 Front Desk'],
        description: 'Comfortable budget accommodation',
        available: true
      },

      // Delhi Hotels
      {
        id: 6,
        name: 'Leela Palace Delhi',
        location: 'Diplomatic Enclave, Delhi',
        city: 'Delhi',
        price: 18000,
        rating: 4.7,
        reviews: 1567,
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
        amenities: ['Luxury Spa', 'Fine Dining', 'Pool', 'Butler Service'],
        description: 'Luxury palace hotel in Delhi',
        available: true
      },
      {
        id: 7,
        name: 'The Imperial Delhi',
        location: 'Janpath, Delhi',
        city: 'Delhi',
        price: 22000,
        rating: 4.8,
        reviews: 1890,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        amenities: ['Heritage Building', 'Fine Dining', 'Pool', 'Spa'],
        description: 'Historic luxury hotel in central Delhi',
        available: true
      },
      {
        id: 8,
        name: 'Hyatt Regency Delhi',
        location: 'Bhikaji Cama Place, Delhi',
        city: 'Delhi',
        price: 12000,
        rating: 4.5,
        reviews: 945,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        amenities: ['Business Center', 'Pool', 'Spa', 'Multiple Restaurants'],
        description: 'Modern business hotel in Delhi',
        available: true
      },

      // Bangalore Hotels
      {
        id: 9,
        name: 'ITC Gardenia',
        location: 'Richmond Road, Bangalore',
        city: 'Bangalore',
        price: 9500,
        rating: 4.6,
        reviews: 1345,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
        amenities: ['Garden', 'Pool', 'Spa', 'Business Center'],
        description: 'Luxury business hotel in Bangalore',
        available: true
      },
      {
        id: 10,
        name: 'Taj West End',
        location: 'Race Course Road, Bangalore',
        city: 'Bangalore',
        price: 15000,
        rating: 4.7,
        reviews: 1123,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        amenities: ['Heritage', 'Pool', 'Spa', 'Fine Dining'],
        description: 'Heritage hotel in garden city',
        available: true
      },
      {
        id: 11,
        name: 'The Ritz-Carlton Bangalore',
        location: 'Residency Road, Bangalore',
        city: 'Bangalore',
        price: 20000,
        rating: 4.9,
        reviews: 876,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
        amenities: ['Luxury Spa', 'Rooftop Pool', 'Fine Dining', 'Club Lounge'],
        description: 'Ultimate luxury experience in Bangalore',
        available: true
      },

      // Goa Hotels
      {
        id: 12,
        name: 'Park Hyatt Goa',
        location: 'Cansaulim, Goa',
        city: 'Goa',
        price: 12000,
        rating: 4.5,
        reviews: 987,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports'],
        description: 'Beach resort in Goa',
        available: true
      },
      {
        id: 13,
        name: 'W Goa',
        location: 'Vagator, Goa',
        city: 'Goa',
        price: 16000,
        rating: 4.4,
        reviews: 765,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
        amenities: ['Beach Club', 'Pool', 'Spa', 'Multiple Restaurants'],
        description: 'Luxury beachfront resort',
        available: true
      },
      {
        id: 14,
        name: 'Taj Fort Aguada Resort',
        location: 'Candolim, Goa',
        city: 'Goa',
        price: 18000,
        rating: 4.6,
        reviews: 654,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        amenities: ['Beachfront', 'Heritage', 'Pool', 'Spa', 'Water Sports'],
        description: 'Historic beach resort in Goa',
        available: true
      },
      {
        id: 15,
        name: 'Alila Diwa Goa',
        location: 'Majorda, Goa',
        city: 'Goa',
        price: 14000,
        rating: 4.3,
        reviews: 543,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        amenities: ['Rice Fields View', 'Pool', 'Spa', 'Ayurvedic Center'],
        description: 'Luxury resort amidst paddy fields',
        available: true
      }
    ];
  };

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      
      try {
        const searchParams = getSearchParams();
        const destination = searchParams.destination.toLowerCase();
        
        console.log('Searching for destination:', destination);
        
        // Use sample data
        const hotelsData = getSampleHotels();
        console.log('Total hotels available:', hotelsData.length);
        
        // Enhanced filtering - check city, name, and location
        const filtered = hotelsData.filter(hotel => {
          const cityMatch = hotel.city?.toLowerCase().includes(destination);
          const nameMatch = hotel.name?.toLowerCase().includes(destination);
          const locationMatch = hotel.location?.toLowerCase().includes(destination);
          
          return cityMatch || nameMatch || locationMatch;
        });
        
        console.log('Filtered hotels count:', filtered.length);
        console.log('Filtered hotels:', filtered);
        
        setHotels(filtered);
        setFilteredHotels(filtered);
      } catch (error) {
        console.error('Error loading hotels:', error);
        // Fallback to sample data
        const searchParams = getSearchParams();
        const filtered = getSampleHotels().filter(hotel => 
          hotel.city?.toLowerCase().includes(searchParams.destination.toLowerCase())
        );
        setHotels(filtered);
        setFilteredHotels(filtered);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [location.search]);

  // Apply filters and search
  useEffect(() => {
    let result = [...hotels];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(hotel =>
        hotel.name?.toLowerCase().includes(query) ||
        hotel.location?.toLowerCase().includes(query) ||
        hotel.description?.toLowerCase().includes(query) ||
        hotel.city?.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    result = result.filter(hotel => 
      hotel.price >= filters.priceRange[0] && 
      hotel.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(hotel => hotel.rating >= filters.rating);
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities?.includes(amenity))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended - keep original order
        break;
    }

    setFilteredHotels(result);
  }, [hotels, filters, sortBy, searchQuery]);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 50000],
      rating: 0,
      amenities: []
    });
    setSearchQuery('');
    setSortBy('recommended');
  };

  const searchParams = getSearchParams();

  // Debug: Log current state
  console.log('Current destination:', searchParams.destination);
  console.log('Hotels count:', hotels.length);
  console.log('Filtered hotels count:', filteredHotels.length);

  if (loading) {
    return (
      <div className="hotel-list-container">
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Finding hotels in {searchParams.destination}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hotel-list-container">
      {/* Header Section */}
      <div className="list-header">
        <div className="container">
          <h1>Hotels in {searchParams.destination}</h1>
          <p>{filteredHotels.length} hotels found</p>
          <div className="debug-info" style={{fontSize: '12px', opacity: 0.7, marginTop: '10px'}}>
            Debug: Showing {filteredHotels.length} of {hotels.length} hotels for "{searchParams.destination}"
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="list-content container">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Search Hotels</h3>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="price-slider"
            />
          </div>

          <div className="filter-section">
            <h3>Guest Rating</h3>
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="rating-filter">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                />
                <span className="stars">
                  {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} & above
                </span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Amenities</h3>
            {['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Gym', 'Air Conditioning'].map(amenity => (
              <label key={amenity} className="amenity-filter">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>

        {/* Hotels List */}
        <div className="hotels-main">
          {/* Sort Controls */}
          <div className="sort-controls">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Guest Rating</option>
            </select>
          </div>

          {/* Hotels Grid */}
          {filteredHotels.length > 0 ? (
            <div className="hotels-grid">
              {filteredHotels.map(hotel => (
                <div key={hotel.id} className="hotel-card" onClick={() => handleHotelClick(hotel.id)}>
                  <div className="hotel-image">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Hotel+Image';
                      }}
                    />
                    <div className="hotel-rating">
                      <span className="star-icon">★</span>
                      {hotel.rating}
                    </div>
                  </div>
                  
                  <div className="hotel-info">
                    <h3>{hotel.name}</h3>
                    <p className="location">
                      <i className="fas fa-map-marker-alt"></i>
                      {hotel.location} • {hotel.city}
                    </p>
                    <p className="description">{hotel.description}</p>
                    
                    <div className="amenities">
                      {hotel.amenities?.slice(0, 3).map(amenity => (
                        <span key={amenity} className="amenity">{amenity}</span>
                      ))}
                    </div>
                    
                    <div className="hotel-footer">
                      <div className="price">
                        <span className="amount">{formatPrice(hotel.price)}</span>
                        <span className="night">/night</span>
                      </div>
                      <button className="view-btn">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No hotels found in {searchParams.destination}</h3>
              <p>Try adjusting your search criteria or filters</p>
              <div className="suggestions">
                <p>Popular destinations:</p>
                <div className="destination-buttons">
                  <button onClick={() => navigate('/hotels?destination=Mumbai')}>Mumbai</button>
                  <button onClick={() => navigate('/hotels?destination=Delhi')}>Delhi</button>
                  <button onClick={() => navigate('/hotels?destination=Bangalore')}>Bangalore</button>
                  <button onClick={() => navigate('/hotels?destination=Goa')}>Goa</button>
                </div>
              </div>
              <button onClick={clearFilters} className="primary-btn">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;