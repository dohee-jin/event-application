package com.spring.event.service;

import com.spring.event.domain.dto.request.EventCreate;
import com.spring.event.domain.dto.response.EventDetailResponse;
import com.spring.event.domain.dto.response.EventResponse;
import com.spring.event.domain.entity.Event;
import com.spring.event.domain.entity.EventUser;
import com.spring.event.repository.EventRepository;
import com.spring.event.repository.EventUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final EventUserRepository eventUserRepository;

    // 전체 조회
    @Transactional(readOnly = true)
    public Map<String, Object> getEvents(int pageNo) {

        Slice<Event> eventSlice = eventRepository.findEvents(PageRequest.of(pageNo-1, 4));

        List<EventResponse> events = eventSlice.getContent()
                .stream()
                .map(EventResponse::from)
                .collect(Collectors.toList());

        return Map.of(
                "hasNext", eventSlice.hasNext(),
                "eventList", events
        );
    }

    // 이벤트 생성
    public void saveEvent(EventCreate dto, String email) {
        Event event = dto.toEntity();
        EventUser foundUser = getCurrentLoggedInUser(email);
        event.setEventUser(foundUser);

        eventRepository.save(event);
    }

    // 단일 조회
    @Transactional(readOnly = true)
    public EventDetailResponse findOne(Long id) {
        Event event = eventRepository.findById(id).orElseThrow();
        return EventDetailResponse.from(event);
    }

    // 이벤트 삭제
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // 이벤트 수정
    public void modifyEvent(EventCreate dto, Long id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.changeEvent(dto);
    }

    // 로그인한 사용자의 엔터티정보를 불러오는 메서드
    private EventUser getCurrentLoggedInUser(String email) {
        return eventUserRepository.findByEmail(email).orElseThrow();
    }
}
