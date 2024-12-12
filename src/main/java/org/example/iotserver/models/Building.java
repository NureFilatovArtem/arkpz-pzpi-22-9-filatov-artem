package org.example.iotserver.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "buildings")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    private String location; // Optional

    @Column(nullable = false)
    private int numberOfFloors = 0;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference // Prevents infinite recursion
    private List<Office> offices;

    // Default constructor
    public Building() {
        this.offices = new ArrayList<>();
    }

    // Constructor with fields
    public Building(String name, String address, String location, int numberOfFloors, List<Office> offices) {
        setName(name); // Ensure validation
        setAddress(address); // Ensure validation
        this.location = location;
        setNumberOfFloors(numberOfFloors); // Ensure validation
        setOffices(offices); // Handles null initialization
    }

    // Getters and setters with validation
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
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        if (address == null || address.trim().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be null or empty");
        }
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location; // Optional, no validation needed
    }

    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        if (numberOfFloors < 0) {
            throw new IllegalArgumentException("Number of floors cannot be negative");
        }
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
