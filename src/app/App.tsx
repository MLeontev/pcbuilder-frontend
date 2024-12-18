import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../components/AppRouter';

export function App() {
  // const isAuth = useAuthStore((state) => state.isAuth);
  // const user = useAuthStore((state) => state.user);
  // const setAuthData = useAuthStore((state) => state.setAuthData);

  // const { mutate: logout } = useLogout();
  // const { status, data, isLoading } = useCheckAuth();

  // useEffect(() => {
  //   if (status === 'success') {
  //     const authData = data;
  //     setAuthData(authData);
  //   }
  // }, [status, data]);

  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }

  // if (!isAuth) {
  //   return (
  //     <>
  //       <LoginForm />
  //       {/* <RegisterForm /> */}
  //     </>
  //   );
  // }

  // return (
  //   <div>
  //     <h1>Пользователь авторизован {user?.userName}</h1>
  //     <button onClick={() => logout()}>Выйти</button>
  //   </div>
  // );
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
