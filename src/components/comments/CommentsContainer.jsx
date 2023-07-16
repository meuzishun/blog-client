import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import NewCommentForm from '../forms/NewCommentForm';
import { getComments, submitComment } from '../../api/api';

export default function CommentsContainer() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const refreshComments = async () => {
    const data = await getComments(params.postId);
    setComments(data);
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
      refreshComments();
      setShowCommentForm(false);
    }
  };

  const handleCommentCancel = () => {
    setShowCommentForm(false);
  };

  useEffect(() => {
    refreshComments();
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
      <CommentList comments={comments} />
    </>
  );
}
