const apiRoot = 'https://scary-train-deer.cyclic.app';
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
    const getUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        localStorage.clear();
        return;
      }

      const response = await fetch(apiRoot + '/profile', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      const userString = JSON.stringify(data.user);
      localStorage.setItem('user', userString);
      setUser(data.user);
    };

    getUser();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/blog-client/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='posts' element={<PostsLayout />}>
          <Route index element={<Posts />} />
          <Route path=':postId' element={<PostDetails />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
