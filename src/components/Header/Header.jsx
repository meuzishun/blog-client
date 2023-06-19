import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from './Header.module.css';
import Nav from './subcomponents/Nav';

function Header() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className={styles.header}>
      <h1>You&apos;re Gonna Make Me Blog</h1>
      {!user ? null : <p>Hello {user.firstName}!</p>}
      <Nav />
    </header>
  );
}

export default Header;
