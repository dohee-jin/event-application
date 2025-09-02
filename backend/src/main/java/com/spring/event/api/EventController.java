package com.spring.event.api;

import com.spring.event.domain.dto.request.EventCreate;
import com.spring.event.domain.dto.response.EventDetailResponse;
import com.spring.event.domain.dto.response.EventResponse;
import com.spring.event.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@Slf4j
public class EventController {

    private final EventService eventService;

    // 전체 조회 요청
    @GetMapping
    public ResponseEntity<?> getList() {
        List<EventResponse> events = eventService.getEvents();
        return ResponseEntity.ok().body(events);
    }

    // 이벤트 생성 요청
    @PostMapping
    public ResponseEntity<?> create(@RequestBody EventCreate dto) {
        eventService.saveEvent(dto);

        return ResponseEntity.ok().body(Map.of(
                "message", "이벤트가 정상 등록되었습니다."
        ));
    }

    // 단일 조회 요청
    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEvent(@PathVariable Long eventId) {
        if(eventId == null || eventId < 1){
            String errorMessage = "eventId가 유효하지 않습니다.";
            log.warn(errorMessage);
            return ResponseEntity.badRequest().body(Map.of(
                    "message", errorMessage
            ));
        }

        EventDetailResponse detailResponse = eventService.findOne(eventId);
        return ResponseEntity.ok().body(detailResponse);
    }

    // 삭제 요청
    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok().body(Map.of(
                "message", "이벤트가 삭제되었습니다. id - " + eventId
        ));
    }

    // 수정 요청
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody EventCreate dto) {
        eventService.modifyEvent(dto, id);

        return ResponseEntity.ok().body(Map.of(
                "message", "이벤트가 수정되었습니다. id - " + id
        ));
    }
}
