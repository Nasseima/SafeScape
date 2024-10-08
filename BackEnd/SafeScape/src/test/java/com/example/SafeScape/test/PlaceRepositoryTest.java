package com.example.SafeScape.test;

import com.example.SafeScape.common.PlaceRepository;
import com.example.SafeScape.model.Place;
import com.example.SafeScape.services.PlaceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class PlaceRepositoryTest {

    @Autowired
    private PlaceRepository placeRepository;

    @BeforeEach
    void setUp() {
        // Set up test data using the constructor from Lombok's @AllArgsConstructor
        placeRepository.save(new Place(null, "https://example.com/eiffel.jpg", "France", "Paris", "An iconic landmark.", null, null, null));
        placeRepository.save(new Place(null, "https://example.com/louvre.jpg", "France", "Paris", "World's largest art museum.", null, null, null));
        placeRepository.save(new Place(null, "https://example.com/statue.jpg", "USA", "New York", "A symbol of freedom.", null, null, null));
    }

    @ParameterizedTest
    @ValueSource(strings = {"Paris", "New York"})
    @DisplayName("Test finding places by city")
    void testFindByCity(String city) {
        List<Place> places = placeRepository.findByCity(city);
        assertEquals(city, places.get(0).getCity());
    }
}
