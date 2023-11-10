import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {
  const {
    data: { message },
    status
  } = useRouteError();

  const title = status === 404 ? 'Not found!' : 'An error occurred!',
    errorMessage = status === 404 ? 'Could not find resource or page' : message;

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{errorMessage}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
