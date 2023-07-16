import { useEffect, useState } from 'react';
import { getPosts } from '../../api/api';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    setIsLoading(true);
    const response = await getPosts();

    if (!response.ok) {
      setError(response.statusText);
    } else {
      const data = await response.json();
      setError(null);
      setIsLoading(false);
      setPosts(data.posts);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='posts'>
      {posts.map((post) => {
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
