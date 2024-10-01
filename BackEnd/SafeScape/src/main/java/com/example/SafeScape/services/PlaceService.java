package com.example.SafeScape.services;

import com.example.SafeScape.common.PlaceRepository;
import com.example.SafeScape.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Optional<Place> findPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public List<Place> findPlacesByCity(String city) {
        return placeRepository.findByCity(city);
    }

    public List<Place> findPlacesByCountry(String country) {
        return placeRepository.findByCountry(country);
    }

    public List<Place> findAllPlaces() {
        return placeRepository.findAll();
    }

    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }
}

