package org.example.iotserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.iotserver.models.Office; // Import the repository


public interface OfficeRepository extends JpaRepository<Office, Long> {
}

