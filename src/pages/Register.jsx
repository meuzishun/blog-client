import { Link } from 'react-router-dom';
// import styles from './Form.module.css';
import Form from '../components/Form/Form';

function Register() {
  return (
    <div className='form-container'>
      <h2>Register</h2>
      <Form type='register' />
      <div className='links-container'>
        <p>Already have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
