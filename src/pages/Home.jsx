import { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className='home'>
      <div className='hero'>
        <div className='heading'>
          <p>Welcome to</p>
          <h1>You&apos;re Gonna Make Me Blog</h1>
          <p className='subheading'>
            Read rants about topics you pretend to care about
          </p>
        </div>
        <nav>
          {!user ? (
            <>
              <Link to='/blog-client/register'>Register</Link>
              <Link to='/blog-client/login'>Login</Link>
            </>
          ) : null}
          <Link to='/blog-client/posts'>Start Reading</Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
