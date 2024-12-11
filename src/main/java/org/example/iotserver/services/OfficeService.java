package org.example.iotserver.services;

import org.example.iotserver.models.Office;
import org.example.iotserver.repository.OfficeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfficeService {
    private final OfficeRepository officeRepository;

    public OfficeService(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }

    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }

    public Office createOffice(Office office) {
        return officeRepository.save(office);
    }

    public Office updateOffice(Long id, Office updatedOffice) {
        Optional<Office> existingOfficeOpt = officeRepository.findById(id);
        if (existingOfficeOpt.isPresent()) {
            Office existingOffice = existingOfficeOpt.get();
            existingOffice.setName(updatedOffice.getName());
            existingOffice.setFloor(updatedOffice.getFloor());
            existingOffice.setBuilding(updatedOffice.getBuilding());
            return officeRepository.save(existingOffice);
        } else {
            throw new IllegalArgumentException("Office with ID " + id + " not found.");
        }
    }

    public void deleteOffice(Long id) {
        if (officeRepository.existsById(id)) {
            officeRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Office with ID " + id + " not found.");
        }
    }
}