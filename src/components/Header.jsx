import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import styles from './Header.module.css';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <h1>Welcome {user ? `${user.firstName}...` : 'to the Blog'}</h1>
      <nav>
        <Link to='/'>Home</Link>
        {!user ? (
          <>
            <Link to='register'>Register</Link>
            <Link to='login'>Login</Link>
          </>
        ) : (
          <Link onClick={handleLogout}>Logout</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
