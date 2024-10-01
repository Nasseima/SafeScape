package com.example.SafeScape.common;

import com.example.SafeScape.model.Law;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LawRepository extends JpaRepository<Law, Long> {
    List<Law> findByPlaceId(Long placeId);
}
