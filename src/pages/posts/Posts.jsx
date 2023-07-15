import { API_URI } from '../../api_uri';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Posts() {
  // TODO: replace this...
  const [data, error] = useFetch(API_URI + '/posts', {
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
    <div className='posts'>
      {data.posts.map((post) => {
        const formattedDate = new Date(post.timestamp)
          .toLocaleString()
          .split(',');

        return (
          <Link to={post._id} key={post._id}>
            <div className='post'>
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
              <p className='continue'>Continue reading</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
