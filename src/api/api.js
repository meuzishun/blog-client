// Cyclic
// const API_URI = 'https://scary-train-deer.cyclic.app';

// Adaptable
// const API_URI = 'https://youre-gonna-make-me-blog.adaptable.app';

// Railway
const API_URI = 'https://blog-api-production-e6c1.up.railway.app/';

// For development
// export const API_URI = 'http://localhost:3000';

export async function getPosts() {
  const response = await fetch(API_URI + '/posts', {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  return response;
}

export async function getPost(postId) {
  const response = await fetch(API_URI + '/posts/' + postId, {
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

  return response;
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

export async function submitLogin(formData) {
  const response = await fetch(API_URI + '/' + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return response;
}

export async function submitRegister(formData) {
  const response = await fetch(API_URI + '/' + 'register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return response;
}

export async function getUser(token) {
  const response = await fetch(API_URI + '/profile', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  return response;
}
