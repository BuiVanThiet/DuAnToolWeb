package org.example.combotooldoihotro.rootEntites.base;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@ToString
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createDate;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updateDate;
    @Column(name = "status")
    private Integer status;
    @PrePersist
    public void setDate(){
        this.createDate = new Date();
        this.updateDate = new Date();

    }
    @PreUpdate
    public void setDoiDate(){
        this.updateDate = new Date();
    }
}
