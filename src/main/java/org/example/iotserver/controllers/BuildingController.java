package org.example.iotserver.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.example.iotserver.services.BuildingService; // Import the repository
import org.example.iotserver.models.Building; // Import the repository


@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }
}

