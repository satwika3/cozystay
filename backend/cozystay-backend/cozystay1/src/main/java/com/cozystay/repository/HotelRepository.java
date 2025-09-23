package com.cozystay.repository;

import com.cozystay.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByCityContainingIgnoreCase(String city);
    List<Hotel> findByStateContainingIgnoreCase(String state);
    
    @Query("SELECT h FROM Hotel h WHERE LOWER(h.city) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Hotel> searchHotels(@Param("query") String query);
    
    List<Hotel> findByAvailableRoomsGreaterThan(Integer minRooms);
}