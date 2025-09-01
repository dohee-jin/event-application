import styles from './EventList.module.scss';
import { Link } from 'react-router-dom';

const EventList = ({ eventList }) => {
    const { events, list, item, content } = styles;

    return (
        <div className={events}>
            <h1>All Events</h1>
            <ul className={list}>
                {eventList.map((ev) => (
                    <li
                        key={ev.eventId}
                        className={item}>
                        <Link to={ev.eventId.toString()}>
                            <img
                                src={ev.imgUrl}
                                alt={ev.title}
                            />
                            <div className={content}>
                                <h2>{ev.title}</h2>
                                <time>{ev.startDate}</time>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
