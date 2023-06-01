import { useState, useEffect } from 'react';

export function useFetch(url, opts) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url, opts)
      .then((res) => {
        if (!res.ok) {
          throw Error('something wrong, could not connect to resource');
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError('');
      })
      .catch((error) => {
        console.warn(`Sorry an error occurred, due to ${error.message}`);
        setData(null);
        setError(error.message);
      });
  }, [url]);
  return [data, error];
}
