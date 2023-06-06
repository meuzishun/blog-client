const apiRoot = import.meta.env.VITE_API_ROOT;
import FormInput from '../components/FormInput';
import styles from './Form.module.css';
import { useState } from 'react';

function Register() {
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
    const json = await response.json();
    console.log(json);
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
    </div>
  );
}

export default Register;
