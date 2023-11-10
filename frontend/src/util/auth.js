export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const tokenLoader = () => getAuthToken();
