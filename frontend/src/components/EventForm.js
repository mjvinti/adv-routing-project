import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router-dom';

import classes from './EventForm.module.css';
import { getAuthToken } from '../util/auth';

const EventForm = ({ method, event }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const { state } = useNavigation();
  const isSubmitting = state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default EventForm;

export const action = async ({ params: { eventId }, request }) => {
  const { method } = request;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  };

  const url = `http://localhost:8080/events/${
    method === 'PATCH' ? eventId : ''
  }`;

  const token = getAuthToken();
  const response = await fetch(url, {
    method,
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  const { ok, status } = response;

  if (status === 422) {
    return response;
  }

  if (!ok) {
    throw json({ message: 'Could not save event' }, { status });
  }

  return redirect('/events');
};
