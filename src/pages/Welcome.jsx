import { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.welcome}>
      <div className={styles.hero}>
        <header className={styles.header}>
          <p>Welcome to</p>
          <h1>You&apos;re Gonna Make Me Blog</h1>
          <p className={styles.subheading}>
            Read rants about topics you pretend to care about
          </p>
        </header>
        <nav>
          {!user ? (
            <>
              <Link to='register'>Register</Link>
              <Link to='login'>Login</Link>
            </>
          ) : null}
          <Link to='/home'>Start Reading</Link>
        </nav>
      </div>
    </div>
  );
}

export default Welcome;
