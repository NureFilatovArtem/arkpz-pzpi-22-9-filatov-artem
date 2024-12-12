package org.example.iotserver.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "measurements")
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

    // Default constructor
    public Measurement() {
    }

    // Constructor with fields
    public Measurement(LocalDate measurementDate, LocalTime measurementTime, Double lightLevel, Double noiseLevel, Double oxygenLevel, Sensor sensor) {
        this.measurementDate = measurementDate;
        this.measurementTime = measurementTime;
        this.lightLevel = lightLevel;
        this.noiseLevel = noiseLevel;
        this.oxygenLevel = oxygenLevel;
        this.sensor = sensor;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public LocalDate getMeasurementDate() {
        return measurementDate;
    }

    public void setMeasurementDate(LocalDate measurementDate) {
        this.measurementDate = measurementDate;
    }

    public LocalTime getMeasurementTime() {
        return measurementTime;
    }

    public void setMeasurementTime(LocalTime measurementTime) {
        this.measurementTime = measurementTime;
    }

    public Double getLightLevel() {
        return lightLevel;
    }

    public void setLightLevel(Double lightLevel) {
        this.lightLevel = lightLevel;
    }

    public Double getNoiseLevel() {
        return noiseLevel;
    }

    public void setNoiseLevel(Double noiseLevel) {
        this.noiseLevel = noiseLevel;
    }

    public Double getOxygenLevel() {
        return oxygenLevel;
    }

    public void setOxygenLevel(Double oxygenLevel) {
        this.oxygenLevel = oxygenLevel;
    }
}