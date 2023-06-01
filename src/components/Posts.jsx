import { useFetch } from '../hooks/useFetch';

export default function Posts() {
  const [data, error] = useFetch('http://localhost:3000/posts', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcxMGQwOTRmZWIzNDNlYzk4ZjFjM2YiLCJpYXQiOjE2ODU2MzYxMjMsImV4cCI6MTY4NTY0MzMyM30.ej1-shCWWG4JZoRTwhj5HUBNTxpwuNPfCyQ3XW6aidJa5FcbazQzyedWBhfaP3o3t1psYHyfWKH7pXMbgL21nxgqsdI45r4vZa7kE2za_UAvhxMjLn6HEpH4BuD-YTqLU3WL6XAXU2s3oykqWhQEmsXoAL18KJgboA_uFGesttrlOXoV7vyFNYYH7Hvjru9iZhZhP8snjlmFCQGmy8GHRo2GD3vr5sEKNQoUmhcTO14Y593XUvJh3b9JgQOUZc94F1zEMf78qutcB_MJG1vVJiVl4szwObaGwG0Hf2ax4vEP_uFqA7gJcSJVvhTORNlSPKwpib7AoYgY-GkXZSdBCMRtn21JCIuzUulw_QqzqTSGCYshoh3gW2ZqGe1Z-8WPD1zeMscKyViS7ubkHoktY87bCAolVN1zTpP9VxBsA6sD1tCxf_yCBJhLDow2W4VJ3SN1s2dup_NcYexsXNzEhc6rsk1MGajDgjKMfZS3MGjLvlIgTirSlvcJURz-GmXCq78UgaRc0UuJRV-13suzul1-zDzKs4fk5fKjk295j80fToAdwcxLHoEHIppbZKZbtNAQsOpf9eE25D_zfL4UXbrYieC9mgy-_v8Vj8sI0VzXZJOXDKit5jpjbOZkQyo_Eb-uDNj0laipC6GWX1iL20O_ryMi4_Cx-cL5UXkMLgg',
    },
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
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>{post.author}</p>
          <p>{post.timestamp}</p>
        </div>
      ))}
    </>
  );
}
