package org.example.combotooldoihotro.repositores;

import org.example.combotooldoihotro.rootEntites.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Integer> {
}
