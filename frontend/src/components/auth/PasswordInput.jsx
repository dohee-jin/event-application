import React, { useEffect, useRef, useState } from 'react';
import styles from './SignUpForm.module.scss';

const PasswordInput = ({ onSuccess }) => {
    const passwordRef = useRef();

    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 패스워드 패턴검증
    const validatePassword = (password) => {
        const passwordPattern =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordPattern.test(password);
    };

    const changeHandler = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (validatePassword(newPassword)) {
            setErrorMessage('');
            onSuccess(true);
        } else {
            setErrorMessage(
                '비밀번호는 8자 이상이며, 숫자, 문자, 특수문자를 모두 포함해야 합니다.'
            );
            onSuccess(false);
        }
    };

    useEffect(() => {
        passwordRef.current.focus();
    }, []);

    return (
        <>
            <p>Step 3: 안전한 비밀번호를 설정해주세요.</p>
            <input
                ref={passwordRef}
                type='password'
                value={password}
                onChange={changeHandler}
                className={errorMessage ? styles.invalidInput : ''}
                placeholder='Enter your password'
            />
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </>
    );
};

export default PasswordInput;
