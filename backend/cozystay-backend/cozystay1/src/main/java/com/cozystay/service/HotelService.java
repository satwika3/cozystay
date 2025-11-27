package com.cozystay.service;

import com.cozystay.model.Hotel;
import com.cozystay.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    // ---------------- GET ALL HOTELS ----------------
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    // ---------------- GET HOTEL BY ID ----------------
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    // ---------------- SEARCH HOTELS ----------------
    public List<Hotel> searchHotels(String query) {
        if (query == null || query.trim().isEmpty()) {
            return hotelRepository.findAll(); // return all if query is empty
        }
        return hotelRepository.searchHotels(query);
    }

    // ---------------- GET HOTELS BY CITY ----------------
    public List<Hotel> getHotelsByCity(String city) {
        if (city == null || city.trim().isEmpty()) {
            return hotelRepository.findAll(); // return all if city is empty
        }
        return hotelRepository.findByCityContainingIgnoreCase(city);
    }

    // ---------------- CREATE OR UPDATE HOTEL ----------------
    public Hotel saveHotel(Hotel hotel) {
        if (hotel == null) {
            throw new IllegalArgumentException("Hotel cannot be null");
        }
        return hotelRepository.save(hotel);
    }

    // ---------------- DELETE HOTEL ----------------
    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new IllegalArgumentException("Hotel with id " + id + " not found");
        }
        hotelRepository.deleteById(id);
    }
}