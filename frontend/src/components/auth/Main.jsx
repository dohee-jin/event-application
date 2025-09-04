import React from 'react';
import {Form, useSubmit} from "react-router-dom";

const Main = ({ userData }) => {

    // const submit = useSubmit();

    return (
        <>
         <h2>{userData.email}님 환영합니다.</h2>
         <h3>현재 권한: [{userData.role}]</h3>
        <Form
            method='POST'
            action='/logout'
        >
            <button>logout</button>
        </Form>
            {/*<button onClick={() => submit(null, '')}>logout</button>*/}
        </>
    );
};

export default Main;