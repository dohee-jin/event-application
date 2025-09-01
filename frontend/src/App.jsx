import React from 'react';
import {RouterProvider} from "react-router-dom";
import router from "./routes/route-config.jsx";
import "./App.css";

const App = () => (
    <>
        <RouterProvider router={router}/>
    </>
);

export default App;