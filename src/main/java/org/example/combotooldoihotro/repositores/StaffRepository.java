package org.example.combotooldoihotro.repositores;

import org.example.combotooldoihotro.rootEntites.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Integer> {
    @Query("select s from Staff s where s.email = :emailCheck and s.status = 1")
    Optional<Staff> getStaffByEmail(@Param("emailCheck") String emailCheck);
}
