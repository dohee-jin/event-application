package com.spring.event.domain.dto.request;

import lombok.Builder;

@Builder
public record SignUpRequest(
        String email,
        String password
) {
}
