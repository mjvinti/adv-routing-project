import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

const NewsletterSignup = () => {
  const { data, Form, state } = useFetcher();

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <Form action='/newsletter' method='post' className={classes.newsletter}>
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </Form>
  );
};

export default NewsletterSignup;
