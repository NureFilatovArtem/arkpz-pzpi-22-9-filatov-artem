package org.example.iotserver.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    private List<Office> offices;

    // Getters and setters
}

