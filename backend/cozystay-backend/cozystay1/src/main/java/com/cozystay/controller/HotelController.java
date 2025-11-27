package com.cozystay.controller;

import com.cozystay.model.Hotel;
import com.cozystay.service.HotelService;
import com.cozystay.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // ---------------- GET ALL HOTELS ----------------
    @GetMapping
    public List<Hotel> getAllHotels(HttpServletRequest request) {
        checkToken(request);
        return hotelService.getAllHotels();
    }

    // ---------------- GET HOTEL BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id, HttpServletRequest request) {
        checkToken(request);
        Optional<Hotel> hotel = hotelService.getHotelById(id);
        return hotel.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    // ---------------- SEARCH HOTELS ----------------
    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam String query, HttpServletRequest request) {
        checkToken(request);
        return hotelService.searchHotels(query);
    }

    // ---------------- GET HOTELS BY CITY ----------------
    @GetMapping("/city/{city}")
    public List<Hotel> getHotelsByCity(@PathVariable String city, HttpServletRequest request) {
        checkToken(request);
        return hotelService.getHotelsByCity(city);
    }

    // ---------------- CREATE HOTEL ----------------
    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel, HttpServletRequest request) {
        checkToken(request);
        return hotelService.saveHotel(hotel);
    }

    // ---------------- UPDATE HOTEL ----------------
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails, HttpServletRequest request) {
        checkToken(request);
        Optional<Hotel> hotel = hotelService.getHotelById(id);
        if (hotel.isPresent()) {
            Hotel existingHotel = hotel.get();
            existingHotel.setName(hotelDetails.getName());
            existingHotel.setDescription(hotelDetails.getDescription());
            existingHotel.setPricePerNight(hotelDetails.getPricePerNight());
            existingHotel.setAvailableRooms(hotelDetails.getAvailableRooms());
            return ResponseEntity.ok(hotelService.saveHotel(existingHotel));
        }
        return ResponseEntity.notFound().build();
    }

    // ---------------- DELETE HOTEL ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id, HttpServletRequest request) {
        checkToken(request);
        hotelService.deleteHotel(id);
        return ResponseEntity.ok().build();
    }

    // ---------------- TOKEN CHECK ----------------
    private void checkToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        if (!JwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

       
    }
}