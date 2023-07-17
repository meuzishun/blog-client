import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

export default function NewCommentForm({
  handleCommentSubmit,
  handleCommentCancel,
  isSubmitting,
  submitError,
}) {
  const commentInput = useRef(null);

  useEffect(() => {
    if (commentInput.current) {
      commentInput.current.focus();
    }
  }, []);

  return (
    <form className='commentForm' onSubmit={handleCommentSubmit}>
      <textarea
        type='text'
        placeholder='type a comment'
        id='comment'
        name='comment'
        rows='5'
        ref={commentInput}
      ></textarea>
      {submitError ? (
        <p className='error-msg'>Submission error: {submitError}</p>
      ) : null}
      <button type='submit' className='submitBtn'>
        submit
      </button>
      <button className='cancelBtn' onClick={handleCommentCancel}>
        cancel
      </button>
      {isSubmitting ? <p className='submitting-msg'>Submitting...</p> : null}
    </form>
  );
}

NewCommentForm.propTypes = {
  handleCommentSubmit: PropTypes.func,
  handleCommentCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
  submitError: PropTypes.string,
};
