import PropTypes from 'prop-types';
import styles from './FormInput.module.css';
import { useState } from 'react';

function FormInput({ type, id, name, label }) {
  const [inputState, setInputState] = useState('');

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  return (
    <div className={styles.formInput}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        defaultValue={inputState}
        onChange={handleInputChange}
      />
    </div>
  );
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormInput;