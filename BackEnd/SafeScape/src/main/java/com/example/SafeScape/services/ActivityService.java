package com.example.SafeScape.services;

import com.example.SafeScape.common.ActivityRepository;
import com.example.SafeScape.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> findActivitiesByPlace(Long placeId) {
        return activityRepository.findByPlaceId(placeId);
    }

    public List<Activity> findAllActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> findActivityById(Long id) {
        return activityRepository.findById(id);
    }

    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
