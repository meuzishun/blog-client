// const API_URI = 'https://scary-train-deer.cyclic.app';
const API_URI = 'http://localhost:3000';

export async function getPosts() {
  const response = await fetch(API_URI + '/posts', {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  return response;
}

export async function getComments(postId) {
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

export async function submitComment(comment, postId) {
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
