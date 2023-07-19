import { createContext, useState } from 'react';
import { getUser } from '../api/api';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const reset = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isValid = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };

  const storeUser = (user) => {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
    setUser(user);
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    if (!token || !isValid(token)) {
      reset();
      return;
    }

    const response = await getUser(token);

    if (!response.ok) {
      reset();
      return;
    }

    const data = await response.json();
    storeUser(data.user);
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
