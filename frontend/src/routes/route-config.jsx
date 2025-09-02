import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import {eventItemLoader, eventListLoader} from "../loader/event-loader.js";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";
import NewEventPage from "../pages/NewEventPage.jsx";
import {saveAction as manipulateAction, deleteAction } from "../loader/event-actions.js";
import EditPage from "../pages/EditPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'events',
                element: <EventLayout />,
                children: [
                    {
                        index: true,
                        element: <EventPage />,
                        // 로더 함수는 페이지가 라우팅 될 때 실행 됨
                        // 무한스크롤사용을 위해 삭제함
                    },
                    {
                        path: 'new',
                        element: <NewEventPage />,
                        // action 함수는 CUD를 트리거하는 함수
                        action: manipulateAction,
                    },
                    {
                        path: ':eventId',
                        element: <EventDetailPage />,
                        loader: eventItemLoader,
                        action: deleteAction,
                    },
                    {
                        path: ':eventId/edit',
                        element: <EditPage />,
                        loader: eventItemLoader,
                        action: manipulateAction,
                    }
                ]
            },
        ]
    },
]);

export default router;