package org.example.combotooldoihotro.restController;

import org.example.combotooldoihotro.mainSwing.CheckSoldShop.MainCheckSold;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dowload-image-res")
public class TaiAnhRestController {
    protected MainCheckSold mainCheckSold = new MainCheckSold();
    @PostMapping("/get-dowload-image-main")
    public ResponseEntity<?> getDowloadImageMain(@RequestBody Map<String, String> data) {
        String brow = data.get("brow");
        String profile = data.get("profile");
        Boolean checkBrow = null;
        Boolean checkProfile = null;

        if (brow == "fireFox") {
            checkBrow = false;
        } else {
            checkBrow = true;
        }

        if (profile == "proFile") {
            checkProfile = false;
        } else {
            checkProfile = true;
        }




        System.out.println("brow: "+brow);
        System.out.println("profile: "+profile);
        return ResponseEntity.ok("");
    }
}
