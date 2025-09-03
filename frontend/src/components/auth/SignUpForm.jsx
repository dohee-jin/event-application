import styles from './SignUpForm.module.scss';
import EmailInput from "./EmailInput.jsx";
import {useState} from "react";
import VerificationInput from "./VerificationInput.jsx";

const SignUpForm = () => {

    // 현재 어떤 스텝인지 확인할 상태변수가 필요
    const[step, setStep] = useState(1);

    // 이메일 중복확인이 끝났을 때 호출될 함수
    const emailSuccessHandler = () => {
        setStep(2)
    }

    return (
        <div className={styles.signupForm}>
            <div className={styles.formStepActive}>
                {step === 1 && <EmailInput onSuccess={emailSuccessHandler}/>}
                {step === 2 && <VerificationInput />}
            </div>
        </div>
    );
};

export default SignUpForm;