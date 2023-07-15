import { API_URI } from '../../api_uri';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

function CommentList() {
  const params = useParams();
  const [data, error] = useFetch(
    API_URI + '/posts/' + params.postId + '/comments/',
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='commentList'>
      {data.comments.length < 1 ? (
        <p className='firstCommentMessage'>Be the first to comment!</p>
      ) : (
        data.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}
    </div>
  );
}

export default CommentList;
