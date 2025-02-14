import { Link } from 'react-router-dom';
import { useLogout } from '../../../hooks/auth/useLogout';
import { useAuthStore } from '../../../store/authStore';

export default function AuthButtons() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();

  return (
    <div>
      {isAuth ? (
        <div className='flex items-center space-x-4'>
          <span>{user?.userName}</span>
          <button
            className='bg-red-500 px-4 py-1 rounded hover:bg-red-700'
            onClick={() => logout()}
          >
            Выход
          </button>
        </div>
      ) : (
        <div className='flex items-center space-x-4'>
          <Link
            to='/auth/login'
            className='bg-blue-500 px-4 py-1 rounded hover:bg-blue-700'
          >
            Вход
          </Link>
          <Link
            to='/auth/register'
            className='bg-green-500 px-4 py-1 rounded hover:bg-green-700'
          >
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
}
