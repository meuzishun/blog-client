import { createContext, useState } from 'react';
import { getUser } from '../api/api';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

function UserProvider({ children }) {
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

  return (
    <UserContext.Provider value={{ user, setUser, checkToken }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { UserContext, UserProvider };
