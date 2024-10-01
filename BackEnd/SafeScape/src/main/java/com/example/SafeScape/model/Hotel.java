package com.example.SafeScape.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="hotels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 512)
    private String url;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private double ratings;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    @JsonBackReference
    private Place place;
}
