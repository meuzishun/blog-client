import { API_URI } from './api_uri';

export default async function getPosts() {
  const response = await fetch(API_URI + '/posts', {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  return response;
}
