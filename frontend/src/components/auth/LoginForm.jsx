import {Form, Link, useActionData} from 'react-router-dom'; // Link 컴포넌트 추가
import styles from './LoginForm.module.scss';

const LoginForm = () => {

    //  action 함수가 리턴한 데이터 가져오기
    const error = useActionData();

    return (
        <>
            <Form
                method='post'
                className={styles.form}>
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
