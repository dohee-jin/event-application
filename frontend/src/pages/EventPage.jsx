import React, {useEffect, useRef, useState} from 'react';
import {Link, useLoaderData} from "react-router-dom";
import EventList from "../components/EventList.jsx";

const EventPage = () => {
    /*
    const [eventList, setEventList] = useState([]);

    const fetchEvent = async () => {
        const response =  await fetch(`${DEFAULT_URL}`);
        const data = await response.json();

        console.log(data);

        setEventList(data);
    }

    useEffect(() => {
        fetchEvent();
    }, []);
    */

    // 로더가 리턴한 데이터 가져오기
    // const {hasNext, eventList} = useLoaderData();

    const observerRef = useRef();

    const[eventList, setEventList] = useState([]);

    // 현재 페이지번호를 상태로 관리
    const[currentPage, setCurrentPage] = useState(1);

    // 더 이상 가져올 데이터가 있는지 여부
    const[isFinish, setIsFinish] = useState(false);

    const fetchEvents = async () => {

        if(isFinish) return;

        const response = await fetch(`http://localhost:9000/api/events?page=${currentPage}`);
        const {hasNext, eventList: events} = await response.json();

        setEventList(prev => [...prev, ...events]);
        // 페이지번호 갱신
        setCurrentPage(prev => prev + 1);
        setIsFinish(!hasNext);

        console.log(currentPage)
    };


    useEffect(() => {

        // 무한 스크롤을 위한 옵저버를 생성
        const observer = new IntersectionObserver((entries) => {

            if(isFinish) return;

            if(entries[0].isIntersecting) {
                // console.log('감시대상 발견!');
                fetchEvents();
            }
        }, {
            // 관찰하고 있는 대상의 높이가 50% 정도 보일 때 감지 실행
            threshold: 0.5
        })

        // 감시대상 설정
        if(observerRef.current){
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();

    }, [currentPage])


    return (
        <div>
            <ul>
                <EventList eventList={eventList}/>
                {/*무한스크롤 옵저버를 위한 감시대상 태그*/}
                <div style={{height: 300, background: 'yellow'}} ref={observerRef}>
                    {/*로딩바, 스켈레톤 풀백 배치*/}
                </div>
            </ul>
        </div>
    );
};

export default EventPage;