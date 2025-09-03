import styles from './SignUpForm.module.scss';
import EmailInput from "./EmailInput.jsx";
import {useState} from "react";
import VerificationInput from "./VerificationInput.jsx";
import ProgressBar from "../common/ProgressBar.jsx";

const SignUpForm = () => {

    // 현재 어떤 스텝인지 확인할 상태변수가 필요
    const[step, setStep] = useState(1);

    // 프로그레스 바 노출 여부 상태관리 변수
    const[isNext, setIsNext] =useState(false);

    //
    const[enteredEmail, setEnteredEmail] = useState('');

    // 이메일 중복확인이 끝났을 때 호출될 함수
    const emailSuccessHandler = ( email ) => {

        setIsNext(true); // 프로그레스 바 노출

        setTimeout(() => {

            setStep(2);
            setEnteredEmail(email)
            setIsNext(false);

        }, 1000);
    }

    return (
        <div className={styles.signupForm}>
            <div className={styles.formStepActive}>
                {step === 1 && <EmailInput onSuccess={emailSuccessHandler}/>}
                {step === 2 && <VerificationInput email={enteredEmail}/>}

                {isNext && <ProgressBar/>}
            </div>
        </div>
    );
};

export default SignUpForm;