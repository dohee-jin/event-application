import styles from './EventForm.module.scss';
import {useRef} from "react";
import {useNavigate, Form} from "react-router-dom";

const EventForm = () => {

    const titleRef = useRef();
    const imageRef = useRef();
    const dateRef = useRef();
    const descRef = useRef();

    const navigate = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();

        const $title = titleRef?.current;
        const $image = imageRef?.current;
        const $date = dateRef?.current;
        const $desc = descRef?.current;

        const payload = {
            title: $title.value,
            desc: $desc.value,
            beginDate: $date.value,
            imageUrl: $image.value
        }

        console.log(payload);

        // 즉시 실행 함수로 fetch 요청 보냄
        (async () => {
            const response = await fetch(`http://localhost:9000/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(response.ok) {
                navigate('/events');
            }
        })();

        $title.value = '';
        $desc.value = '';
        $date.value = '';
        $image.value = '';
    }

    // route 설정에 있는 action 함수를 트리거하려면 Form 이라는 컴포넌트가 필요하다
    // 필수 속성으로 method 속성을 지정해야 한다.
    return (
        <Form
            method = 'POST'
            className={styles.form}
            noValidate
            /*onSubmit={handleSubmit}*/>
            <p>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    type='text'
                    name='title'
                    required
                    ref={titleRef}
                />
            </p>
            <p>
                <label htmlFor='image'>Image</label>
                <input
                    id='image'
                    type='url'
                    name='image'
                    required
                    ref={imageRef}
                />
            </p>
            <p>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    type='date'
                    name='date'
                    required
                    ref={dateRef}
                />
            </p>
            <p>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    name='description'
                    rows='5'
                    required
                    ref={descRef}
                />
            </p>
            <div className={styles.actions}>
                <button type='button'>Cancel</button>
                <button>Save</button>
            </div>
        </Form>
    );
};

export default EventForm;
