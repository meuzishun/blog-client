const apiRoot = import.meta.env.VITE_API_ROOT;
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

function Form({ type }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});
  const firstNameInputRef = useRef(null);
  const emailInputRef = useRef(null);

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
    navigate(-1);
  };

  useEffect(() => {
    if (type === 'register' && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
    if (type === 'login' && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <form
      className='form'
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
            forwardedRef={firstNameInputRef}
          />
          <FormInput
            type={'text'}
            id={'lastName'}
            name={'lastName'}
            label={'last name'}
          />
        </>
      ) : null}
      <FormInput
        type={'email'}
        id={'email'}
        name={'email'}
        label={'email'}
        forwardedRef={emailInputRef}
      />
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
