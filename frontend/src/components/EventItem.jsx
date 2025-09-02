import styles from './EventItem.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";

const EventItem = ({ event }) => {
    const {
        title,
        desc: description,
        'img-url': image,
        'start-date': date,
    } = event;

    const {eventId} = useParams();
    const navigate = useNavigate();

    const handleDelete = e => {
        e.preventDefault();

        (async () => {
            const response = await fetch(`http://localhost:9000/api/events/${eventId}`, {
                method: 'DELETE',
            });

            alert(`정말 삭제하시겠습니까? `)

            if(response.ok) {
                navigate('/events');
            }
        })();
    }

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
                <button onClick={handleDelete}>Delete</button>
            </menu>
        </article>
    );
};

export default EventItem;
