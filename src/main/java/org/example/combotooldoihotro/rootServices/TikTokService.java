package org.example.combotooldoihotro.rootServices;

import org.openqa.selenium.WebDriver;

import java.io.IOException;

public interface TikTokService {
    String getCheckSoldShop(WebDriver driver, String linkRoot, String baseFolder, int index,String limit) throws IOException,InterruptedException;
}
