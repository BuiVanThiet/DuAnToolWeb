package org.example.combotooldoihotro.rootEntites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.example.combotooldoihotro.rootEntites.base.BaseEntity;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "staff")
public class Staff extends BaseEntity {
    @Column(name = "code_staff")
    private String codeStaff;
    @Column(name = "name_staff")
    private String nameStaff;
    @Column(name = "email")
    private String email;
    @Column(name = "password_user")
    private String password;
    @Column(name = "input_local")
    private String inputLocal;
    @Column(name = "output_local")
    private String outputLocal;
}
