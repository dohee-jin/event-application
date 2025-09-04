import {Form, NavLink, useRouteLoaderData} from 'react-router-dom';
import styles from './MainNavigation.module.scss';

const MainNavigation = () => {

    const userData = useRouteLoaderData('user-token-data');

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li>
                        <NavLink
                            to='/'
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/events'
                        >
                            Events
                        </NavLink>
                    </li>
                    {
                        userData &&
                        <li>
                            <Form method='POST' action='/logout'>
                                <button style={{width: '100%'}}>logout</button>
                            </Form>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
