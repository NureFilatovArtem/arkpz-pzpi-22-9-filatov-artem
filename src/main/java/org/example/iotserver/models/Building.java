package org.example.iotserver.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location; // Add this field for location
    private int numberOfFloors; // Add this field for number of floors

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Prevents recursion
    private List<Office> offices;

    // Default constructor
    public Building() {
    }

    // Constructor with fields
    public Building(String name, String location, int numberOfFloors, List<Office> offices) {
        this.name = name;
        this.location = location;
        this.numberOfFloors = numberOfFloors;
        this.offices = offices;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public List<Office> getOffices() {
        return offices;
    }

    public void setOffices(List<Office> offices) {
        if (offices == null) {
            this.offices = new ArrayList<>();
        } else {
            this.offices = offices;
            offices.forEach(office -> office.setBuilding(this));
        }
    }
}