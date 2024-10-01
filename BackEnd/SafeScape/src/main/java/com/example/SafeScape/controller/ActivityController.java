package com.example.SafeScape.controller;

import com.example.SafeScape.model.Activity;
import com.example.SafeScape.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/all")
    public List<Activity> getAllActivities() {
        return activityService.findAllActivities();
    }

    @GetMapping("/{id}/activities")
    public List<Activity> getAllActivityInArea(@PathVariable Long id){
        List<Activity> allActivities = activityService.findAllActivities();
        List <Activity> activitiesThatMatch = new ArrayList<>();

        allActivities.stream().filter(activity -> activity.getPlace().getId().equals(id)).forEach(
                activity ->{
                    activitiesThatMatch.add(activity);
                    System.out.println(activity);
                }
        );
        return activitiesThatMatch;
    }


    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Optional<Activity> activity = activityService.findActivityById(id);
        return activity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return activityService.saveActivity(activity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        if (!activityService.findActivityById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        activity.setId(id);
        return ResponseEntity.ok(activityService.saveActivity(activity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        if (!activityService.findActivityById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}

