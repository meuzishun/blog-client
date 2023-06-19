import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.hero}>
        <header className={styles.header}>
          <p>Welcome to</p>
          <h1>You&apos;re Gonna Make Me Blog</h1>
          <p className={styles.subheading}>
            Read rants about topics you want to pretend you care about
          </p>
        </header>
        <nav>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/home'>Start Reading</Link>
        </nav>
      </div>
    </div>
  );
}

export default Welcome;
