import styles from './EventItem.module.scss';
import {Link, useNavigate, useSubmit} from 'react-router-dom';

const EventItem = ({ event }) => {
    const {
        id,
        title,
        desc: description,
        'img-url': image,
        'start-date': date,
    } = event;

    // Form 컴포넌트 없이 action함수를 작동시키는 법
    const submit = useSubmit();

    const handleRemove = e => {
        // Form없이 action함수 트리거 - 낙관적 업데이트
        submit(null, {method:'DELETE'});
    };

    return (
        <article className={styles.event}>
            <img
                src={image}
                alt={title}
            />
            <h1>{title}</h1>
            <time>{date}</time>
            <p>{description}</p>
            <menu className={styles.actions}>
                <Link to='edit'>Edit</Link>
                <button onClick={handleRemove}>Delete</button>
            </menu>
        </article>
    );
};

export default EventItem;