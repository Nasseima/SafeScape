package com.example.SafeScape.services;

import com.example.SafeScape.common.HotelRepository;
import com.example.SafeScape.model.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> findHotelsByPlace(Long placeId) {
        return hotelRepository.findByPlaceId(placeId);
    }

    public List<Hotel> findAllHotels() {
        return hotelRepository.findAll();
    }

    public Optional<Hotel> findHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    public Hotel saveHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }


}
