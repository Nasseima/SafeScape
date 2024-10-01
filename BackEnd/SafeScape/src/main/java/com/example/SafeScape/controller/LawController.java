package com.example.SafeScape.controller;

import com.example.SafeScape.model.Law;
import com.example.SafeScape.services.LawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/laws")
public class LawController {

    @Autowired
    private LawService lawService;

    @GetMapping("/all")
    public List<Law> getAllLaws() {
        return lawService.findAllLaws();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Law> getLawById(@PathVariable Long id) {
        Optional<Law> law = lawService.findLawById(id);
        return law.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Law createLaw(@RequestBody Law law) {
        return lawService.saveLaw(law);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Law> updateLaw(@PathVariable Long id, @RequestBody Law law) {
        if (!lawService.findLawById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        law.setId(id);
        return ResponseEntity.ok(lawService.saveLaw(law));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaw(@PathVariable Long id) {
        if (!lawService.findLawById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        lawService.deleteLaw(id);
        return ResponseEntity.noContent().build();
    }
}
