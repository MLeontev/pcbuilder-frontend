import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { componentCategories } from '../constants/componentCategories';
import { useCheckAuth } from '../hooks/auth/useCheckAuth';
import { useLogout } from '../hooks/auth/useLogout';
import { useAuthStore } from '../store/authStore';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import MainLayout from './layouts/MainLayout';
import BuildPage from './pcBuild/BuildPage';
import ComponentList from './pcComponents/ComponentList';
import ComponentPage from './pcComponents/ComponentPage';
import BuildList from './profile/BuildList';

export default function AppRouter() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setAuthData = useAuthStore((state) => state.setAuthData);

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
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Navigate to='/build' replace />} />
        {!isAuth ? (
          <>
            <Route path='login' element={<LoginForm />} />
            <Route path='register' element={<RegisterForm />} />
          </>
        ) : (
          <Route path='builds' element={<BuildList />} />
        )}
        {componentCategories.map(({ category, path, title }) => (
          <Route
            key={path}
            path={path}
            element={<ComponentList category={category} title={title} />}
          />
        ))}
        <Route path='/:category/:id' element={<ComponentPage />} />
        <Route path='/build' element={<BuildPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function NotFoundPage() {
  return <h1>404 — Страница не найдена</h1>;
}
