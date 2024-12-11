package org.example.iotserver.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sensor_id", nullable = false)
    private Sensor sensor;

    private LocalDate measurementDate;
    private LocalTime measurementTime;
    private Double lightLevel;
    private Double noiseLevel;
    private Double oxygenLevel;

    // Getters and setters
}

