const apiRoot = import.meta.env.VITE_API_ROOT;
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Posts() {
  // TODO: replace this...
  const [data, error] = useFetch(apiRoot + '/posts');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='blogs'>
      {data.posts.map((post) => {
        const formattedDate = new Date(post.timestamp)
          .toLocaleString()
          .split(',');

        return (
          <div className='post' key={post.id}>
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
            <Link to={post._id}>Continue reading</Link>
          </div>
        );
      })}
    </div>
  );
}
