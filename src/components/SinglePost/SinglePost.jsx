import PropTypes from 'prop-types';
import styles from './SinglePost.module.css';

function SinglePost({ post }) {
  return (
    <div className={styles.singlePost}>
      <h2>{post.title}</h2>
      <div className={styles.details}>
        <p>
          by {post.author.firstName} {post.author.lastName}
        </p>
        <p>{new Date(post.timestamp).toLocaleString()}</p>
      </div>
      <p>{post.content}</p>
    </div>
  );
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default SinglePost;
