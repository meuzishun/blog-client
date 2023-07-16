import { API_URI } from '../../api/api_uri';
import { useFetch } from '../../hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import CommentsContainer from '../../components/comments/CommentsContainer';

export default function PostDetails() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [data, error] = useFetch(API_URI + '/posts/' + params.postId);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(`/login?from=/posts/${params.postId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='singlePost'>
      <h2>{data.post.title}</h2>
      <div className='details'>
        <p>
          by {data.post.author.firstName} {data.post.author.lastName}
        </p>
        <p>{new Date(data.post.timestamp).toLocaleString()}</p>
      </div>
      <p>{data.post.content}</p>
      {!user ? (
        <button className='login-btn' onClick={handleLoginClick}>
          Login to leave a comment
        </button>
      ) : (
        <CommentsContainer />
      )}
    </div>
  );
}
