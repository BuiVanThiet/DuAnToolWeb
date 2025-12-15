package org.example.combotooldoihotro.controller;

import org.example.combotooldoihotro.BaseController;
import org.example.combotooldoihotro.rootEntites.Staff;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController extends BaseController {

    @GetMapping("/login")
    public String getFormLogin() {
        return "Login";
    }
    @PostMapping("/login-check")
    public String getCheckLogin(ModelMap modelMap,
                                @RequestParam("email") String emailCheck,
                                @RequestParam("password") String password) {
        for (Staff staff: staffService.findAll()) {

        }
        return "Login";
    }
}
