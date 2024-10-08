package com.example.SafeScape;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.SafeScape.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.util.List;


@SpringBootApplication
public class SafeScapeApplication {

	private static final Logger logger = LoggerFactory.getLogger(SafeScapeApplication.class);

	@Autowired
	private com.example.SafeScape.services.PlaceService placeService;

	@Autowired
	private com.example.SafeScape.services.HotelService hotelService;

	@Autowired
	private com.example.SafeScape.services.LawService lawService;

	@Autowired
	private com.example.SafeScape.services.ActivityService activityService;

	public static void main(String[] args) {
		SpringApplication.run(SafeScapeApplication.class, args);
	}

	@Bean
	public CommandLineRunner run() {
		return args -> {
			logger.info("SafeScape Application up and running");
			logger.warn("This is a warning message!");
			logger.error("This is an error message with an argument: {}", "some error detail");

			try {
				loadPlaces();
				loadHotels();
				loadLaws();
				loadActivities();
			} catch (IOException e) {
				logger.error("Error loading data: ", e);
			}
		};
	}

	private void loadPlaces() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<Place> places = mapper.readValue(new ClassPathResource("Data/Place.JSON").getFile(),
				mapper.getTypeFactory().constructCollectionType(List.class, Place.class));
		for (Place place : places) {
			placeService.savePlace(place);
		}
		logger.info("Loaded places data");
	}

	private void loadHotels() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<Hotel> hotels = mapper.readValue(new ClassPathResource("Data/Hotel.JSON").getFile(),
				mapper.getTypeFactory().constructCollectionType(List.class, Hotel.class));
		for (Hotel hotel : hotels) {
			hotelService.saveHotel(hotel);
		}
		logger.info("Loaded hotels data");
	}

	private void loadLaws() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<Law> laws = mapper.readValue(new ClassPathResource("Data/Law.JSON").getFile(),
				mapper.getTypeFactory().constructCollectionType(List.class, Law.class));
		for (Law law : laws) {
			lawService.saveLaw(law);
		}
		logger.info("Loaded laws data");
	}

	private void loadActivities() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<Activity> activities = mapper.readValue(new ClassPathResource("Data/Activity.JSON").getFile(),
				mapper.getTypeFactory().constructCollectionType(List.class, Activity.class));
		for (Activity activity : activities) {
			activityService.saveActivity(activity);
		}
		logger.info("Loaded activities data");
	}
}
