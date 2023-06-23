import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div className='comment'>
      <p className='name'>
        {comment.author.firstName} {comment.author.lastName}
      </p>
      <p className='content'>{comment.content}</p>
      <p className='timestamp'>
        {new Date(comment.timestamp).toLocaleString()}
      </p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
