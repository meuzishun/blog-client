const apiRoot = import.meta.env.VITE_API_ROOT;
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import styles from './Post.module.css';

function Post() {
  const params = useParams();
  const [data, error] = useFetch(apiRoot + '/posts/' + params.postId, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  const formattedDate = new Date(data.post.timestamp)
    .toLocaleString()
    .split(',');

  return (
    <div className={styles.post}>
      <h2>{data.post.title}</h2>
      <div className={styles.details}>
        <p>
          by {data.post.author.firstName} {data.post.author.lastName}
        </p>
        <p>
          {formattedDate[0]}, {formattedDate[1]}
        </p>
      </div>
      <p>{data.post.content}</p>
      {data.user ? (
        <button>Comment</button>
      ) : (
        <button>Login to leave a comment</button>
      )}
    </div>
  );
}

export default Post;
