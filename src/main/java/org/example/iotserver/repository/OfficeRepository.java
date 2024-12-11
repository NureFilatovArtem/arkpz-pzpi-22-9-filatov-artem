package org.example.iotserver.repository;

import org.example.iotserver.models.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {
}