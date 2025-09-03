package com.spring.event.service;

import com.spring.event.domain.entity.EventUser;
import com.spring.event.repository.EventUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventUserService {

    private final EventUserRepository eventUserRepository;


    // 이메일 충복확인 처리
    public boolean checkEmailDuplicate(String email) {
       // 임시로 회원가입 진행
        EventUser eventUser = EventUser.builder()
                .email("abc@def" + (int) (Math.random() * 99999))
                .build() ;
        eventUserRepository.save(eventUser);

        // 중복확인
        boolean flag = eventUserRepository.existsByEmail(email);
        log.info("Checking email {} is duplicate: {}", email, flag);
        return flag;
    }
}
