import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import CommentsContainer from '../../components/comments/CommentsContainer';
import { getPost } from '../../api/api';

export default function PostDetails() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadPost = async () => {
    setError(null);
    setIsLoading(true);
    const response = await getPost(params.postId);

    if (!response.ok) {
      setError(response.statusText);
      setIsLoading(false);
    } else {
      const data = await response.json();
      setPost(data.post);
      setError(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  const handleLoginClick = () => {
    navigate(`/login?from=/posts/${params.postId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!post ? null : (
        <div className='singlePost'>
          <h2>{post.title}</h2>
          <div className='details'>
            <p>
              by {post.author.firstName} {post.author.lastName}
            </p>
            <p>{new Date(post.timestamp).toLocaleString()}</p>
          </div>
          <p>{post.content}</p>
          {!user ? (
            <button className='login-btn' onClick={handleLoginClick}>
              Login to leave a comment
            </button>
          ) : (
            <CommentsContainer />
          )}
        </div>
      )}
    </>
  );
}
