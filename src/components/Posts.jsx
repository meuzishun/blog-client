const apiRoot = import.meta.env.VITE_API_ROOT;
import { useFetch } from '../hooks/useFetch';

export default function Posts() {
  const [data, error] = useFetch(apiRoot + '/posts', {});

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.posts.map((post) => {
        const formattedDate = new Date(post.timestamp)
          .toLocaleString()
          .split(',');
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className='details'>
              <p>
                {post.author.firstName} {post.author.lastName}
              </p>
              <p>{formattedDate[0]}</p>
              <p>{formattedDate[1]}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
