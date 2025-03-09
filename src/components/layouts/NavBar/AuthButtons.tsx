import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../hooks/auth/useLogout';
import { useAuthStore } from '../../../store/authStore';

export default function AuthButtons() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  return (
    <div>
      {isAuth ? (
        <div className='flex items-center space-x-4'>
          <span
            className='font-semibold cursor-pointer'
            onClick={() => navigate('/builds')}
          >
            {user?.userName}
          </span>
          <button
            className='px-4 py-1 rounded-lg transition bg-gray-200 text-black hover:bg-gray-400 font-semibold'
            onClick={() => logout()}
          >
            Выход
          </button>
        </div>
      ) : (
        <div className='flex items-center space-x-2'>
          <Link
            to='/login'
            className='px-4 py-1 rounded-lg transition bg-gray-200 text-black hover:bg-gray-400 font-semibold'
          >
            Вход
          </Link>
          <Link
            to='/register'
            className='px-4 py-1 rounded-lg transition bg-gray-200 text-black hover:bg-gray-400 font-semibold'
          >
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
}
