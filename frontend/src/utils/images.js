// Default hotel images from Unsplash (free to use)
export const defaultHotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop"
];

// Logo placeholder
export const defaultLogo = "🏨";

// Get random default image
export const getDefaultHotelImage = () => {
    const randomIndex = Math.floor(Math.random() * defaultHotelImages.length);
    return defaultHotelImages[randomIndex];
};

// Fallback image component
export const FallbackImage = ({ alt, className }) => {
    return (
        <div className={`fallback-image ${className}`}>
            <div className="fallback-icon">🏨</div>
            <div className="fallback-text">{alt || 'Hotel Image'}</div>
        </div>
    );
};