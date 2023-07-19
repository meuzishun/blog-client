import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Nav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavbarLogin = () => {
    // Redirect the user to a specific page after login
    navigate('/dashboard');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='nav'>
      <NavLink to='/'>
        <p>Home</p>
      </NavLink>
      <NavLink to='posts'>
        <p>Posts</p>
      </NavLink>
      {!user ? (
        <>
          <NavLink to='register' onClick={handleNavbarLogin}>
            <p>Register</p>
          </NavLink>
          <NavLink to='login' onClick={handleNavbarLogin}>
            <p>Login</p>
          </NavLink>
        </>
      ) : (
        <Link onClick={handleLogout}>
          <p>Logout</p>
        </Link>
      )}
    </nav>
  );
}
