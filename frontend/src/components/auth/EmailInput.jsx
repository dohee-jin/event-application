import React, {useEffect, useRef, useState} from 'react';
import styles from './SignUpForm.module.scss';
import {AUTH_API_URL} from "../../config/host-config.js";

const EmailInput = () => {

    const emailRef = useRef();

    // 에러 상태 메세지를 관리
    const[error, setError] = useState('');

    // 화면이 렌더링 되자마자 입력창에 포커싱
    useEffect(() => {
        emailRef.current.focus();
    }, [])

    // 이메일 입력 이벤트
    const handleEmail = e => {
        const inputValue =  e.target.value;

        // 이메일 패턴 검증
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
        if(!emailPattern.test(inputValue)) {
            setError('이메일이 올바르지 않습니다.');
            return;
        }

        // 이메일 중복확인 검증
        (async () => {
            const response = await fetch(`${AUTH_API_URL}/check-email?email=${inputValue}`);
            const {isDuplicate, message} = await response.json();

            if(isDuplicate) setError(message)

        })();

        setError('')
    }

    return (
        <>
            <p>Step 1: 유효한 이메일을 입력해주세요.</p>
            <input
                type='email'
                placeholder='Enter your email'
                ref={emailRef}
                onChange={handleEmail}
                className={error ? styles.invalidInput : ''}
            />
            {error ? <p className={styles.errorMessage}>{error}</p> : ''}
        </>
    );
};

export default EmailInput;
