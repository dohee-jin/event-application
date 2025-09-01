package com.spring.event.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Cors: 전역 크로스 오리진 설정 - 허용할 클라이언트를 지정
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private String[] permitUrls = {
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/api/**") // 클라이언트의 어떤 요청을 허용할지
                .allowedOrigins(permitUrls)
                .allowedHeaders("*") // 어떤 헤더를 허용할지
                .allowedMethods("*") // 어떤 요청방식을 허용할지
                .allowCredentials(true); // 보안쿠키를 허용할지
    }
}
