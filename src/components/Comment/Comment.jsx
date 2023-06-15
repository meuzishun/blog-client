import PropTypes from 'prop-types';
import styles from './Comment.module.css';

function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <p className={styles.name}>
        {comment.author.firstName} {comment.author.lastName}:
      </p>
      <p className={styles.content}>{comment.content}</p>
      <p className={styles.timestamp}>
        {new Date(comment.timestamp).toLocaleString()}
      </p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
