import { useMutation } from '@tanstack/react-query';
import AuthService from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export function useLogin() {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: { username: string; password: string }) =>
      AuthService.login(credentials.username, credentials.password),

    onSuccess: (response) => {
      const authData = response.data;
      setAuthData(authData);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
}
