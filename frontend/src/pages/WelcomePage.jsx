import React from 'react';
import LoginForm from "../components/auth/LoginForm.jsx";
import Main from "../components/auth/Main.jsx";
import {useRouteLoaderData} from "react-router-dom";

const WelcomePage = () => {

    // 상위 레이아웃이 가지고 있는 로더의 데이터를 불러올 때는 id를 사용
    const userData = useRouteLoaderData('user-token-data');

    return (
        <>
            {userData ? <Main userData={userData} /> : <LoginForm />}
        </>
    );
};

export default WelcomePage;