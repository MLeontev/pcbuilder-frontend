import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { componentCategories } from '../constants/componentCategories';
import { useCheckAuth } from '../hooks/auth/useCheckAuth';
import { useLogout } from '../hooks/auth/useLogout';
import { useAuthStore } from '../store/authStore';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import BuildPage from './pcBuild/BuildPage';
import ComponentList from './pcComponents/ComponentList';
import ComponentPage from './pcComponents/ComponentPage';

export default function AppRouter() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const { mutate: logout } = useLogout();
  const { status, data, isLoading } = useCheckAuth();

  useEffect(() => {
    if (status === 'success') {
      const authData = data;
      setAuthData(authData);
    }
  }, [status, data]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Routes>
      {!isAuth ? (
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>
      ) : (
        <Route
          path='/'
          element={
            <div>
              <h1>Пользователь авторизован {user?.userName}</h1>
              <button onClick={() => logout()}>Выйти</button>
            </div>
          }
        />
      )}
      <Route path='/' element={<MainLayout />}>
        {componentCategories.map(({ category, path, title }) => (
          <Route
            key={path}
            path={path}
            element={<ComponentList category={category} title={title} />}
          />
        ))}
        <Route path='/:category/:id' element={<ComponentPage />} />
        <Route path='/build' element={<BuildPage />} />
        <Route path='/404' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function NotFoundPage() {
  return <h1>404 — Страница не найдена</h1>;
}
