package com.healthcare.hiprecovery.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/tong-quan")
    public String overview() {
        return "overview";
    }

    @GetMapping("/bai-tap")
    public String exercise() {
        return "exercise";
    }

    @GetMapping("/phong-ngua-trat-khop")
    public String prevention() {
        return "prevention";
    }

    @GetMapping("/sinh-hoat-an-toan")
    public String activities() {
        return "activities";
    }

    @GetMapping("/giao-duc-suc-khoe")
    public String education() {
        return "education";
    }

    @GetMapping("/dau-hieu-canh-bao")
    public String warnings() {
        return "warnings";
    }

    @GetMapping("/video-huong-dan")
    public String videos() {
        return "videos";
    }
}
