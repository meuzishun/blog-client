import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import NewCommentForm from '../forms/NewCommentForm';
import { getComments, submitComment } from '../../api/api';

const initialCommentsState = {
  isLoading: false,
  isSubmitting: false,
  loadError: null,
  submitError: null,
  comments: [],
  showCommentForm: false,
};

function commentsReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'loadError':
      return {
        ...state,
        loadError: action.loadError,
        isLoading: false,
      };
    case 'loadSuccess':
      return {
        ...state,
        loadError: null,
        isLoading: false,
        comments: action.comments,
      };
    case 'draft':
      return {
        ...state,
        showCommentForm: true,
      };
    case 'cancel':
      return {
        ...state,
        showCommentForm: false,
      };
    case 'submitting':
      return {
        ...state,
        isSubmitting: true,
        submitError: null,
      };
    case 'submitError':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.submitError,
      };
    case 'submitSuccess':
      return {
        ...state,
        isSubmitting: false,
        submitError: null,
        showCommentForm: false,
      };
    default:
      return initialCommentsState;
  }
}

export default function CommentsContainer() {
  const params = useParams();
  const [state, dispatch] = useReducer(commentsReducer, initialCommentsState);

  const loadComments = async () => {
    dispatch({ type: 'loading' });
    const response = await getComments(params.postId);

    if (!response.ok) {
      dispatch({ type: 'loadError', loadError: response.statusText });
    } else {
      const data = await response.json();
      dispatch({ type: 'loadSuccess', comments: data.comments });
    }
  };

  const handleAddCommentClick = () => {
    dispatch({ type: 'draft' });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'submitting' });
    const response = await submitComment(
      {
        content: e.target.comment.value,
      },
      params.postId
    );

    if (!response.ok) {
      dispatch({ type: 'submitError', submitError: response.statusText });
    } else {
      dispatch({ type: 'submitSuccess' });
      loadComments();
    }
  };

  const handleCommentCancel = () => {
    dispatch({ type: 'cancel' });
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      {!state.showCommentForm ? (
        <button onClick={handleAddCommentClick} className='add-comment-btn'>
          Add a Comment
        </button>
      ) : (
        <NewCommentForm
          handleCommentSubmit={handleCommentSubmit}
          handleCommentCancel={handleCommentCancel}
          isSubmitting={state.isSubmitting}
          submitError={state.submitError}
        />
      )}
      <CommentList
        isLoading={state.isLoading}
        loadError={state.loadError}
        comments={state.comments}
      />
    </>
  );
}
