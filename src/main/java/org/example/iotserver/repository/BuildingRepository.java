package org.example.iotserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.iotserver.models.Building; // Import the repository

public interface BuildingRepository extends JpaRepository<Building, Long> {
}

