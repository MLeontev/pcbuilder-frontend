import { useMutation } from '@tanstack/react-query';
import AuthService from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export function useRegister() {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (credentials: {
      username: string;
      password: string;
      confirmPassword: string;
    }) =>
      AuthService.register(
        credentials.username,
        credentials.password,
        credentials.confirmPassword
      ),

    onSuccess: (response) => {
      const authData = response.data;
      setAuthData(authData);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
