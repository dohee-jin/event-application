package com.spring.event.repository;

import com.spring.event.domain.entity.EmailVerification;
import com.spring.event.domain.entity.EventUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {

    // 사용자의 id를 통해 인증코드정보 조회
    Optional<EmailVerification> findByEventUser(EventUser eventUser);
}
