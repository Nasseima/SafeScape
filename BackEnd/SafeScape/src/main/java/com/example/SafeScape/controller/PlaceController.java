package com.example.SafeScape.controller;

import com.example.SafeScape.model.*;
import com.example.SafeScape.services.LawService;
import com.example.SafeScape.services.PlaceService;
import com.example.SafeScape.services.HotelService;
import com.example.SafeScape.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceService placeService;
    private final HotelService hotelService;
    private final LawService lawService;
    private final ActivityService activityService;

    @Autowired
    public PlaceController(PlaceService placeService, HotelService hotelService,
                           LawService lawService, ActivityService activityService) {
        this.placeService = placeService;
        this.hotelService = hotelService;
        this.lawService = lawService;
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public List<Place> getAllPlaces() {
        return placeService.findAllPlaces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Optional<Place> place = placeService.findPlaceById(id);
        return place.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Place>> getPlaceByCity(@PathVariable String city) {
        List<Place> places = placeService.findPlacesByCity(city);
        return places.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(places);
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<Place>> getPlaceByCountry(@PathVariable String country) {
        List<Place> places = placeService.findPlacesByCountry(country);
        return places.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(places);
    }

//    @PostMapping
//    public Place createPlace(@RequestBody Place place) {
//        return placeService.savePlace(place);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place place) {
        if (!placeService.findPlaceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        place.setId(id);
        return ResponseEntity.ok(placeService.savePlace(place));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        if (!placeService.findPlaceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/hotels")
    public ResponseEntity<List<Hotel>> getHotelsByPlace(@PathVariable Long id) {
        Optional<Place> place = placeService.findPlaceById(id);
        return place.map(p -> ResponseEntity.ok(hotelService.findHotelsByPlace(p.getId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/laws")
    public ResponseEntity<List<Law>> getLawsByPlace(@PathVariable Long id) {
        Optional<Place> place = placeService.findPlaceById(id);
        return place.map(p -> ResponseEntity.ok(lawService.findLawsByPlace(p.getId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/activities")
    public ResponseEntity<List<Activity>> getActivitiesByPlace(@PathVariable Long id) {
        Optional<Place> place = placeService.findPlaceById(id);
        return place.map(p -> ResponseEntity.ok(activityService.findActivitiesByPlace(p.getId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
