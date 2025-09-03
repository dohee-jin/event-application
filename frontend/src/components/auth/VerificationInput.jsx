import styles from './SignUpForm.module.scss';
import {useEffect, useRef} from "react";

const VerificationInput = () => {

    // ref를 배열로 관리하는 법
    const inputRefs = useRef([]);

    // 수동으로 ref 배열에 input 태그들 저장하기
    const bindRef = ($input) => {
        inputRefs.current.push($input);
    };

    useEffect(() => {
        // 맨 첫번쨰 칸에 포커싱
        inputRefs.current[0].focus();
    }, []);

    // 입력하면 다음 포커스로 이동하기
    const handleNumber = (index) => {

        // 인덱스 검증 - 마지막 칸에서는 포커스 이동대신 블러처리
        if(index < inputRefs.current.length) {
            // 한 글자가 입력되면 포커스를 다음 칸으로 이동
            inputRefs.current[index].focus();
        } else {
            inputRefs.current[index - 1].blur();
        }


    }

    return (
        <>
            <p>Step 2: 이메일로 전송된 인증번호 4자리를 입력해주세요.</p>
            <div className={styles.codeInputContainer}>
                {
                    Array.from(new Array(4)).map((a, index) =>
                        <input
                            ref={bindRef}
                            key={index}
                            type='text'
                            className={styles.codeInput}
                            maxLength={1}
                            onChange={() => handleNumber(index + 1)}
                        />
                    )
                }
            </div>
        </>
    );
};

export default VerificationInput;