import styles from './CommentForm.module.css';
import PropTypes from 'prop-types';

function CommentForm({ setShowCommentForm }) {
  return (
    <div className={styles.commentForm}>
      <input type='text' placeholder='type a comment' />
      <button>submit</button>
      <button
        onClick={() => {
          setShowCommentForm(false);
        }}
      >
        cancel
      </button>
    </div>
  );
}

CommentForm.propTypes = {
  setShowCommentForm: PropTypes.func.isRequired,
};

export default CommentForm;
