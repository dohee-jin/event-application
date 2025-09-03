package com.spring.event.service;

import com.spring.event.domain.entity.EmailVerification;
import com.spring.event.domain.entity.EventUser;
import com.spring.event.repository.EmailVerificationRepository;
import com.spring.event.repository.EventUserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EventUserService {

    private final EventUserRepository eventUserRepository;
    private final EmailVerificationRepository emailVerificationRepository;

    // 이메일 발송을 위한 의존객체
    private final JavaMailSender mailSender;

    // 메일 발송인의 정보
    @Value("${spring.mail.username}")
    private String mailHost;


    // 이메일 충복확인 처리
    @Transactional(readOnly = true)
    public boolean checkEmailDuplicate(String email) {
        // 중복확인
        boolean flag = eventUserRepository.existsByEmail(email);
        log.info("Checking email {} is duplicate: {}", email, flag);

        // 사용가능한 이메일인 경우 인증메일 발송
        if(!flag) processSignUp(email);

        return flag;
    }

    // 인증 코드를 발송할 때 사용할 임시 회원가입 로직
    // 인증 코드를 데이터베이스에 저장하려면 회원정보가 필요
    private void processSignUp(String email) {

        // 1. 임시회원가입
        EventUser tempUser = EventUser.builder()
                .email(email)
                .build();

        EventUser savedUser = eventUserRepository.save(tempUser);

        // 2. 인증 메일 발송
        String code = sendVerificationEmail(email);

        // 3. 인증 코드와 만료시간을 db에 저장
        EmailVerification verification = EmailVerification.builder()
                .verificationCode(code)
                .expiryDate(LocalDateTime.now().plusMinutes(5)) // 만료시간 5분 설정
                .eventUser(savedUser) // FK 설정
                .build();

        emailVerificationRepository.save(verification);

    }

    // 이메일 인증코드 발송 로직
    private String sendVerificationEmail(String email) {

        // 인증코드 생성
        String code = generateCode();

        // 메일 전송 로직
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper messageHelper
                    = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            // 누구에게 이메일을 보낼지
            messageHelper.setTo(email);

            // 누가 보내는 건지
            messageHelper.setFrom(mailHost);

            // 이메일 제목 설정
            messageHelper.setSubject("[인증메일] 중앙정보스터디 가입 인증 메일입니다.");
            // 이메일 내용 설정
            messageHelper.setText(
                    "인증 코드: <b style=\"font-weight: 700; letter-spacing: 5px; font-size: 30px;\">" + code + "</b>"
                    , true
            );

            // 메일 보내기
            mailSender.send(mimeMessage);

            log.info("{} 님에게 이메일이 발송되었습니다.", email);
            return code;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("메일 발송에 실패했습니다.");
        }

    }

    // 1000 ~ 9999 랜덤 숫자를 생성
    private String generateCode() {
        return String.valueOf((int) (Math.random() * 9000) + 1000);
    }
}
