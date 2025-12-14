package org.example.combotooldoihotro.restController;

import org.example.combotooldoihotro.mainSwing.CheckSoldShop.MainCheckSold;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
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

        if (brow.equals("fireFox")) {
            checkBrow = false;
        } else {
            checkBrow = true;
        }

        if (profile.equals("proFile")) {
            checkProfile = false;
        } else {
            checkProfile = true;
        }

        String userData = getUserData(checkBrow);
        String firefoxProfileName = findDefaultFirefoxProfileName(userData);




        System.out.println("brow: "+brow);
        System.out.println("checkBrow: "+checkBrow);

        System.out.println("profile: "+profile);
        System.out.println("checkProfile: "+checkProfile);
        System.out.println("userData: "+userData);
        System.out.println("firefoxProfileName: "+firefoxProfileName);

        mainCheckSold.mainStart(checkBrow,checkProfile,userData,firefoxProfileName);

        return ResponseEntity.ok("");
    }

    public String getUserData(Boolean checkSearchEngine) {
        String os = System.getProperty("os.name").toLowerCase();
        String userDataPath = "";
        if (os.contains("win")) {
            // Windows
            userDataPath = System.getProperty("user.home") + (checkSearchEngine == false ? "\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles" : "\\AppData\\Local\\Google\\Chrome\\User Data");
            System.out.println("Đường dẫn userdata Firefox trên Windows: " + userDataPath);
        }
        else {
            System.out.println("Hệ điều hành không xác định!");
        }
        return userDataPath;
    }

    public String findDefaultFirefoxProfileName(String profilesRootPath) {
        File profilesDir = new File(profilesRootPath);
        if (!profilesDir.exists() || !profilesDir.isDirectory()) {
            System.out.println("Thư mục Profiles Firefox không tồn tại: " + profilesRootPath);
            return null;
        }

        File[] profileDirs = profilesDir.listFiles(File::isDirectory);
        if (profileDirs == null || profileDirs.length == 0) {
            System.out.println("Không tìm thấy thư mục profile nào trong: " + profilesRootPath);
            return null;
        }

        for (File profileDir : profileDirs) {
            String name = profileDir.getName();
            // Kiểm tra tên phải kết thúc chính xác bằng ".default-release"
            if (name.endsWith(".default-release")) {
                System.out.println("Tìm thấy profile chính xác: " + name);
                return name;
            }
        }

        System.out.println("Không tìm thấy profile kết thúc bằng '.default-release', sử dụng profile đầu tiên: " + profileDirs[0].getName());
        return profileDirs[0].getName();
    }

}
