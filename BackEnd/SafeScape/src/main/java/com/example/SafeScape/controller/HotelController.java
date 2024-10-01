package com.example.SafeScape.controller;

import com.example.SafeScape.model.Hotel;
import com.example.SafeScape.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping("/all")
    public List<Hotel> getAllHotels() {
        return hotelService.findAllHotels();
    }
    
    @GetMapping("/{id}/hotel")
    public List<Hotel> getAllHotelsInArea(@PathVariable Long id){
        List<Hotel> allHotels = hotelService.findAllHotels();
        List <Hotel> hotelsThatMatch = new ArrayList<>();

        allHotels.stream().filter(hotel -> hotel.getPlace().getId().equals(id)).forEach(
                hotel ->{
                    hotelsThatMatch.add(hotel);
                    System.out.println(hotel);
                }
        );
        return hotelsThatMatch;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Optional<Hotel> hotel = hotelService.findHotelById(id);
        return hotel.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        if (!hotelService.findHotelById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        hotel.setId(id);
        return ResponseEntity.ok(hotelService.saveHotel(hotel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        if (!hotelService.findHotelById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}
