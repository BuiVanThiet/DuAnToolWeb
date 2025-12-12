package org.example.combotooldoihotro.rootEntites;

import jakarta.persistence.*;
import lombok.*;
import org.example.combotooldoihotro.rootEntites.base.BaseEntity;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "staff_spai")
public class StaffSpai extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_staff")
    private Staff staff;
    @Column(name = "link")
    private String link;
    @Column(name = "idProduct")
    private String idProduct;
}
