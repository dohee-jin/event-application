package com.spring.event.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.event.domain.entity.Event;

import java.time.LocalDate;

public record EventCreate(
        String title,
        String desc,
        String imageUrl,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate beginDate
) {

    public Event toEntity() {
        return Event.builder()
                .title(this.title)
                .description(this.desc)
                .image(this.imageUrl)
                .date(this.beginDate)
                .build();
    }
}

