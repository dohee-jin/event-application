package com.spring.event.healthcheck;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

// API가 살아있는지 확인하는 경로
@RestController
@Slf4j
public class HealthCheckController {

    @GetMapping("/status")
    public ResponseEntity<?> healthCheck() {

        return ResponseEntity.ok(
                Map.of(
                        "healthy", true,
                        "timestamp", LocalDateTime.now()
                )
        );
    }
}
