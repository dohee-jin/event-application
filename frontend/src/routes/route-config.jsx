import {createBrowserRouter} from "react-router-dom";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import {eventItemLoader} from "../loader/event-loader.js";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";
import NewEventPage from "../pages/NewEventPage.jsx";
import {deleteAction, saveAction as manipulateAction} from "../loader/event-actions.js";
import EditPage from "../pages/EditPage.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomeLayout />,
                children: [
                    {
                        index: true,
                        element: <WelcomePage />
                    },
                    {
                        path: 'sign-up',
                        element: <SignUpPage />
                    }
                ]
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