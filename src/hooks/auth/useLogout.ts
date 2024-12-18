import { useMutation } from '@tanstack/react-query';
import AuthService from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.logout,

    onSuccess: () => {
      logout();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
