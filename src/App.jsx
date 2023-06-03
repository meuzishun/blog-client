import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';

export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/post' element={<Post />} />
          {!user ? (
            <>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
