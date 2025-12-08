package org.example.combotooldoihotro.mainSwing.CheckSoldShop;

import org.example.combotooldoihotro.BaseAll;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MainCheckSold extends BaseAll {
    public void mainStart(boolean checkSearchEngine, boolean checkProfile, String profile, String userData) {
        WebDriver driver = driverService2.getDriverCustom(checkSearchEngine,checkProfile,profile,userData);
        ((JavascriptExecutor) driver).executeScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})");

        String filePath = "./Input/linkShop/InputLinkShop.xlsx";
        List<Map<String, String>> excelData = readExcel(filePath);
        List<List<String>> data = new ArrayList<>();
        try {
            for (Map<String, String> row : excelData) {
                String link = row.get("Column 1").trim();
                if (link == null) {
                    return;
                }

                String maxLimit;
                if (row.get("Column 2") == null) {
                    maxLimit = "";
                }else {
                    maxLimit = row.get("Column 2").trim();
                }


                System.out.println("🔹 Đang xử lý: " + link);
                String outputFolder = new File("./Output/ToolCheckSoldShop/").getAbsolutePath();

                driver.navigate().to(link);

                WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // Đợi tối đa 10 giây
                wait.until((WebDriver d) -> ((JavascriptExecutor) d)
                        .executeScript("return document.readyState").equals("complete"));
                int index = getNextIndex(outputFolder);
                data.addAll(getWebTool(link,"checkSoldShop",driver,outputFolder,index,null,"",maxLimit));
            }
        } catch (Exception e) {
            System.out.println("Loi roi: " + e.getMessage());
        }
        driver.quit();
    }
}
