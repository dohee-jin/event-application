import React, {useState} from 'react';
const DEFAULT_URL = 'http://localhost:9000/api/events'

const EventPage = () => {
    const [eventList, setEventList] = useState([]);

    const fetchEvent = async () => {
        const response =  await fetch(`${DEFAULT_URL}`);
        const data = await response.json();

        console.log(data);

        setEventList(data);
    }

    fetchEvent();


    return (
        <div>
            <ul>
                {
                    eventList.map(event => <li key={event.eventId}>{event.title}</li>)
                }
            </ul>
        </div>
    );
};

export default EventPage;