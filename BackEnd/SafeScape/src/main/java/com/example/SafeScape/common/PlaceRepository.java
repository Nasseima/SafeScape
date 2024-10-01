package com.example.SafeScape.common;

import com.example.SafeScape.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCity(String city);
    List<Place> findByCountry(String country);
}
