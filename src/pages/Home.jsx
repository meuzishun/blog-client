import { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className='home'>
      <div className='hero'>
        <header className='header'>
          <p>Welcome to</p>
          <h1>You&apos;re Gonna Make Me Blog</h1>
          <p className='subheading'>
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
          <Link to='/posts'>Start Reading</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
