const apiRoot = import.meta.env.VITE_API_ROOT;
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import { useState } from 'react';

function Form({ type }) {
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
    const json = await response.json();
    console.log(json);
  };

  return (
    <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
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
