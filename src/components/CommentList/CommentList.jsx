const apiRoot = import.meta.env.VITE_API_ROOT;
import styles from './CommentList.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Comment from './subcomponents/Comment/Comment';

function CommentList() {
  const params = useParams();
  const [data, error] = useFetch(
    apiRoot + '/posts/' + params.postId + '/comments/',
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.commentList}>
      {data.comments.length < 1 ? (
        <p className={styles.firstCommentMessage}>Be the first to comment!</p>
      ) : (
        data.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}

export default CommentList;
