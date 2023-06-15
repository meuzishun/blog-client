import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import styles from './Post.module.css';
import SinglePost from '../components/SinglePost/SinglePost';
import CommentList from '../components/CommentList/CommentList';
import CommentForm from '../components/CommentForm/CommentForm';

function Post() {
  const { user } = useContext(UserContext);
  const [showCommentForm, setShowCommentForm] = useState(false);
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
          {!showCommentForm ? (
            <button
              onClick={() => {
                setShowCommentForm(true);
              }}
            >
              Add a Comment
            </button>
          ) : (
            <CommentForm setShowCommentForm={setShowCommentForm} />
          )}
          <CommentList />
        </>
      )}
    </div>
  );
}

export default Post;
