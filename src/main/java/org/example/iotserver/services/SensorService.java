package org.example.iotserver.services;

import org.example.iotserver.models.Sensor;
import org.example.iotserver.repository.SensorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorService {
    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public Sensor createSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public Sensor updateSensor(Long id, Sensor updatedSensor) {
        Optional<Sensor> existingSensorOpt = sensorRepository.findById(id);
        if (existingSensorOpt.isPresent()) {
            Sensor existingSensor = existingSensorOpt.get();
            existingSensor.setType(updatedSensor.getType());
            existingSensor.setLocation(updatedSensor.getLocation());
            existingSensor.setOffice(updatedSensor.getOffice());
            return sensorRepository.save(existingSensor);
        } else {
            throw new IllegalArgumentException("Sensor with ID " + id + " not found.");
        }
    }

    public void deleteSensor(Long id) {
        if (sensorRepository.existsById(id)) {
            sensorRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Sensor with ID " + id + " not found.");
        }
    }
}
