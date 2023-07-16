import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import NewCommentForm from '../forms/NewCommentForm';
import { getComments, submitComment } from '../../api/api';

export default function CommentsContainer() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const loadComments = async () => {
    setError(null);
    setIsLoading(true);
    const response = await getComments(params.postId);

    if (!response.ok) {
      setError(response.statusText);
      setIsLoading(false);
    } else {
      const data = await response.json();
      setComments(data.comments);
      setError(null);
      setIsLoading(false);
    }
  };

  const handleAddCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await submitComment(
      {
        content: e.target.comment.value,
      },
      params.postId
    );

    if (!response.ok) {
      console.log(response);
    } else {
      loadComments();
      setShowCommentForm(false);
    }
  };

  const handleCommentCancel = () => {
    setShowCommentForm(false);
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      {!showCommentForm ? (
        <button onClick={handleAddCommentClick} className='add-comment-btn'>
          Add a Comment
        </button>
      ) : (
        <NewCommentForm
          handleCommentSubmit={handleCommentSubmit}
          handleCommentCancel={handleCommentCancel}
        />
      )}
      <CommentList error={error} isLoading={isLoading} comments={comments} />
    </>
  );
}
