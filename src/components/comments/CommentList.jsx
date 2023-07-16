import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <div className='commentList'>
      {!comments || comments.length < 1 ? (
        <p className='firstCommentMessage'>Be the first to comment!</p>
      ) : (
        comments
          .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
          .map((comment) => <Comment key={comment._id} comment={comment} />)
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
};
