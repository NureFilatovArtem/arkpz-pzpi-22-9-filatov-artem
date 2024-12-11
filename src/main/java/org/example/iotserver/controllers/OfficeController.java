package org.example.iotserver.controllers;

import org.springframework.web.bind.annotation.*;
import org.example.iotserver.models.Office;
import org.example.iotserver.services.OfficeService;

import java.util.List;

@RestController
@RequestMapping("/api/offices")
public class OfficeController {
    private final OfficeService officeService;

    public OfficeController(OfficeService officeService) {
        this.officeService = officeService;
    }

    // GET: Fetch all offices
    @GetMapping
    public List<Office> getAllOffices() {
        return officeService.getAllOffices();
    }

    // POST: Create a new office
    @PostMapping
    public Office createOffice(@RequestBody Office office) {
        return officeService.createOffice(office);
    }

    // PUT: Update an existing office
    @PutMapping("/{id}")
    public Office updateOffice(@PathVariable Long id, @RequestBody Office updatedOffice) {
        return officeService.updateOffice(id, updatedOffice);
    }

    // DELETE: Delete an office by ID
    @DeleteMapping("/{id}")
    public void deleteOffice(@PathVariable Long id) {
        officeService.deleteOffice(id);
    }
}