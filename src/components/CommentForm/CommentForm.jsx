import styles from './CommentForm.module.css';

function CommentForm() {
  return (
    <div className={styles.commentForm}>
      <input type='text' />
      <button>submit</button>
    </div>
  );
}

export default CommentForm;
