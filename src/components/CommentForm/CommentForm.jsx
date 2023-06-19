const apiRoot = import.meta.env.VITE_API_ROOT;
import styles from './CommentForm.module.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function CommentForm({ setShowCommentForm }) {
  const params = useParams();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      content: e.target.comment.value,
    };

    const response = await fetch(
      apiRoot + '/posts/' + params.postId + '/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(comment),
      }
    );

    if (!response.ok) {
      console.log(response);
    }

    window.location.reload();
  };

  return (
    <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
      <input
        type='text'
        placeholder='type a comment'
        id='comment'
        name='comment'
      />
      <button type='submit'>submit</button>
      <button
        onClick={() => {
          setShowCommentForm(false);
        }}
      >
        cancel
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  setShowCommentForm: PropTypes.func.isRequired,
};

export default CommentForm;