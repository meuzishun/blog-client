import { getUser } from './api/api';
import { createContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext(null);

const router = createBrowserRouter(routes, { basename: '/blog-client' });

export default function App() {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const reset = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };

    const token = localStorage.getItem('token');

    if (!token) {
      reset();
      return;
    }

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const isValid = decoded.exp > currentTime;

    if (!isValid) {
      reset();
      return;
    }

    const response = await getUser(token);

    if (!response.ok) {
      reset();
      return;
    }

    const data = await response.json();
    const userString = JSON.stringify(data.user);
    localStorage.setItem('user', userString);
    setUser(data.user);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, checkToken }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
