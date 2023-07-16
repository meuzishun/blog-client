import { API_URI } from './api_uri';

export default async function getComments(postId) {
  const response = await fetch(API_URI + '/posts/' + postId + '/comments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });

  if (!response.ok) {
    console.log(response);
  }

  if (response.ok) {
    const data = await response.json();
    return data.comments;
  }
}
