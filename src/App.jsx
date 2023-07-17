import { getUser } from './api/api';
import { createContext, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

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

  useEffect(() => {
    const checkForUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return;
      }

      const response = await getUser(token);

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const userString = JSON.stringify(data.user);
      localStorage.setItem('user', userString);
      setUser(data.user);
    };

    checkForUser();
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
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
