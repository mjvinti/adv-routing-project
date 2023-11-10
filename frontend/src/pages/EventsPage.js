import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

export const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const { ok, status } = response;

  if (!ok) {
    throw json({ message: 'Could not fetch events.' }, { status });
  }
  const resData = await response.json();
  return resData.events;
};

export const loader = () => defer({ events: loadEvents() });
