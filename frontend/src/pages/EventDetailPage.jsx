import React from 'react';
import {useLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem.jsx";

const EventDetailPage = () => {

    const event = useLoaderData();

    return (
        <div>
            <EventItem event={event} />
        </div>
    );
};

export default EventDetailPage;