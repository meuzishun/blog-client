import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className='root-layout'>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
