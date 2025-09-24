import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HotelDetail.css';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [activeImage, setActiveImage] = useState(0);

  // Comprehensive hotel data with detailed information for all cities
  const sampleHotels = [
    // MUMBAI HOTELS
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Marine Drive, Mumbai, Maharashtra',
      city: 'Mumbai',
      price: 7500,
      rating: 4.5,
      reviews: 1247,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Air Conditioning', 'Parking', 'Fitness Center'],
      description: 'Luxury hotel with stunning sea views overlooking Marine Drive',
      detailedDescription: 'Grand Plaza Hotel offers luxurious accommodations with breathtaking views of the Arabian Sea. Our 5-star hotel features state-of-the-art facilities including a world-class spa, infinity pool, and multiple dining options. Located in the heart of Mumbai\'s Marine Drive, we provide easy access to business districts and tourist attractions. Experience unparalleled hospitality with our 24-hour concierge service and premium amenities designed for both business and leisure travelers.',
      highlights: [
        'Breathtaking sea views from all rooms',
        'Infinity pool overlooking Marine Drive',
        'Award-winning fine dining restaurant',
        '24-hour business center and concierge',
        'Walking distance to business districts'
      ],
      available: true,
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 24 hours before check-in'
      }
    },
    {
      id: 2,
      name: 'Taj Mahal Palace',
      location: 'Apollo Bunder, Colaba, Mumbai, Maharashtra',
      city: 'Mumbai',
      price: 25000,
      rating: 4.9,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      images: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
      ],
      amenities: ['Luxury Spa', 'Fine Dining', 'Pool', 'Butler Service', 'Free WiFi', 'Concierge', 'Valet Parking'],
      description: 'Iconic 5-star luxury hotel overlooking the Gateway of India',
      detailedDescription: 'The Taj Mahal Palace is an iconic heritage hotel that has been welcoming guests since 1903. Overlooking the majestic Gateway of India, this legendary property combines old-world charm with modern luxury. Experience unparalleled service with personal butlers, world-class dining at our award-winning restaurants, and rejuvenating treatments at our luxury spa. The hotel features stunning architecture, exquisite interiors, and a rich history that makes every stay memorable.',
      highlights: [
        'Heritage property with over 100 years of history',
        'Stunning views of Gateway of India and Arabian Sea',
        'Personal butler service for all guests',
        'Multiple award-winning restaurants and bars',
        'Luxury Jiva Spa with traditional treatments'
      ],
      available: true,
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 72 hours before check-in'
      }
    },

    // DELHI HOTELS
    {
      id: 3,
      name: 'The Imperial Delhi',
      location: 'Janpath, New Delhi, Delhi',
      city: 'Delhi',
      price: 22000,
      rating: 4.8,
      reviews: 1890,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      images: [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
      ],
      amenities: ['Heritage Building', 'Fine Dining', 'Pool', 'Spa', 'Free WiFi', 'Business Center', 'Gardens'],
      description: 'Historic luxury hotel in the heart of New Delhi',
      detailedDescription: 'The Imperial Delhi is a legendary heritage hotel that embodies the grandeur of the colonial era. Spread over 7 acres of lush gardens, this iconic property offers a tranquil oasis in the heart of India\'s capital. The hotel features magnificent architecture, antique furnishings, and art collections that reflect India\'s rich cultural heritage. Enjoy world-class dining, a serene swimming pool, and impeccable service that has made The Imperial a favorite among discerning travelers for decades.',
      highlights: [
        '7-acre property with lush landscaped gardens',
        'Heritage building with antique art collection',
        'Award-winning restaurants including Spice Route',
        'Central location near Connaught Place',
        'Luxury spa and wellness center'
      ],
      available: true,
      policies: {
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        cancellation: 'Free cancellation up to 48 hours before check-in'
      }
    },
    {
      id: 4,
      name: 'Leela Palace Delhi',
      location: 'Diplomatic Enclave, New Delhi, Delhi',
      city: 'Delhi',
      price: 18000,
      rating: 4.7,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      amenities: ['Luxury Spa', 'Fine Dining', 'Pool', 'Butler Service', 'Free WiFi', 'Business Center', 'Chauffer Service'],
      description: 'Contemporary luxury in Delhi\'s diplomatic area',
      detailedDescription: 'The Leela Palace New Delhi offers a perfect blend of traditional Indian hospitality and contemporary luxury. Located in the prestigious Diplomatic Enclave, the hotel features opulent interiors inspired by Lutyens\' Delhi architecture. Experience royal treatment with personalized butler service, world-class dining options, and a luxurious spa. The hotel\'s strategic location provides easy access to government offices, embassies, and upscale shopping destinations.',
      highlights: [
        'Inspired by Lutyens\' Delhi architecture',
        'Personalized butler service for all rooms',
        'Multiple fine dining restaurants and bars',
        'Luxury ESPA spa with holistic treatments',
        'Complimentary chauffer service within 5km radius'
      ],
      available: true,
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 24 hours before check-in'
      }
    },

    // BANGALORE HOTELS
    {
      id: 5,
      name: 'Taj West End',
      location: 'Race Course Road, Bangalore, Karnataka',
      city: 'Bangalore',
      price: 15000,
      rating: 4.7,
      reviews: 1123,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
      ],
      amenities: ['Heritage', 'Pool', 'Spa', 'Fine Dining', 'Gardens', 'Free WiFi', 'Tennis Court'],
      description: 'Colonial-era heritage hotel in Bangalore\'s garden city',
      detailedDescription: 'Taj West End is a legendary heritage hotel spread over 20 acres of lush tropical gardens in the heart of Bangalore. Established in 1887, this iconic property has hosted royalty, celebrities, and discerning travelers for over a century. The hotel beautifully preserves its colonial charm while offering modern luxury amenities. Stroll through the sprawling gardens, relax by the pool, or indulge in gourmet dining at our award-winning restaurants. Experience the perfect blend of history and contemporary comfort.',
      highlights: [
        '20-acre property with heritage gardens',
        'Colonial-era architecture preserved since 1887',
        'Olympic-sized swimming pool',
        'Multiple dining options including Blue Ginger',
        'Centrally located near business districts'
      ],
      available: true,
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 48 hours before check-in'
      }
    },
    {
      id: 6,
      name: 'ITC Gardenia',
      location: 'Residency Road, Bangalore, Karnataka',
      city: 'Bangalore',
      price: 9500,
      rating: 4.6,
      reviews: 1345,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      amenities: ['Garden', 'Pool', 'Spa', 'Business Center', 'Free WiFi', 'Fitness Center', 'Multiple Restaurants'],
      description: 'Luxury business hotel with eco-friendly initiatives',
      detailedDescription: 'ITC Gardenia is a luxury hotel that sets new benchmarks in responsible luxury. The LEED Platinum certified property features stunning architecture inspired by Bangalore\'s garden city heritage. Enjoy spacious rooms, world-class dining, and extensive wellness facilities. The hotel is designed with sustainability at its core, featuring energy-efficient systems and eco-friendly practices. Perfect for business travelers and leisure guests alike, ITC Gardenia offers a refreshing urban retreat in India\'s Silicon Valley.',
      highlights: [
        'LEED Platinum certified eco-friendly hotel',
        'Central location in Bangalore\'s business district',
        'Award-winning Kaya Kalp spa',
        'Multiple specialty restaurants including Ottimo',
        'Extensive meeting and event facilities'
      ],
      available: true,
      policies: {
        checkIn: '2:00 PM',
        checkOut: '12:00 PM',
        cancellation: 'Free cancellation up to 24 hours before check-in'
      }
    },

    // GOA HOTELS
    {
      id: 7,
      name: 'Park Hyatt Goa',
      location: 'Cansaulim Beach, South Goa, Goa',
      city: 'Goa',
      price: 12000,
      rating: 4.5,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Free WiFi', 'Multiple Restaurants', 'Kids Club'],
      description: 'Beachfront resort with Portuguese-inspired architecture',
      detailedDescription: 'Park Hyatt Goa Resort and Spa is a luxurious beachfront property set on the pristine shores of Cansaulim Beach in South Goa. Inspired by Portuguese architecture, the resort features charming villas and rooms set amidst 45 acres of lush landscapes. Enjoy direct beach access, multiple swimming pools, a world-class spa, and a variety of dining options. The resort offers a perfect blend of Goan hospitality and international standards, making it an ideal choice for families, couples, and leisure travelers.',
      highlights: [
        'Direct access to private beach section',
        '45-acre property with Portuguese architecture',
        'Multiple swimming pools including lagoon pool',
        'Sereno Spa with traditional Goan treatments',
        'Water sports and recreational activities'
      ],
      available: true,
      policies: {
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        cancellation: 'Free cancellation up to 72 hours before check-in'
      }
    },
    {
      id: 8,
      name: 'W Goa',
      location: 'Vagator Beach, North Goa, Goa',
      city: 'Goa',
      price: 16000,
      rating: 4.4,
      reviews: 765,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      images: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
      ],
      amenities: ['Beach Club', 'Pool', 'Spa', 'Multiple Restaurants', 'Free WiFi', 'Fitness Center', 'Nightclub'],
      description: 'Luxury beachfront resort with vibrant nightlife',
      detailedDescription: 'W Goa is a vibrant beachfront resort that captures the essence of Goa\'s spirited culture. Located on the stunning Vagator Beach, this luxury property offers a contemporary take on Goan hospitality. Experience the famous W vibe with stylish rooms, exciting dining venues, and the iconic WET pool deck. The resort features a beach club, spa, fitness center, and multiple dining options that celebrate local flavors with international flair. Perfect for travelers seeking luxury, entertainment, and beachside relaxation.',
      highlights: [
        'Beachfront location on Vagator Beach',
        'Iconic WET pool deck with bar',
        'WOOF - India\'s first beachside nightclub',
        'AWAY Spa with signature treatments',
        'Multiple dining venues including The Kitchen Table'
      ],
      available: true,
      policies: {
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        cancellation: 'Free cancellation up to 48 hours before check-in'
      }
    }
  ];

  useEffect(() => {
    const loadHotelDetails = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const foundHotel = sampleHotels.find(h => h.id === parseInt(id));
        setHotel(foundHotel);
        setLoading(false);
        
        // Set default dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        setBookingDates(prev => ({
          ...prev,
          checkIn: today.toISOString().split('T')[0],
          checkOut: tomorrow.toISOString().split('T')[0]
        }));
      }, 500);
    };

    loadHotelDetails();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    if (!hotel) return 0;
    const nights = bookingDates.checkIn && bookingDates.checkOut ? 
      Math.ceil((new Date(bookingDates.checkOut) - new Date(bookingDates.checkIn)) / (1000 * 60 * 60 * 24)) : 1;
    return hotel.price * nights;
  };

  const handleBookNow = () => {
    if (!bookingDates.checkIn || !bookingDates.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate(`/booking/${id}`, { 
      state: { 
        hotel, 
        bookingDates,
        total: calculateTotal()
      } 
    });
  };

  const handleInputChange = (field, value) => {
    setBookingDates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="hotel-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-error">
        <h2>Hotel not found</h2>
        <p>The hotel you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/hotels')} className="back-btn">
          Back to Hotels
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-detail-container">
      {/* Header */}
      <div className="hotel-header">
        <div className="container">
          <button onClick={() => navigate('/hotels')} className="back-button">
            ← Back to Hotels
          </button>
          <h1>{hotel.name}</h1>
          <div className="hotel-location">
            <i className="fas fa-map-marker-alt"></i>
            {hotel.location}
          </div>
          <div className="hotel-rating">
            <span className="stars">★</span>
            <span className="rating">{hotel.rating}</span>
            <span className="reviews">({hotel.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hotel-content container">
        {/* Image Gallery */}
        <div className="hotel-gallery">
          <div className="main-image">
            <img src={hotel.images[activeImage]} alt={hotel.name} />
          </div>
          <div className="thumbnail-images">
            {hotel.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${hotel.name} view ${index + 1}`}
                className={index === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="hotel-details-grid">
          {/* Hotel Information */}
          <div className="hotel-info-section">
            <section className="description-section">
              <h2>About this property</h2>
              <p className="property-description">{hotel.detailedDescription}</p>
              
              {hotel.highlights && (
                <div className="highlights-section">
                  <h3>Hotel Highlights</h3>
                  <div className="highlights-grid">
                    {hotel.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <i className="fas fa-star"></i>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="amenities-section">
              <h2>Amenities & Services</h2>
              <div className="amenities-grid">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <i className="fas fa-check"></i>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>

            <section className="policies-section">
              <h2>Hotel Policies</h2>
              <div className="policies-grid">
                <div className="policy-item">
                  <i className="fas fa-sign-in-alt"></i>
                  <div>
                    <strong>Check-in</strong>
                    <p>{hotel.policies.checkIn}</p>
                  </div>
                </div>
                <div className="policy-item">
                  <i className="fas fa-sign-out-alt"></i>
                  <div>
                    <strong>Check-out</strong>
                    <p>{hotel.policies.checkOut}</p>
                  </div>
                </div>
                <div className="policy-item">
                  <i className="fas fa-times-circle"></i>
                  <div>
                    <strong>Cancellation</strong>
                    <p>{hotel.policies.cancellation}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Booking Widget */}
          <div className="booking-widget">
            <div className="price-card">
              <div className="price-header">
                <span className="price-amount">{formatPrice(hotel.price)}</span>
                <span className="price-period">per night</span>
              </div>
              
              <div className="booking-form">
                <div className="date-inputs">
                  <div className="input-group">
                    <label>Check-in Date</label>
                    <input
                      type="date"
                      value={bookingDates.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="input-group">
                    <label>Check-out Date</label>
                    <input
                      type="date"
                      value={bookingDates.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={bookingDates.checkIn}
                    />
                  </div>
                </div>
                
                <div className="guest-inputs">
                  <div className="input-group">
                    <label>Guests</label>
                    <select
                      value={bookingDates.guests}
                      onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Rooms</label>
                    <select
                      value={bookingDates.rooms}
                      onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} Room{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="price-breakdown">
                  <div className="price-item">
                    <span>{formatPrice(hotel.price)} × 1 night</span>
                    <span>{formatPrice(hotel.price)}</span>
                  </div>
                  <div className="price-item">
                    <span>Service fee</span>
                    <span>{formatPrice(hotel.price * 0.1)}</span>
                  </div>
                  <div className="price-total">
                    <span>Total (INR)</span>
                    <span>{formatPrice(calculateTotal() + hotel.price * 0.1)}</span>
                  </div>
                </div>

                <button onClick={handleBookNow} className="book-now-btn">
                  Book Now
                </button>
                
                <div className="security-notice">
                  <i className="fas fa-shield-alt"></i>
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;