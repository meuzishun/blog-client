const apiRoot = import.meta.env.VITE_API_ROOT;
import FormInput from '../components/FormInput';
import styles from './Form.module.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiRoot + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    const userString = JSON.stringify(data.user);
    localStorage.setItem('token', data.jwt.token);
    localStorage.setItem('user', userString);
    setUser(data.user);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Login Form</h2>
      <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
        <FormInput type={'email'} id={'email'} name={'email'} label={'email'} />
        <FormInput
          type={'password'}
          id={'password'}
          name={'password'}
          label={'password'}
        />
        <button>submit</button>
      </form>
      <div className={styles.linkContainer}>
        <p>Don&apos;t have an account?</p>
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
