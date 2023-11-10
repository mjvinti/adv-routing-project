import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

const EventsList = ({ events }) => {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map(({ date, id, image, title }) => (
          <li key={id} className={classes.item}>
            <Link to={`/events/${id}`}>
              <img src={image} alt={title} />
              <div className={classes.content}>
                <h2>{title}</h2>
                <time>{date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
