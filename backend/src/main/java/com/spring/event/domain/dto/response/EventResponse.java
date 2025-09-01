package com.spring.event.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.event.domain.entity.Event;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record EventResponse(
        String eventId,
        String title,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate startDate,
        String imgUrl
) {

    // 엔터티를 Dto로 바꿔주는 편의 메소드
    public static EventResponse from(Event event) {
        return EventResponse.builder()
                .eventId(event.getId().toString())
                .imgUrl(event.getImage())
                .title(event.getTitle())
                .startDate(event.getDate())
                .build();
    }
}
