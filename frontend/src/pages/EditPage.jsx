import React from 'react';
import EventForm from "../components/EventForm.jsx";
import {useLoaderData} from "react-router-dom";

const EditPage = () => {

    const event = useLoaderData();
    console.log(event)

    return (
        <div>
            <EventForm method='PUT' event={event}/>
        </div>
    );
};

export default EditPage;