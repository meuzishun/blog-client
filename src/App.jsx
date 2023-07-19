import { getUser } from './api/api';
import { createContext, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// layouts
import RootLayout from './layouts/RootLayout';
import PostsLayout from './layouts/PostsLayout';

// pages
import Home from './pages/Home';
import Posts from './pages/posts/Posts';
import PostDetails from './pages/posts/PostDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export const UserContext = createContext(null);

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='posts' element={<PostsLayout />}>
          <Route index element={<Posts />} />
          <Route path=':postId' element={<PostDetails />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    ),
    { basename: '/blog-client' }
  );

  return (
    <UserContext.Provider value={{ user, setUser, checkToken }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
