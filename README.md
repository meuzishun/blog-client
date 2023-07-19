# Blog Client

This repository is part of a Blog App project completed for partial fulfillment of the curriculum of [The Odin Project](https://www.theodinproject.com/). The project is made up of a backend [API](https://en.wikipedia.org/wiki/API) and two frontend [SPA](https://en.wikipedia.org/wiki/Single-page_application)s. See below for live links and other repositories:

- Click [here](https://meuzishun.github.io/blog-client/) for the live site for this repository
- Click [here](https://github.com/meuzishun/blog-api) for the API repository
- Click [here](https://github.com/meuzishun/blog-client-author) for the Client-Author repository and [here](https://meuzishun.github.io/blog-client-author/) for the live site

## Overview

This frontend app was built with React and Vite (as opposed to `create-react-app`). The main features of the code worth documenting are:

1. the use of `react-router-dom` v6
2. creating a `UserProvider` component with the `useContext` hook to handle the authentication
3. handling the state of API calls with the `useReducer` hook

These features are outlined below.

## React-Router-Dom v6

Here is a [link](https://reactrouter.com/en/main) to the react-router-dom site for more information about this package. The new features of v6 allow for a clean separations routing from the rest of the app. The `createBrowserRouter` was used to setup the app's routes from an array stored in another file:

```javascript
// from App.js

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes, { basename: '/blog-client' });

export default function App() {
  return <RouterProvider router={router} />;
}
```

```javascript
// from routes.jsx

// ...a bunch of imported elements...

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
```

## UserProvider Component

The `useContext` hook is used to sorta 'broadcast' data and functions to any component from a high (usually top) level. The `userContext` file creates the `userContext` with the `useContext` hook and then provides it to all the children components inside:

```javascript
import { createContext } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {

  // data and functions declared...

  return (
    <UserContext.Provider value={
      // data and functions to 'broadcast'
    }>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

```

```javascript
// App.js

import { UserProvider } from './contexts/userContext';

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
```

Then the UserContext will be available to any component needed:

```js
// Home.js

import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';

function Home() {
  // user state and checkToke function destructured...
  const { user, checkToken } = useContext(UserContext);

  useEffect(() => {
    // token checked when component mounted...
    checkToken();
  }, []);

  // user state used for conditionally rendered Links...
  return (
    <div className='home'>
      <div className='hero'>
        <div className='heading'>
          <p>Welcome to</p>
          <h1>You&apos;re Gonna Make Me Blog</h1>
          <p className='subheading'>
            Read rants about topics you pretend to care about
          </p>
        </div>
        <nav>
          {!user ? (
            <>
              <Link to='register'>Register</Link>
              <Link to='login'>Login</Link>
            </>
          ) : null}
          <Link to='posts'>Start Reading</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
```

## Handling the state of API calls

The `useState` hook is usually used to handle state. However, when making API calls, multiple states are often needed (e.g. isLoading, error, etc.). The `useReducer` hook can help manage this with less complication (fyi, checkout this [link](https://www.etymonline.com/word/reduce) about the etymology for 'reduce'... TLDR: think 'replace' instead of our modern-day use of 'reduce'...).

In the Posts page, for instance, a call to the API to get blog posts is needed. This means a state is needed for whether the process is still ongoing (`isLoading`), if there was an error, and of course an array holding the posts after a successful call.

An initial state is created as an object:

```js
// Posts.jsx

const initialPostsState = {
  isLoading: false,
  error: null,
  posts: [],
};
```

Then a reducer function is created (remember, think replace...):

```js
// Posts.jsx

function postsReducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return {
        error: null,
        isLoading: true,
        posts: [],
      };
    case 'error':
      return {
        error: action.error,
        isLoading: false,
        posts: [],
      };
    case 'success':
      return {
        error: null,
        isLoading: false,
        posts: action.posts,
      };
    default:
      return initialPostsState;
  }
}
```

Here the various states needed are organized and set with a switch conditional.

Then the `useReducer` hook combines the initial state and the reducer function and returns the state and a `dispatch` function used to alter (actually replace) the state:

```js
import { useReducer } from 'react';
import { getPosts } from '../../api/api';

export default function Posts() {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);

  const loadPosts = async () => {
    dispatch({ type: 'initialize' });
    const response = await getPosts();

    if (!response.ok) {
      dispatch({ type: 'error', error: response.statusText });
    } else {
      const data = await response.json();
      dispatch({ type: 'success', posts: data.posts });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (state.error) {
    // doing something if there is an error...
  }

  if (state.isLoading) {
    // doing something while loading...
  }

  // the rest of the component...
}
```
