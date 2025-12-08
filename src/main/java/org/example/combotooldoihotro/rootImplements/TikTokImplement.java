package org.example.combotooldoihotro.rootImplements;

import org.example.combotooldoihotro.BaseAll;
import org.example.combotooldoihotro.rootEntites.TikTokEntity;
import org.example.combotooldoihotro.rootServices.TikTokService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TikTokImplement extends BaseAll implements TikTokService {

    public boolean getCheckSecurity(WebDriver driver) {
        String checkSecurity = getNameProduct(driver,"captcha_verify_bar--title");
        if (checkSecurity == null) {
            return true;
        }
        if (checkSecurity.trim().contains("Verify to continue:")) {
            boolean shouldContinue = showProblemDialog();
            if (!shouldContinue) {
                System.out.println("Người dùng chọn hủy. Kết thúc.");
                return false;
            }
            driver.navigate().refresh();
        }
        return true;
    }

    @Override
    public String getCheckSoldShop(WebDriver driver, String linkRoot, String baseFolder, int index, String limit) throws IOException, InterruptedException {
        if (driver.getTitle().equals("Security Check")) {
            boolean shouldContinue = showProblemDialog();
            if (!shouldContinue) {
                System.out.println("Người dùng chọn hủy. Kết thúc.");
                return "False";
            }
            driver.navigate().refresh();
        }

        if (getCheckSecurity(driver) == false) {
            return "False";
        }

        while (true) {
            boolean checkViewMore = getClickAction(driver,"div.w-full div.flex.justify-center.mt-16 button.px-24.py-13.w-fit.min-w-128.rounded-md.Headline-Semibold");
            if(checkViewMore == false) {
                System.out.println("Khong co nut checkViewMore!");
                break;
            }
            Document doc2 = Jsoup.parse(driver.getPageSource());
            Elements productDivs = doc2.select("div.w-full div.grid-cols-2.gap-16 div.flex-grow-0.h-auto div.w-full.cursor-pointer");
            if (productDivs.size() >= Integer.parseInt(limit)) {
                break;
            }
        }

        Document doc2 = Jsoup.parse(driver.getPageSource());
        Elements productDivs = doc2.select("div.w-full div.grid-cols-2.gap-16 div.flex-grow-0.h-auto div.w-full.cursor-pointer");
        List<TikTokEntity> listLinkDone = new ArrayList<>();

        for (Element div : productDivs) {
            TikTokEntity tikTokEntity = new TikTokEntity();
            // 1. Lấy link từ <a>
            String link = "";
            Element aTag = div.selectFirst("a");
            if (aTag != null) {
                link = aTag.attr("href");
            }

            // 2. Lấy quantity từ span, nếu không có => 0
            String quantity = "0";
            Element qtySpan = div.selectFirst("span.P3-Regular.text-ellipsis");
            if (qtySpan != null) {
                String text = qtySpan.text();
                quantity = text;
            } else {
                // Không có span => quantity = 0 (mặc định)
                quantity = "0";
            }
            if (limit != "") {
                if (listLinkDone.size() == Integer.parseInt(limit)) {
                    break;
                }
            }
            tikTokEntity.setUrl(link);
            tikTokEntity.setSold((quantity));
            listLinkDone.add(tikTokEntity);
        }
        List<List<String>> data = new ArrayList<>();
        String timestamp = new SimpleDateFormat("HH:mm:ss-dd/MM/yyyy").format(new Date());
        for (TikTokEntity tikTokEntity: listLinkDone) {
            System.out.println("-------------");
            System.out.println("link: "+tikTokEntity.getUrl());
            System.out.println("sold: "+tikTokEntity.getSold());
            System.out.println("-------------");
            data.add(List.of(linkRoot, tikTokEntity.getUrl(),tikTokEntity.getSold(),timestamp));
        }
        List<String> columnNames = List.of("Link shop", "Link san pham", "Sold", "Ngày sử dụng");
        String filePathExcel = baseFolder+"/ketQuaCheckSold.xlsx";
        writeExcelFile(data, filePathExcel, columnNames); // Ghi kết quả B2
        return null;
    }
}
