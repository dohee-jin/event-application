package com.spring.event.domain.entity;

import com.spring.event.domain.dto.request.EventCreate;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@ToString(exclude = {"eventUser"})
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "tbl_event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ev_id")
    private Long id;

    @Column(name = "ev_title", nullable = false, length = 50)
    private String title; // 이벤트 제목

    @Column(name = "ev_desc")
    private String description; // 이벤트 설명

    @Column(name = "ev_image_path")
    private String image; // 이벤트 메인 이미지 경로

    @Column(name = "ev_start_date")
    private LocalDate date; // 이벤트 행사 시작 날짜

    @CreationTimestamp
    private LocalDateTime createdAt; // 이벤트 등록 날짜

    // 회원과의 연관관계를 설정 - 단방향 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="ev_name")
    @Setter
    private EventUser eventUser;

    public void changeEvent(EventCreate dto) {
        this.title = dto.title();
        this.description = dto.desc();
        this.date = dto.beginDate();
        this.image = dto.imageUrl();
    }
}

