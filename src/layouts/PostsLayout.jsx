import { Outlet } from 'react-router-dom';

export default function PostsLayout() {
  return (
    <div className='posts-layout'>
      <Outlet />
    </div>
  );
}
