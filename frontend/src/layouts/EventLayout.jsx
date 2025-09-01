import React from 'react';
import EventNavigation from "../components/EventNavigation.jsx";
import {Outlet} from "react-router-dom";

const EventLayout = () => {
    return (
        <>
            <EventNavigation />
            <Outlet />
        </>
    );
};

export default EventLayout;