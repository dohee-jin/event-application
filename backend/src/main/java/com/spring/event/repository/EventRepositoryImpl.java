package com.spring.event.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.spring.event.domain.entity.Event;
import com.spring.event.domain.entity.EventUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.spring.event.domain.entity.QEvent.event;

@Repository
@Slf4j
@RequiredArgsConstructor
public class EventRepositoryImpl implements EventRepositoryCustom{

    private final JPAQueryFactory factory;

    @Override
    public Slice<Event> findEvents(Pageable pageable, EventUser user) {

        /*
            총 데이터 수 23개, 한 번에 가져올 데이터 5개
            1회차 로딩 - 5개
            2회차 로딩 - 5개
            3회차 로딩 - 5개
            4회차 로딩 - 5개
            5회차 로딩 - 5개

            서버는 클라이언트에게 그만 요청하라는 표시를 전달해야함

            서버가 데이터의 끝을 확인하는 방법
            1. 실제로 가져갈 데이터보다 1개 더 조회해본다.
            1회차 로딩 - 6개 -> 5개 리턴 -> 남은데이터 18개
            2회차 로딩 - 6개 -> 5개 리턴 -> 남은테이터 13개
            3회차 로딩 - 6개 -> 5개 리턴 -> 남은데이터 8개
            4회차 로딩 - 6개 -> 5개 리턴 -> 남은데이터 3개
            5회차 로딩 - 6개 -> 실제로 3개만 보임 -> 6개 이하로 조회, 끝을 판단함
         */

        // 목록 조회
        List<Event> eventList = factory
                .selectFrom(event)
                .where(event.eventUser.eq(user))
                .orderBy(event.createdAt.desc())
                .offset(pageable.getOffset()) // 몇개를 건너뛸지
                .limit(pageable.getPageSize() + 1) // 몇개를 조회할지
                .fetch();

        // 추가 데이터(ex: 6번째 데이터)가 있는지 확인할 변수
        boolean hasNext = false;
        if(eventList.size() > pageable.getPageSize()){
            hasNext = true;

            // 실제로는 5개만 리턴해야 함, 6번째 데이터는 삭제
            eventList.remove(eventList.size() - 1);
        }

        return new SliceImpl<>(eventList, pageable, hasNext);
    }

}
