const apiRoot = import.meta.env.VITE_API_ROOT;
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../App';
import styles from './Post.module.css';
import SinglePost from '../components/SinglePost/SinglePost';
import CommentList from '../components/CommentList/CommentList';

function Post() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const [data, error] = useFetch(apiRoot + '/posts/' + params.postId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.post}>
      <SinglePost post={data.post} />
      {!user ? (
        <button onClick={handleLoginClick}>Login to leave a comment</button>
      ) : (
        <>
          <button>Add a Comment</button>
          <CommentList />
        </>
      )}
    </div>
  );
}

export default Post;
