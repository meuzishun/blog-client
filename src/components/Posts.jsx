const apiRoot = import.meta.env.VITE_API_ROOT;
// const admin_auth = import.meta.env.VITE_TEST_ADMIN_AUTH;
import { useFetch } from '../hooks/useFetch';

export default function Posts() {
  const [data, error] = useFetch(apiRoot + '/posts', {
    // headers: {
    //   Authorization: 'Bearer ' + admin_auth,
    // },
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            {post.author.firstName} {post.author.lastName}
          </p>
          <p>{post.timestamp}</p>
        </div>
      ))}
    </>
  );
}
