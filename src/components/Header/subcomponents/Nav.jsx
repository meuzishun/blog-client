import { useContext } from 'react';
import { UserContext } from '../../../App';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='nav'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='posts'>Posts</NavLink>
      {!user ? (
        <>
          <NavLink to='register'>Register</NavLink>
          <NavLink to='login'>Login</NavLink>
        </>
      ) : (
        <Link onClick={handleLogout}>Logout</Link>
      )}
    </nav>
  );
}

export default Nav;
