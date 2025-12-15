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
    @GetMapping("/list-product-company")
    public String getHomeDanhSachSanPham() {
        return "HomeDanhSachSanPham";
    }
    @GetMapping("/dowload-image")
    public String getHomeDowloadImage() {
        return "HomeDowloadImage";
    }
    @GetMapping("/team-support-tool")
    public String getHomeTeamSupport() {
        return "HomeTeamHoTro";
    }
    @GetMapping("/report-and-update")
    public String getHomeBaoCaoVaUpdate() {
        return "HomeBaoCaoVaUpdate";
    }
    @GetMapping("/setting")
    public String getHomeSetting() {
        return "HomeCaiDat";
    }
    @GetMapping("/chis")
    public String getHomeChis() {
        return "chis/index1";
    }
}
