package com.example.SafeScape.common;

import com.example.SafeScape.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByPlaceId(Long placeId);
}
