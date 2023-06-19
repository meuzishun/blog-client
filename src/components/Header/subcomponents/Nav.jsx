import { useContext } from 'react';
import { UserContext } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <Link to='/home'>Home</Link>
      {!user ? (
        <>
          <Link to='register'>Register</Link>
          <Link to='login'>Login</Link>
        </>
      ) : (
        <Link onClick={handleLogout}>Logout</Link>
      )}
    </nav>
  );
}

export default Nav;
