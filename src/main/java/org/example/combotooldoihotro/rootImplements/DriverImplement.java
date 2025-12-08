package org.example.combotooldoihotro.rootImplements;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.example.combotooldoihotro.rootServices.DriverService;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
@Service
public class DriverImplement implements DriverService {
    @Override
    public WebDriver getDriver(boolean checkSearchEngine, boolean checkProfile) {
        // checkSearchEngine == true là Chrome
        // checkSearchEngine == false là Firefox
        // checkProfile == true là KHÔNG có profile (chạy sạch)
        // checkProfile == false là CÓ profile (dùng profile đã lưu)

        String profileName = "";
        String userData = "";
        String os = System.getProperty("os.name").toLowerCase();

        // --- 1. Xác định đường dẫn User Data ---
        if (os.contains("win")) {
            userData = System.getProperty("user.home") + (checkSearchEngine == false ?
                    "\\AppData\\Roaming\\Mozilla\\Firefox" : // Đổi đường dẫn Firefox để khớp với cấu trúc Profile
                    "\\AppData\\Local\\Google\\Chrome\\User Data");
        } else if (os.contains("mac")) {
            userData = System.getProperty("user.home") + (checkSearchEngine == false ?
                    "/Library/Application Support/Firefox" :
                    "/Library/Application Support/Google/Chrome");
        } else if (os.contains("nix") || os.contains("nux")) {
            userData = System.getProperty("user.home") + (checkSearchEngine == false ?
                    "/.mozilla/firefox" :
                    "/.config/google-chrome");
        } else {
            System.out.println("Hệ điều hành không xác định!");
        }

        if(checkSearchEngine == false) { // --- FIREFOX ---
            WebDriverManager.firefoxdriver().setup(); // Tự động quản lý Driver
            FirefoxOptions options = new FirefoxOptions();

            if(checkProfile == true) { // KHÔNG có profile (Chạy sạch)
                // Chuyển sang chế độ duyệt web riêng tư
                options.addArguments("-private");
                // Cần đảm bảo các arguments này hợp lệ cho Firefox
                options.addArguments("--no-sandbox");
                options.addArguments("--disable-gpu");
                options.addArguments("--disable-dev-shm-usage");
            } else { // CÓ profile (Dùng profile đã lưu)
                // FIX: Đường dẫn profile phải là thư mục chứa profile, không phải thư mục Profiles gốc
                profileName = findDefaultFirefoxProfileName(userData);
                String profilePath = userData + File.separator + profileName;

                FirefoxProfile profileToUse = new FirefoxProfile(new File(profilePath));
                options.setProfile(profileToUse);

                System.out.println(profileToUse);

                // Đóng Firefox để đảm bảo profile không bị khóa
                try {
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM firefox.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Firefox, tiếp tục chạy...");
                }
            }

            WebDriver driver = new FirefoxDriver(options);
            driver.manage().window().maximize();
            return driver;

        } else { // --- CHROME ---
            WebDriverManager.chromedriver().setup(); // FIX: Tích hợp WebDriverManager cho Chrome
            ChromeOptions options = new ChromeOptions();

            options.addArguments("--no-sandbox");
            options.addArguments("--disable-gpu");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-software-rasterizer");
            options.addArguments("--disable-blink-features=AutomationControlled");

            if(checkProfile == false) { // CÓ profile (Dùng profile đã lưu)
                profileName = readProfileFromFile("./Input/ProfileGG/profile.txt");
                options.addArguments("user-data-dir=" + userData);
                options.addArguments("profile-directory=" + profileName);

                try {
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM chrome.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Chrome, tiếp tục chạy...");
                }
            } else { // KHÔNG có profile (Chạy sạch)
                options.addArguments("--incognito"); // Chế độ ẩn danh

                try {
                    // Tắt chromedriver.exe để đảm bảo phiên làm việc sạch
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM chromedriver.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Chrome Driver, tiếp tục chạy...");
                }
            }
            WebDriver driver = new ChromeDriver(options);
            driver.manage().window().maximize();
            return driver;
        }
    }

    // ------------------------------------------------------------------

    @Override
    public WebDriver getDriverCustom(boolean checkSearchEngine, boolean checkProfile, String profileName, String userData) {

        // checkSearchEngine == true là Chrome
        // checkSearchEngine == false là Firefox
        // checkProfile == true là không có profile (chạy sạch)
        // checkProfile == false là có profile (dùng profile đã lưu)

        if(checkSearchEngine == false) { // --- FIREFOX CUSTOM ---
            // FIX: Thay thế System.setProperty bằng WebDriverManager
            // System.setProperty("webdriver.gecko.driver", "./chrome/geckodriver.exe");
            WebDriverManager.firefoxdriver().setup();

            FirefoxOptions options = new FirefoxOptions();

            if(checkProfile == true) { // KHÔNG có profile (Chạy sạch)
                options.addArguments("-private");
                options.addArguments("--no-sandbox");
                options.addArguments("--disable-gpu");
                options.addArguments("--disable-dev-shm-usage");
            } else { // CÓ profile (Dùng profile đã lưu)
                String profilePath = userData + File.separator + profileName;
                FirefoxProfile profileToUse = new FirefoxProfile(new File(profilePath));
                options.setProfile(profileToUse);

                try {
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM firefox.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Firefox, tiếp tục chạy...");
                }
            }
            WebDriver driver = new FirefoxDriver(options);
            driver.manage().window().maximize();
            return driver;
        } else { // --- CHROME CUSTOM ---
            // FIX: Tích hợp WebDriverManager cho Chrome
            WebDriverManager.chromedriver().setup();

            ChromeOptions options = new ChromeOptions();
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-gpu");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-software-rasterizer");
            options.addArguments("--disable-blink-features=AutomationControlled");

            if(checkProfile == false) { // CÓ profile (Dùng profile đã lưu)
                // Lưu ý: Hàm này nhận profileName và userData làm tham số, không cần đọc file
                options.addArguments("user-data-dir=" + userData);
                options.addArguments("profile-directory=" + profileName);

                try {
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM chrome.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Chrome, tiếp tục chạy...");
                }
            } else { // KHÔNG có profile (Chạy sạch)
                options.addArguments("--incognito");

                try {
                    Process process = Runtime.getRuntime().exec("taskkill /F /IM chromedriver.exe");
                    process.waitFor();
                } catch (Exception e) {
                    System.out.println("⚠ Không thể đóng Chrome Driver, tiếp tục chạy...");
                }
            }
            WebDriver driver = new ChromeDriver(options);
            driver.manage().window().maximize();
            return driver;
        }
    }

    public static String findDefaultFirefoxProfileName(String profilesRootPath) {
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
    public static String readProfileFromFile(String filePath) {
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath));
            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty()) {
                    return line; // Trả về dòng đầu tiên không rỗng
                }
            }
        } catch (Exception e) {
            System.out.println("❌ Không thể đọc file profile.txt: " + e.getMessage());
        }
        return null; // Nếu không có dòng nào hợp lệ
    }

}
