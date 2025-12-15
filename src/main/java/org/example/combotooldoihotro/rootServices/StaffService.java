package org.example.combotooldoihotro.rootServices;

import org.example.combotooldoihotro.rootEntites.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffService {
    List<Staff> findAll();

    Optional<Staff> findById(Integer integer);

    Optional<Staff> getStaffByEmail(String email);
}
