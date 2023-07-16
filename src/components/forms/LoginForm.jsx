import { submitLogin } from '../../api/api';
import FormInput from './FormInput';
import Loading from '../../pages/Loading';
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef(null);

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setIsLoading(true);
    const response = await submitLogin(formState);

    if (!response.ok) {
      const data = await response.json();

      if ([401, 404].includes(response.status)) {
        setError(data.message);
      }

      if (response.status === 400) {
        setError(data.errors[0].msg);
      }

      setIsLoading(false);
      return;
    }

    const data = await response.json();
    const userString = JSON.stringify(data.user);
    localStorage.setItem('token', data.jwt.token);
    localStorage.setItem('user', userString);
    setUser(data.user);
    setError(null);
    setIsLoading(false);

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
    emailInputRef.current.focus();
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form
      className='form'
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
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
      {error ? <p className='error-msg'>{error}</p> : null}
    </form>
  );
}
