package org.example.combotooldoihotro;

import org.example.combotooldoihotro.rootServices.StaffService;
import org.example.combotooldoihotro.rootServices.StaffSpaiService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseController {
    @Autowired
    protected StaffService staffService;
    @Autowired
    protected StaffSpaiService staffSpaiService;

}
