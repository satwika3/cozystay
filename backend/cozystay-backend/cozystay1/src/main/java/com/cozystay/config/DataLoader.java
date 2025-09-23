package com.cozystay.config;

import com.cozystay.model.Hotel;
import com.cozystay.model.User;
import com.cozystay.repository.HotelRepository;
import com.cozystay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private HotelRepository hotelRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create sample hotels
        if (hotelRepository.count() == 0) {
            Hotel hotel1 = new Hotel();
            hotel1.setName("Taj Mahal Palace");
            hotel1.setDescription("Luxury hotel overlooking the Gateway of India");
            hotel1.setAddress("Apollo Bunder, Colaba");
            hotel1.setCity("Mumbai");
            hotel1.setState("Maharashtra");
            hotel1.setPricePerNight(25000.0);
            hotel1.setAvailableRooms(15);
            hotel1.setMaxGuests(4);
            hotel1.setRating(4.8);
            hotel1.setReviewCount(2847);
            hotel1.setAmenities(Arrays.asList("Free WiFi", "Swimming Pool", "Spa", "Fitness Center"));
            hotel1.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500");
            
            Hotel hotel2 = new Hotel();
            hotel2.setName("The Leela Palace");
            hotel2.setDescription("Opulent 5-star hotel with luxurious rooms");
            hotel2.setAddress("Airport Road");
            hotel2.setCity("Bangalore");
            hotel2.setState("Karnataka");
            hotel2.setPricePerNight(18000.0);
            hotel2.setAvailableRooms(20);
            hotel2.setMaxGuests(3);
            hotel2.setRating(4.7);
            hotel2.setReviewCount(1923);
            hotel2.setAmenities(Arrays.asList("Free WiFi", "Swimming Pool", "Spa", "Airport Shuttle"));
            hotel2.setImageUrl("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500");
            
            hotelRepository.saveAll(Arrays.asList(hotel1, hotel2));
            System.out.println("Sample hotels created!");
        }
        
        // Create admin user
        if (userRepository.findByEmail("admin@cozystay.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@cozystay.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // Encoded password
            admin.setPhone("9876543210");
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created!");
        }
        
        // Create sample customer user
        if (userRepository.findByEmail("customer@cozystay.com").isEmpty()) {
            User customer = new User();
            customer.setName("Test Customer");
            customer.setEmail("customer@cozystay.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setPhone("9876543211");
            customer.setRole(User.UserRole.CUSTOMER);
            userRepository.save(customer);
            System.out.println("Customer user created!");
        }
    }
}