package com.example.SafeScape.services;

import com.example.SafeScape.common.LawRepository;
import com.example.SafeScape.model.Law;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LawService {

    @Autowired
    private LawRepository lawRepository;

    public List<Law> findLawsByPlace(Long placeId) {
        return lawRepository.findByPlaceId(placeId);
    }

    public List<Law> findAllLaws() {
        return lawRepository.findAll();
    }

    public Optional<Law> findLawById(Long id) {
        return lawRepository.findById(id);
    }

    public Law saveLaw(Law law) {
        return lawRepository.save(law);
    }

    public void deleteLaw(Long id) {
        lawRepository.deleteById(id);
    }
}
