import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' });
    }, 1 * 60 * 60 * 1000);
  }, [submit, token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
