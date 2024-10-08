package com.example.SafeScape.test;

import com.example.SafeScape.model.*;
import com.example.SafeScape.common.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@SpringBootTest
class RepositoryTests {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private LawRepository lawRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    private Place testPlace;
    private User testUser;

    @BeforeEach
    void setUp() {
        // Create and save a test Place
        testPlace = new Place();
        testPlace.setUrl("http://testplace.com");
        testPlace.setCountry("France");
        testPlace.setCity("Paris");
        testPlace.setDescription("A beautiful place in Paris");
        placeRepository.save(testPlace);

        // Create and save a test User
        testUser = new User();
        testUser.setFirstname("John");
        testUser.setLastname("Doe");
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password");
        testUser.setRole(Role.USER);
        userRepository.save(testUser);

        Activity activity = new Activity();
        activity.setAddress("123 Test St");
        activity.setType(ActivityType.Sightseeing);
        activity.setPlace(testPlace);
        activityRepository.save(activity);

        Event event = new Event();
        event.setTitle("Test Event");
        event.setStart(LocalDateTime.now());
        event.setEnd(LocalDateTime.now().plusHours(1));
        event.setDescription("A test event");
        event.setColor("blue");
        event.setUser(testUser);
        eventRepository.save(event);

        Hotel hotel = new Hotel();
        hotel.setName("Test Hotel");
        hotel.setAddress("456 Test Ave");
        hotel.setUrl("http://testhotel.com");
        hotel.setImage("http://testhotel.com/image.jpg");
        hotel.setRatings(4.5);
        hotel.setPlace(testPlace);
        hotelRepository.save(hotel);

        Law law = new Law();
        law.setDescription("Test Law Description");
        law.setPlace(testPlace);
        lawRepository.save(law);
    }

    @Test
    void testFindByPlaceIdInActivityRepository() {
        List<Activity> activities = activityRepository.findByPlaceId(testPlace.getId());
        assertThat(activities).isNotEmpty();
        assertThat(activities.get(0).getAddress()).isEqualTo("123 Test St");
    }

    @Test
    void testFindByUserIdInEventRepository() {
        List<Event> events = eventRepository.findByUserId(testUser.getId());
        assertThat(events).isNotEmpty();
        assertThat(events.get(0).getTitle()).isEqualTo("Test Event");
    }

    @Test
    void testFindByPlaceIdInHotelRepository() {
        List<Hotel> hotels = hotelRepository.findByPlaceId(testPlace.getId());
        assertThat(hotels).isNotEmpty();
        assertThat(hotels.get(0).getName()).isEqualTo("Test Hotel");
    }

    @Test
    void testFindByPlaceIdInLawRepository() {
        List<Law> laws = lawRepository.findByPlaceId(testPlace.getId());
        assertThat(laws).isNotEmpty();
        assertThat(laws.get(0).getDescription()).isEqualTo("Test Law Description");
    }

    @Test
    void testFindByCityInPlaceRepository() {
        List<Place> places = placeRepository.findByCity("Paris");
        assertThat(places).isNotEmpty();
        assertThat(places.get(0).getUrl()).isEqualTo("http://testplace.com");
    }

    @Test
    void testFindByCountryInPlaceRepository() {
        List<Place> places = placeRepository.findByCountry("France");
        assertThat(places).isNotEmpty();
        assertThat(places.get(0).getUrl()).isEqualTo("http://testplace.com");
    }

    @Test
    void testFindByUsernameInUserRepository() {
        Optional<User> user = userRepository.findByUsername("testuser");
        assertThat(user).isPresent();
        assertThat(user.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testFindByEmailInUserRepository() {
        Optional<User> user = userRepository.findByEmail("test@example.com");
        assertThat(user).isPresent();
        assertThat(user.get().getUsername()).isEqualTo("testuser");
    }
}
