import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Nav from './Nav';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className='header'>
      <Link to='/'>
        <h1>You&apos;re Gonna Make Me Blog</h1>
      </Link>
      {!user ? null : <p>Hello {user.firstName}!</p>}
      <Nav />
    </header>
  );
}

export default Header;
