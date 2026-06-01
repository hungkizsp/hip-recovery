package com.healthcare.hiprecovery;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;

@Component
public class ImageCopier implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        String sourceDir = "D:/zalo/docx_extracted/word/media/";
        String targetDir = "D:/zalo/hip-recovery/src/main/resources/static/images/";

        Files.createDirectories(Paths.get(targetDir));

        Map<String, String> imageMapping = Map.ofEntries(
                Map.entry("image1.jpeg", "hero-banner.jpeg"),
                Map.entry("image2.jpeg", "hip-replacement-1.jpeg"),
                Map.entry("image3.png", "exercise-muscle.jpg"),
                Map.entry("image4.jpeg", "safe-bed-transfer.jpeg"),
                Map.entry("image5.png", "exercise-walker.png"),
                Map.entry("image6.jpeg", "safe-chair-sitting.jpeg"),
                Map.entry("image7.png", "safe-toilet.png"),
                Map.entry("image8.jpeg", "safe-car.jpeg"),
                Map.entry("image9.jpeg", "stairs-training.jpeg"),
                Map.entry("Hít Thở Sâu & Ho Hiệu Quả", "exercise-breathing.jpg"),
                Map.entry("Bơm Cổ Chân", "exercise-ankle-pump.jpg"),
                Map.entry("Gồng Cơ Đùi & Cơ Mông.jpg", "exercise-muscle.jpg"),
                Map.entry("Gồng Cơ Đùi & Cơ Mông", "exercise-muscle.jpg"),
                Map.entry("tập đứng.jpg", "exercise-standing.jpg"),
                Map.entry("Tập Di Chuyển (Transfer).jpg", "exercise-transfer.jpg"),
                Map.entry("Bắt Chéo Chân.jpg", "prevent-crossing.jpg"),
                Map.entry("Không Xoá Trong Chân Mổ.jpg", "prevent-rotation.jpg"),
                Map.entry("Gập Hông Quá 90 Độ.webp", "prevent-hip-flexion.webp"));

        for (Map.Entry<String, String> entry : imageMapping.entrySet()) {
            Path source = Paths.get(sourceDir + entry.getKey());
            Path target = Paths.get(targetDir + entry.getValue());
            if (Files.exists(source)) {
                try {
                    Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
                    System.out.println("Copied " + entry.getKey() + " to " + entry.getValue());
                } catch (IOException e) {
                    System.err.println("Failed to copy " + entry.getKey());
                }
            }
        }
    }
}
