import styles from './EventForm.module.scss';
import {Form} from "react-router-dom";

const EventForm = () => {



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
                />
            </p>
            <p>
                <label htmlFor='image'>Image</label>
                <input
                    id='image'
                    type='url'
                    name='image'
                    required
                />
            </p>
            <p>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    type='date'
                    name='date'
                    required
                />
            </p>
            <p>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    name='description'
                    rows='5'
                    required
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
