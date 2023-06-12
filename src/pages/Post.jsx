const apiRoot = import.meta.env.VITE_API_ROOT;
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { useFetch } from '../hooks/useFetch';
import styles from './Post.module.css';

function Post() {
  const [comments, setComments] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const [data, error] = useFetch(apiRoot + '/posts/' + params.postId, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  useEffect(() => {
    fetch(apiRoot + '/posts/' + params.postId + '/comments')
      .then((res) => {
        if (!res.ok) {
          throw Error('something wrong, could not connect to resource');
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setComments(json.comments);
      })
      .catch((error) => {
        console.warn(`Sorry an error occurred, due to ${error.message}`);
      });
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const formattedDate = new Date(data.post.timestamp)
    .toLocaleString()
    .split(',');

  return (
    <div className={styles.post}>
      <h2>{data.post.title}</h2>
      <div className={styles.details}>
        <p>
          by {data.post.author.firstName} {data.post.author.lastName}
        </p>
        <p>
          {formattedDate[0]}, {formattedDate[1]}
        </p>
      </div>
      <p>{data.post.content}</p>
      {user ? (
        <button>Comment</button>
      ) : (
        <button onClick={handleLoginClick}>Login to leave a comment</button>
      )}
      <div>
        {comments && comments.length > 0
          ? comments.map((comment) => {
              const formattedDate = new Date(comment.timestamp)
                .toLocaleString()
                .split(',');

              return (
                <div key={comment.id}>
                  <p>
                    {comment.author.firstName} {comment.author.lastName}:
                  </p>
                  <p>{comment.content}</p>
                  <p>
                    {formattedDate[0]}, {formattedDate[1]}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Post;
