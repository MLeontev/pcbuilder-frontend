import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export function useRegister() {
  const navigate = useNavigate();
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
      navigate('/');
      setAuthData(authData);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
