import { Link } from 'react-router-dom';
import styles from './Form.module.css';
import Form from '../components/Form/Form';

function Login() {
  return (
    <div className={styles.container}>
      <h2>Login Form</h2>
      <Form type='login' />
      <div className={styles.linkContainer}>
        <p>Don&apos;t have an account?</p>
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
