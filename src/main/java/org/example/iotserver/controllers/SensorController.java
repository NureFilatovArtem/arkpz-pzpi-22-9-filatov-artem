package org.example.iotserver.controllers;

import org.springframework.web.bind.annotation.*;
import org.example.iotserver.models.Sensor;
import org.example.iotserver.services.SensorService;

import java.util.List;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {
    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    // GET: Fetch all sensors
    @GetMapping
    public List<Sensor> getAllSensors() {
        return sensorService.getAllSensors();
    }

    // POST: Create a new sensor
    @PostMapping
    public Sensor createSensor(@RequestBody Sensor sensor) {
        return sensorService.createSensor(sensor);
    }

    // PUT: Update an existing sensor
    @PutMapping("/{id}")
    public Sensor updateSensor(@PathVariable Long id, @RequestBody Sensor updatedSensor) {
        return sensorService.updateSensor(id, updatedSensor);
    }

    // DELETE: Delete a sensor by ID
    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
    }
}