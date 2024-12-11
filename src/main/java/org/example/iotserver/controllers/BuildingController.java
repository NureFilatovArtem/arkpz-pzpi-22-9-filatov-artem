package org.example.iotserver.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.example.iotserver.services.BuildingService;
import org.example.iotserver.models.Building;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    // GET: Fetch all buildings
    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    // POST: Create a new building
    @PostMapping
    public Building createBuilding(@RequestBody Building building) {
        return buildingService.createBuilding(building);
    }

    // PUT: Update an existing building
    @PutMapping("/{id}")
    public Building updateBuilding(@PathVariable Long id, @RequestBody Building updatedBuilding) {
        return buildingService.updateBuilding(id, updatedBuilding);
    }

    // DELETE: Delete a building by ID
    @DeleteMapping("/{id}")
    public void deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
    }
}