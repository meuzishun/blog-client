import { Link } from 'react-router-dom';
import Form from '../components/Form/Form';

function Login() {
  return (
    <div className='form-container'>
      <h2>Login</h2>
      <Form type='login' />
      <div className='link-container'>
        <p>Don&apos;t have an account?</p>
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
