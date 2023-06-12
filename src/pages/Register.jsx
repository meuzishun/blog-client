const apiRoot = import.meta.env.VITE_API_ROOT;
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import styles from './Form.module.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiRoot + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    console.log(data);
    const userString = JSON.stringify(data.user);
    localStorage.setItem('token', data.jwt.token);
    localStorage.setItem('user', userString);
    setUser(data.user);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Register Form</h2>
      <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
        <FormInput
          type={'text'}
          id={'firstName'}
          name={'firstName'}
          label={'first name'}
        />
        <FormInput
          type={'text'}
          id={'lastName'}
          name={'lastName'}
          label={'last name'}
        />
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
        <p>Already have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;
