import { Form, Link } from 'react-router-dom'; // Link 컴포넌트 추가
import styles from './LoginForm.module.scss';
import {AUTH_API_URL} from "../../config/host-config.js";
import {useState} from "react";

const LoginForm = () => {

    const[error, setError] = useState('');

    // 로그인 요청 이벤트
    const handleSubmit = e => {
        e.preventDefault();
        (async () => {
            const formData = new FormData(e.target);
            const payload = {
                email: formData.get('email'),
                password: formData.get('password')
            }
            const response = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.status === 422) {
                // 에러 메시지 피드백
                setError(data.message);
            }

        })();
    }

    return (
        <>
            <Form
                method='post'
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1>Log in</h1>
                <p>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        required
                    />
                </p>
                <p>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        required
                    />
                </p>
                <div className={styles.actions}>
                    <button
                        type='submit'
                        className={styles.loginButton}>
                        Login
                    </button>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.registerLink}>
                    <Link to='/sign-up'>회원이 아니십니까? 회원가입을 해보세요</Link>
                </div>
            </Form>
        </>
    );
}

export default LoginForm;
