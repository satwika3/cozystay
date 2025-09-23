package com.cozystay.controller;

import com.cozystay.model.Hotel;
import com.cozystay.service.HotelService;
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
    
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Optional<Hotel> hotel = hotelService.getHotelById(id);
        return hotel.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam String query) {
        return hotelService.searchHotels(query);
    }
    
    @GetMapping("/city/{city}")
    public List<Hotel> getHotelsByCity(@PathVariable String city) {
        return hotelService.getHotelsByCity(city);
    }
    
    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
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
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.ok().build();
    }
}