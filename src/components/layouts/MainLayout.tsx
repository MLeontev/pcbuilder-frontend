import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

export default function MainLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <main className='flex-grow w-full mx-auto pb-5'>
        <Outlet />
      </main>
    </div>
  );
}
