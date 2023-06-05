import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <h1>Welcome {user ? `${user.firstName}...` : 'to the Blog'}</h1>
      <nav>
        <Link to='/'>Home</Link>
        {!user ? (
          <>
            <Link to='register'>Register</Link>
            <Link to='login'>Login</Link>
          </>
        ) : (
          <Link>Logout</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
