const apiRoot = import.meta.env.VITE_API_ROOT;
import PropTypes from 'prop-types';
import FormInput from './subcomponents/FormInput/FormInput';
import styles from './Form.module.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

function Form({ type }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiRoot + '/' + type, {
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
    navigate('/home');
  };

  return (
    <form
      className={styles.form}
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
      {type === 'register' ? (
        <>
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
        </>
      ) : null}
      <FormInput type={'email'} id={'email'} name={'email'} label={'email'} />
      <FormInput
        type={'password'}
        id={'password'}
        name={'password'}
        label={'password'}
      />
      <button>submit</button>
    </form>
  );
}

Form.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Form;
