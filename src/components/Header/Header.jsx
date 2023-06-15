import { useContext } from 'react';
import { UserContext } from '../../App';
import styles from './Header.module.css';
import Nav from './subcomponents/Nav';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <h1>Welcome {user ? `${user.firstName}...` : 'to the Blog'}</h1>
      <Nav />
    </header>
  );
}

export default Header;
