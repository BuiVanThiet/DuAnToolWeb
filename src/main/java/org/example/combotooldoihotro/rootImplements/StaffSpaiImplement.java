package org.example.combotooldoihotro.rootImplements;

import org.example.combotooldoihotro.repositores.StaffSpaiRepository;
import org.example.combotooldoihotro.rootServices.StaffSpaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffSpaiImplement implements StaffSpaiService {
    @Autowired
    StaffSpaiRepository staffSpaiRepository;
}
