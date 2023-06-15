const apiRoot = import.meta.env.VITE_API_ROOT;
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import styles from './Post.module.css';
import Comment from '../components/Comment/Comment';

function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  const getPost = async () => {
    const response = await fetch(apiRoot + '/posts/' + params.postId, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    setPost(data.post);
  };

  const getComments = async () => {
    const response = await fetch(
      apiRoot + '/posts/' + params.postId + '/comments',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const data = await response.json();
    setComments(data.comments);
  };

  useEffect(() => {
    getPost();
    if (user) {
      getComments();
    }
  }, [user]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return !post ? null : (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <div className={styles.details}>
        <p>
          by {post.author.firstName} {post.author.lastName}
        </p>
        <p>{new Date(post.timestamp).toLocaleString()}</p>
      </div>
      <p>{post.content}</p>
      {!user ? (
        <button onClick={handleLoginClick}>Login to leave a comment</button>
      ) : (
        <>
          <button>Add a Comment</button>
          <div>
            {comments && comments.length > 0
              ? comments.map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
