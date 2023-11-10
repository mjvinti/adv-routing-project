import { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  const { ok, status } = response;

  if (!ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      { status }
    );
  }
  const resData = await response.json();
  return resData.event;
};

export const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const { ok, status } = response;

  if (!ok) {
    throw json({ message: 'Could not fetch events.' }, { status });
  }
  const resData = await response.json();
  return resData.events;
};

export const loader = async ({ params: { eventId } }) =>
  defer({ event: await loadEvent(eventId), events: loadEvents() });

export const action = async ({ params: { eventId }, request: { method } }) => {
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method
  });
  const { ok, status } = response;

  if (!ok) {
    throw json({ message: 'Could not delete the selected event.' }, { status });
  }
  return redirect('/events');
};
