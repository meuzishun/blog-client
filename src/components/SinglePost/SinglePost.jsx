const apiRoot = import.meta.env.VITE_API_ROOT;
import styles from './SinglePost.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

function SinglePost() {
  const params = useParams();
  const [data, error] = useFetch(apiRoot + '/posts/' + params.postId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.singlePost}>
      <h2>{data.post.title}</h2>
      <div className={styles.details}>
        <p>
          by {data.post.author.firstName} {data.post.author.lastName}
        </p>
        <p>{new Date(data.post.timestamp).toLocaleString()}</p>
      </div>
      <p>{data.post.content}</p>
    </div>
  );
}

export default SinglePost;
