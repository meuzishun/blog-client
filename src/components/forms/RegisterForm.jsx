import { submitRegister } from '../../api/api';
import FormInput from './FormInput';
import { useContext, useRef, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: null,
  isLoading: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        isLoading: true,
      };
    case 'changeValue':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'error':
      return {
        ...state,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isLoading: false,
        error: action.error,
      };
    case 'success':
      return {
        ...state,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isLoading: false,
        error: null,
      };
    default:
      return initialFormState;
  }
}

export default function Form() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleFormChange = (e) => {
    dispatch({
      type: 'changeValue',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'submit' });
    const { firstName, lastName, email, password } = state;
    const response = await submitRegister({
      firstName,
      lastName,
      email,
      password,
    });
    const data = await response.json();

    if (!response.ok) {
      if ([401, 404].includes(response.status)) {
        dispatch({ type: 'error', error: data.message });
      }

      if (response.status === 400) {
        dispatch({ type: 'error', error: data.errors[0].msg });
      }
      return;
    }

    dispatch({ type: 'success' });
    const userString = JSON.stringify(data.user);
    localStorage.setItem('token', data.jwt.token);
    localStorage.setItem('user', userString);
    setUser(data.user);

    // Check if there is a "from" location in the search params
    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get('from');

    if (from) {
      // Redirect the user back to the "from" location
      navigate(from);
    } else {
      // Redirect the user to a default location
      navigate('/posts');
    }
  };

  useEffect(() => {
    firstNameInputRef.current.value = '';
    lastNameInputRef.current.value = '';
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    firstNameInputRef.current.focus();
  }, [state.error]);

  return (
    <form
      className='form'
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
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
        forwardedRef={lastNameInputRef}
      />
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
        forwardedRef={passwordInputRef}
      />
      {state.isLoading ? (
        <p className='loading-msg'>Loading...</p>
      ) : (
        <button>submit</button>
      )}
      {state.error ? <p className='error-msg'>{state.error}</p> : null}
    </form>
  );
}
