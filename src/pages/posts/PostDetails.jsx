const apiRoot = import.meta.env.VITE_API_ROOT;
import { useFetch } from '../../hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../App';
import CommentList from '../../components/comments/CommentList';

export default function PostDetails() {
  const { user } = useContext(UserContext);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const params = useParams();
  const commentInput = useRef(null);
  const [data, error] = useFetch(apiRoot + '/posts/' + params.postId);
  const navigate = useNavigate();

  useEffect(() => {
    if (commentInput.current) {
      commentInput.current.focus();
    }
  }, [showCommentForm]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      content: e.target.comment.value,
    };

    const response = await fetch(
      apiRoot + '/posts/' + params.postId + '/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(comment),
      }
    );

    if (!response.ok) {
      console.log(response);
    }

    window.location.reload();
  };

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
        <>
          {!showCommentForm ? (
            <button
              onClick={() => {
                setShowCommentForm(true);
              }}
              className='add-comment-btn'
            >
              Add a Comment
            </button>
          ) : (
            <form className='commentForm' onSubmit={handleCommentSubmit}>
              <textarea
                type='text'
                placeholder='type a comment'
                id='comment'
                name='comment'
                rows='5'
                ref={commentInput}
              ></textarea>
              <button type='submit' className='submitBtn'>
                submit
              </button>
              <button
                className='cancelBtn'
                onClick={() => {
                  setShowCommentForm(false);
                }}
              >
                cancel
              </button>
            </form>
          )}
          <CommentList />
        </>
      )}
    </div>
  );
}
