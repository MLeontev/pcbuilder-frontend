import { useMutation } from '@tanstack/react-query';
import AuthService from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useBuildStore } from '../../store/buildStore';

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const clearBuild = useBuildStore((state) => state.clearBuild);

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.logout,

    onSuccess: () => {
      logout();
      clearBuild();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
