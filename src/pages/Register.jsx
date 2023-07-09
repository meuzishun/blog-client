import { Link } from 'react-router-dom';
import Form from '../components/forms/Form';

function Register() {
  return (
    <div className='form-container'>
      <h2>Register</h2>
      <Form type='register' />
      <div className='link-container'>
        <p>Already have an account?</p>
        <Link to='/blog-client/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
