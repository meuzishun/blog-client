import { useEffect, useReducer } from 'react';
import { getPosts } from '../../api/api';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Error from '../Error';

const initialPostsState = {
  isLoading: false,
  error: null,
  posts: [],
};

function postsReducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return {
        error: null,
        isLoading: true,
        posts: [],
      };
    case 'error':
      return {
        error: action.error,
        isLoading: false,
        posts: [],
      };
    case 'success':
      return {
        error: null,
        isLoading: false,
        posts: action.posts,
      };
    default:
      return initialPostsState;
  }
}

export default function Posts() {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);

  const loadPosts = async () => {
    dispatch({ type: 'initialize' });
    const response = await getPosts();

    if (!response.ok) {
      dispatch({ type: 'error', error: response.statusText });
    } else {
      const data = await response.json();
      dispatch({ type: 'success', posts: data.posts });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (state.error) {
    return <Error error={state.error} />;
  }

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <div className='posts'>
      {state.posts.map((post) => {
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
