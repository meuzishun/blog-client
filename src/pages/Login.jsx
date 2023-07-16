import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

function Login() {
  return (
    <div className='form-container'>
      <h2>Login</h2>
      <LoginForm />
      <div className='link-container'>
        <p>Don&apos;t have an account?</p>
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
