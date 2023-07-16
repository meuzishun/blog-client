import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

function Register() {
  return (
    <div className='form-container'>
      <h2>Register</h2>
      <RegisterForm />
      <div className='link-container'>
        <p>Already have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
