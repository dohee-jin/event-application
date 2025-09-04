import styles from './SignUpForm.module.scss';
import EmailInput from "./EmailInput.jsx";
import {useState} from "react";
import VerificationInput from "./VerificationInput.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import PasswordInput from "./PasswordInput.jsx";
import {AUTH_API_URL} from "../../config/host-config.js";
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {

    // 현재 어떤 스텝인지 확인할 상태변수가 필요
    const[step, setStep] = useState(1);

    // 프로그레스 바 노출 여부 상태관리 변수
    const[isNext, setIsNext] =useState(false);

    //
    const[enteredEmail, setEnteredEmail] = useState('');

    // 회원가입 버튼 활성화 여부
    const[isActiveButton, setIsActiveButton] = useState(false);

    const[enteredPassword, setEnteredPassword] = useState('');

    const navigate = useNavigate();

    // 다음 스텝으로 넘어가는 함수
    const nextStep = () => {

        setIsNext(true); // 프로그레스 바 노출

        setTimeout(() => {

            setStep(prev => prev + 1);
            setIsNext(false);

        }, 1000);
    }

    // 이메일 중복확인이 끝났을 때 호출될 함수
    const emailSuccessHandler = ( email ) => {
        console.log(email)
        setEnteredEmail(email)
        nextStep();

    }

    // 패스워드 입력이 끝날 때 호출 될 함수
    const passwordSuccessHandler = (isValid, password) => {

        setEnteredPassword(password);
        // 회원가입을 열어줄지 여부
        setIsActiveButton(isValid);

    }

    // 회원가입 완료 이벤트
    const handleSubmit = e => {
        (async () => {
            const response = await fetch(`${AUTH_API_URL}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: `${enteredEmail}`,
                        password: `${enteredPassword}`,
                    }
                )
            });

            if(!response.ok) throw new Error("회원가입에 실패했습니다.");

            const data = await response.json();
            alert(data.message);
            navigate('/');

        })();
    }


    return (
        <div className={styles.signupForm}>
            <div className={styles.formStepActive}>
                {step === 1 && <EmailInput onSuccess={emailSuccessHandler}/>}
                {step === 2 && <VerificationInput email={enteredEmail} onSuccess={nextStep}/>}
                {step === 3 && <PasswordInput onSuccess={passwordSuccessHandler}/>}

                {isActiveButton && <div><button onClick={handleSubmit}>회원가입 완료</button></div>}

                {isNext && <ProgressBar/>}
            </div>
        </div>
    );
};

export default SignUpForm;