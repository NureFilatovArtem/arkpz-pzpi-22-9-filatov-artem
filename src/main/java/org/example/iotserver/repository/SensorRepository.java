package org.example.iotserver.repository;

import org.example.iotserver.models.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}