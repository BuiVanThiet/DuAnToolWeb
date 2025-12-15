package org.example.combotooldoihotro.rootImplements;

import org.example.combotooldoihotro.repositores.StaffRepository;
import org.example.combotooldoihotro.rootEntites.Staff;
import org.example.combotooldoihotro.rootServices.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffImplement implements StaffService {
    @Autowired
    StaffRepository staffRepository;

    @Override
    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

    @Override
    public Optional<Staff> findById(Integer integer) {
        return staffRepository.findById(integer);
    }

    @Override
    public Optional<Staff> getStaffByEmail(String email) {
        return staffRepository.getStaffByEmail(email);
    }


}
