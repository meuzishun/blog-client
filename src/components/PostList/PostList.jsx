const apiRoot = import.meta.env.VITE_API_ROOT;
import styles from './PostList.module.css';
import { useFetch } from '../../hooks/useFetch';
import PostPreview from './subcomponents/PostPreview';

function PostList() {
  const [data, error] = useFetch(apiRoot + '/posts');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.postList}>
      {data.posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
