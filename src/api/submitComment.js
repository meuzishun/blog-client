import { API_URI } from './api_uri';

export default async function submitComment(comment, postId) {
  const response = await fetch(API_URI + '/posts/' + postId + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(comment),
  });

  return response;
}
