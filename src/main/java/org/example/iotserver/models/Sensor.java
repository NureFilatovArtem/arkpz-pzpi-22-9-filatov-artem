package org.example.iotserver.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    private String type;
    private String location;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Measurement> measurements;

    // Default constructor
    public Sensor () {}

    // Constructor with fields
    public Sensor(String type, String location, Office office, List<Measurement> measurements) {
        this.type = type;
        this.location = location;
        this.office = office;
        this.measurements = measurements;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Office getOffice() {
        return office;
    }

    public void setOffice(Office office) {
        this.office = office;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public List<Measurement> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(List<Measurement> measurements) {
        this.measurements = measurements;
        if (measurements != null) {
            measurements.forEach(measurement -> measurement.setSensor(this));
        }
    }
}