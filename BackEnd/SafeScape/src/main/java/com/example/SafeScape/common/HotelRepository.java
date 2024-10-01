package com.example.SafeScape.common;

import com.example.SafeScape.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository <Hotel, Long> {
        List<Hotel> findByPlaceId(Long placeId);
    }

