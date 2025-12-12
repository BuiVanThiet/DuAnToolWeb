package org.example.combotooldoihotro.controller;

import org.example.combotooldoihotro.BaseController;
import org.example.combotooldoihotro.rootEntites.Staff;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Home256 extends BaseController {
    @GetMapping("/home-tool")
    public String getHomeTool() {
        for (Staff staff: staffService.findAll()) {
            System.out.println(staff.toString());
        }
        return "homeTool";
    }
    @GetMapping("/dowload-image")
    public String getHomeDowloadImage() {
        return "HomeDowloadImage";
    }
}
