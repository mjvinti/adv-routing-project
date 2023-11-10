import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthenticationPage, {
  action as authAction
} from './pages/AuthenticationPage';
import EditEventPage from './pages/EditEventPage';
import ErrorPage from './pages/ErrorPage';
import EventDetailPage, {
  loader as eventDetailPageLoader,
  action as eventDetailPageAction
} from './pages/EventDetailPage';
import { action as manipulateEventAction } from './components/EventForm';
import EventsPage, { loader as eventsPageLoader } from './pages/EventsPage';
import EventsRootLayout from './pages/EventsRootLayout';
import HomePage from './pages/HomePage';
import { action as logoutAction } from './pages/Logout';
import NewEventPage from './pages/NewEventPage';
import NewsletterPage, {
  action as newsletterAction
} from './pages/NewsletterPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthenticationPage />, action: authAction },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsPageLoader
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailPageLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailPageAction
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction
              }
            ]
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
