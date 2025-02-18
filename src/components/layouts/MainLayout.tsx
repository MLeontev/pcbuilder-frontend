import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

export default function MainLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <main className='flex-grow container mx-auto'>
        <Outlet />
      </main>
    </div>
  );
}
