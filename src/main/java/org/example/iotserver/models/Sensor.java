package org.example.iotserver.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    private String type;
    private String location;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    private List<Measurement> measurements;

    // Getters and setters
}

