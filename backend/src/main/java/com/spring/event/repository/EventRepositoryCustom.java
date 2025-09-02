package com.spring.event.repository;

import com.spring.event.domain.entity.Event;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface EventRepositoryCustom {

    // 이벤트 목록조회 페이징처리 (무한 스크롤 전용)
    Slice<Event> findEvents(Pageable pageable);
}
