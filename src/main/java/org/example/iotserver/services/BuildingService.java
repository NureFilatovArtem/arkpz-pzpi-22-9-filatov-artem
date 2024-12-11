package org.example.iotserver.services;
import org.example.iotserver.repository.BuildingRepository; // Import the repository
import org.springframework.stereotype.Service;
import org.example.iotserver.models.Building;

import java.util.List;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }
}

