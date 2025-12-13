package org.example.combotooldoihotro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Home256 {
    @GetMapping("/home-tool")
    public String getHomeTool() {
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
}
