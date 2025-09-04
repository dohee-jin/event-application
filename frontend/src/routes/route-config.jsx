import {createBrowserRouter} from "react-router-dom";
import EventPage from "../pages/EventPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import {eventItemLoader, userDataLoader, authCheckLoader} from "../loader/event-loader.js";
import EventDetailPage from "../pages/EventDetailPage.jsx";
import EventLayout from "../layouts/EventLayout.jsx";
import NewEventPage from "../pages/NewEventPage.jsx";
import {deleteAction, saveAction as manipulateAction, loginAction, logoutAction} from "../loader/event-actions.js";
import EditPage from "../pages/EditPage.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: userDataLoader,
        id: 'user-token-data', // 로더의 리턴데이터는 children 즉 outlet 들에게는 전달되지 않는게 기본
        // id 를 주면 children 들이 id로 가져갈 수있음. children 에거 로더데이터를 주르면 id를 이용해야함
        children: [
            {
                path: '',
                element: <HomeLayout />,
                children: [
                    {
                        index: true,
                        element: <WelcomePage />,
                        action: loginAction,
                    },
                    {
                        path: 'sign-up',
                        element: <SignUpPage />,
                    },
                    {
                        path: '/logout',
                        action: logoutAction,
                    }
                ]
            },
            {
                path: 'events',
                element: <EventLayout />,
                loader: authCheckLoader, // 라우트 가드
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