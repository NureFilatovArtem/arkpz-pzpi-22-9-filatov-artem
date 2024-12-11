package org.example.iotserver.services;

import org.example.iotserver.models.Measurement;
import org.example.iotserver.repository.MeasurementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeasurementService {
    private final MeasurementRepository measurementRepository;

    public MeasurementService(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    public List<Measurement> getAllMeasurements() {
        return measurementRepository.findAll();
    }

    public Measurement createMeasurement(Measurement measurement) {
        return measurementRepository.save(measurement);
    }

    public Measurement updateMeasurement(Long id, Measurement updatedMeasurement) {
        Optional<Measurement> existingMeasurementOpt = measurementRepository.findById(id);
        if (existingMeasurementOpt.isPresent()) {
            Measurement existingMeasurement = existingMeasurementOpt.get();
            existingMeasurement.setMeasurementDate(updatedMeasurement.getMeasurementDate());
            existingMeasurement.setMeasurementTime(updatedMeasurement.getMeasurementTime());
            existingMeasurement.setLightLevel(updatedMeasurement.getLightLevel());
            existingMeasurement.setNoiseLevel(updatedMeasurement.getNoiseLevel());
            existingMeasurement.setOxygenLevel(updatedMeasurement.getOxygenLevel());
            existingMeasurement.setSensor(updatedMeasurement.getSensor());
            return measurementRepository.save(existingMeasurement);
        } else {
            throw new IllegalArgumentException("Measurement with ID " + id + " not found.");
        }
    }

    public void deleteMeasurement(Long id) {
        if (measurementRepository.existsById(id)) {
            measurementRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Measurement with ID " + id + " not found.");
        }
    }
}