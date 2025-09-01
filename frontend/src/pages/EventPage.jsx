import React, {useEffect, useState} from 'react';
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
    const eventList = useLoaderData();
    console.log(eventList)

    return (
        <div>
            <ul>
                <EventList eventList={eventList}/>
            </ul>
        </div>
    );
};

export default EventPage;