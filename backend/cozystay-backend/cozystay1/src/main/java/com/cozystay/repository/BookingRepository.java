package com.cozystay.repository;

import com.cozystay.model.Booking;
import com.cozystay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByHotelId(Long hotelId);
}