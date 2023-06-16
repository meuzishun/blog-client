import PropTypes from 'prop-types';
import styles from './PostPreview.module.css';
import { Link } from 'react-router-dom';

function PostPreview({ post }) {
  const formattedDate = new Date(post.timestamp).toLocaleString().split(',');

  if (!post) {
    return null;
  }

  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <div className={styles.details}>
        <p>
          by {post.author.firstName} {post.author.lastName}
        </p>
        <p>
          {formattedDate[0]}, {formattedDate[1]}
        </p>
      </div>
      <p>{post.content}</p>
      <Link to={'/post/' + post._id}>Continue reading</Link>
    </div>
  );
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostPreview;
