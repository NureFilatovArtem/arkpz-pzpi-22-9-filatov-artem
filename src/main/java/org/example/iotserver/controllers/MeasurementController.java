package org.example.iotserver.controllers;

import org.springframework.web.bind.annotation.*;
import org.example.iotserver.models.Measurement;
import org.example.iotserver.services.MeasurementService;

import java.util.List;

@RestController
@RequestMapping("/api/measurements")
public class MeasurementController {
    private final MeasurementService measurementService;

    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    // GET: Fetch all measurements
    @GetMapping
    public List<Measurement> getAllMeasurements() {
        return measurementService.getAllMeasurements();
    }

    // POST: Create a new measurement
    @PostMapping
    public Measurement createMeasurement(@RequestBody Measurement measurement) {
        return measurementService.createMeasurement(measurement);
    }

    // PUT: Update an existing measurement
    @PutMapping("/{id}")
    public Measurement updateMeasurement(@PathVariable Long id, @RequestBody Measurement updatedMeasurement) {
        return measurementService.updateMeasurement(id, updatedMeasurement);
    }

    // DELETE: Delete a measurement by ID
    @DeleteMapping("/{id}")
    public void deleteMeasurement(@PathVariable Long id) {
        measurementService.deleteMeasurement(id);
    }
}
