import { Link } from 'react-router-dom';
import styles from './Form.module.css';
import Form from '../components/Form';

function Register() {
  return (
    <div className={styles.container}>
      <h2>Register Form</h2>
      <Form type='register' />
      <div className={styles.linkContainer}>
        <p>Already have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
