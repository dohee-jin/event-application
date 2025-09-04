import styles from './SignUpForm.module.scss';
import {useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import {AUTH_API_URL} from "../../config/host-config.js";

const VerificationInput = ({email, onSuccess}) => {

    // ref를 배열로 관리하는 법
    const inputRefs = useRef([]);

    // 완성된 인증코드를 상태관리
    const[codes, setCodes] = useState(['', '', '', '']);

    // 에러메세지 상태관리
    const[error, setError] = useState('');

    // 인증코드 만료 타이머 시간을 관리
    const[timer, setTimer] = useState(300);

    // 수동으로 ref 배열에 input 태그들 저장하기
    const bindRef = ($input, index) => {
        // current 의 특정 인덱스에 값을 직접 저장
        inputRefs.current[index] = $input;
    };

    const focusNextInput = (index) => {
        // 인덱스 검증 - 마지막 칸에서는 포커스 이동대신 블러처리
        if (index < inputRefs.current.length) {
            // 한 글자가 입력되면 포커스를 다음 칸으로 이동
            inputRefs.current[index].focus();
        } else {
            inputRefs.current[index - 1].blur();
        }
    };

    const fetchVerifying = debounce(async (verifyCode) => {
        const response = await fetch(`${AUTH_API_URL}/code?email=${email}&code=${verifyCode}`);
        const {isMatch} = await response.json();

        // 검증에 실패했을 경우
        if(!isMatch) {

            // 타이머를 리셋
            setTimer(300);

            // 에러메세지를 세팅
            setError('유효하지 않거나 만료된 인증코드입니다. 인증코드를 재발송합니다.');
            // 인증코드를 모두 빈칸으로 되돌림
            setCodes(Array(4).fill(''));
            // 첫번쨰 칸으로 재 포커싱
            inputRefs.current[0].focus();
            return;
        }

        // 검증 성공시 - 다음 스텝으로 이동하는 신호 올려보내기
        setError('');
        onSuccess();

    }, 1000);

    // 입력하면 다음 포커스로 이동하기
    const handleNumber = (index, e) => {

        const inputValue = e.target.value;

        if (inputValue !== '' && !/^\d$/.test(inputValue)) {  // \d = 정수를 의미
            return;
        }

        // 입력한 숫자를 하나로 연결하기
        const copyCodes = [...codes];
        copyCodes[index] = inputValue;

        setCodes(copyCodes);

        focusNextInput(index  + 1);

        // 모든 인증코드를 입력했을 때 서버에 인증코드를 전송
        if(copyCodes.every(code => code !== '')) {
            console.log('모든 칸이 입력됨!', copyCodes);
            const verifyCode = copyCodes.join('');
            console.log(verifyCode)

            // 서버에 전송
            fetchVerifying(verifyCode);
        }

    }

    useEffect(() => {
        // 맨 첫번쨰 칸에 포커싱
        inputRefs.current[0].focus();
        // 초기 랜더링 시 타이머 가동
        setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
    }, []);

    return (
        <>
            <p>Step 2: 이메일로 전송된 인증번호 4자리를 입력해주세요.</p>
            <div className={styles.codeInputContainer}>
                {
                    Array.from(new Array(4)).map((a, index) =>
                        <input
                            ref={($input) => bindRef($input, index)}
                            key={index}
                            type='text'
                            className={styles.codeInput}
                            maxLength={1}
                            onChange={(e) => handleNumber(index, e)}
                            value={codes[index]}
                        />
                    )
                }
            </div>

            <div className={styles.timer}>
                {`${'0' + Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </>
    );
};

export default VerificationInput;