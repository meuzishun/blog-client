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

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'posts',
        element: <PostsLayout />,
        children: [
          {
            index: true,
            element: <Posts />,
          },
          {
            path: ':postId',
            element: <PostDetails />,
          },
        ],
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
