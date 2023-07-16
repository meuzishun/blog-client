import PropTypes from 'prop-types';

export default function Error({ error }) {
  return (
    <div className='error-page'>
      <p>Error: {error}</p>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string,
};
