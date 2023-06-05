const apiRoot = import.meta.env.VITE_API_ROOT;
import styles from './Posts.module.css';
import { useFetch } from '../hooks/useFetch';

export default function Posts() {
  const [data, error] = useFetch(apiRoot + '/posts', {
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

  return (
    <div className={styles.posts}>
      {data.posts.map((post) => {
        const formattedDate = new Date(post.timestamp)
          .toLocaleString()
          .split(',');
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <div className='details'>
              <p>
                by {post.author.firstName} {post.author.lastName}
              </p>
              <p>
                {formattedDate[0]}, {formattedDate[1]}
              </p>
            </div>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
