package org.example.iotserver.services;

import org.example.iotserver.repository.BuildingRepository;
import org.springframework.stereotype.Service;
import org.example.iotserver.models.Building;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    // Fetch all buildings
    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    // Create a new building
    public Building createBuilding(Building building) {
        // Save the building and return the saved entity
        return buildingRepository.save(building);
    }

    // Update an existing building
    public Building updateBuilding(Long id, Building updatedBuilding) {
        // Fetch the existing building by ID
        Optional<Building> existingBuildingOpt = buildingRepository.findById(id);
        if (existingBuildingOpt.isPresent()) {
            Building existingBuilding = existingBuildingOpt.get();
            // Update fields of the existing building
            existingBuilding.setName(updatedBuilding.getName());
            existingBuilding.setLocation(updatedBuilding.getLocation());
            existingBuilding.setNumberOfFloors(updatedBuilding.getNumberOfFloors());
            // Save the updated building
            return buildingRepository.save(existingBuilding);
        } else {
            throw new IllegalArgumentException("Building with ID " + id + " not found.");
        }
    }

    // Delete a building by ID
    public void deleteBuilding(Long id) {
        // Check if the building exists
        if (buildingRepository.existsById(id)) {
            // Delete the building
            buildingRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Building with ID " + id + " not found.");
        }
    }
}