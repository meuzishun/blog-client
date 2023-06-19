const apiRoot = import.meta.env.VITE_API_ROOT;
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

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

  return (
    <div className={styles.app}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/post/:postId' element={<Post />} />
            {!user ? (
              <>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </>
            ) : null}
          </Routes>
        </Router>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
