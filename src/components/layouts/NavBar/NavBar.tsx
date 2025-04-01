import AuthButtons from './AuthButtons';
import NavLinks from './NavLinks';

export default function NavBar() {
  return (
    <nav className='bg-gray-900 text-white p-5 shadow-md flex justify-between items-center'>
      <NavLinks />
      <AuthButtons />
    </nav>
  );
}
