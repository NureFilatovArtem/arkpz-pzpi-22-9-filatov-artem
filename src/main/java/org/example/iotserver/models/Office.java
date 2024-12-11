package org.example.iotserver.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    private String name;
    private int floor;

    @OneToMany(mappedBy = "office", cascade = CascadeType.ALL)
    private List<Sensor> sensors;

    // Getters and setters
}

