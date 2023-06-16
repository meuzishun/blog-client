import { useContext } from 'react';
import { UserContext } from '../../App';
import styles from './Header.module.css';
import Nav from './subcomponents/Nav';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <h1>You&apos;re Gonna Make Me Blog</h1>
      {!user ? null : <p>Hello {user.firstName}!</p>}
      <Nav />
    </header>
  );
}

export default Header;
