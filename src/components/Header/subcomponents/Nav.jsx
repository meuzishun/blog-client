import { useContext } from 'react';
import { UserContext } from '../../../App';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      {location.pathname === '/home' ? null : <Link to='/home'>Home</Link>}
      {!user ? (
        <>
          {location.pathname === '/register' ? null : (
            <Link to='register'>Register</Link>
          )}
          {location.pathname === '/login' ? null : (
            <Link to='login'>Login</Link>
          )}
        </>
      ) : (
        <Link onClick={handleLogout}>Logout</Link>
      )}
    </nav>
  );
}

export default Nav;
