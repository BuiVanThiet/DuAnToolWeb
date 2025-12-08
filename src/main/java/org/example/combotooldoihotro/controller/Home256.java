package org.example.combotooldoihotro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Home256 {
    @GetMapping("/home-tool")
    public String getHomeTool() {
        return "homeTool";
    }
    @GetMapping("/dowload-image")
    public String getHomeDowloadImage() {
        return "HomeDowloadImage";
    }
}
