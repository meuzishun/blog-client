import { useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import CommentsContainer from '../../components/comments/CommentsContainer';
import { getPost } from '../../api/api';
import Loading from '../Loading';
import Error from '../Error';

const initialPostState = {
  isLoading: false,
  error: null,
  post: null,
};

function postReducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return {
        error: null,
        isLoading: true,
        post: null,
      };
    case 'error':
      return {
        error: action.error,
        isLoading: false,
        post: null,
      };
    case 'success':
      return {
        error: null,
        isLoading: false,
        post: action.post,
      };
    default:
      return initialPostState;
  }
}

export default function PostDetails() {
  const { user, checkToken } = useContext(UserContext);
  const params = useParams();
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const navigate = useNavigate();

  const loadPost = async () => {
    dispatch({ type: 'initialize' });
    const response = await getPost(params.postId);

    if (!response.ok) {
      dispatch({ type: 'error', error: response.statusText });
    } else {
      const data = await response.json();
      dispatch({ type: 'success', post: data.post });
    }
  };

  useEffect(() => {
    loadPost();
    checkToken();
  }, []);

  const handleLoginClick = () => {
    navigate(`/login?from=/posts/${params.postId}`);
  };

  if (state.error) {
    return <Error error={state.error} />;
  }

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.post) {
    const { title, author, timestamp, content } = state.post;
    return (
      <div className='singlePost'>
        <h2>{title}</h2>
        <div className='details'>
          <p>
            by {author.firstName} {author.lastName}
          </p>
          <p>{new Date(timestamp).toLocaleString()}</p>
        </div>
        <p>{content}</p>
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
}
