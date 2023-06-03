import { useContext } from 'react';
import { UserContext } from '../App';
import Posts from '../components/Posts';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to the Blog{user ? `, ${user.firstName}...` : ''}</h1>
      <Posts />
    </div>
  );
}

export default Home;
