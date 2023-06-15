import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import styles from './Post.module.css';
import SinglePost from '../components/SinglePost/SinglePost';
import CommentList from '../components/CommentList/CommentList';

function Post() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.post}>
      <SinglePost />
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
