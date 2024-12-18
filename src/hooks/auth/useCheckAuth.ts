import { useQuery } from '@tanstack/react-query';
import AuthService from '../../services/authService';

export function useCheckAuth() {
  const query = useQuery({
    queryKey: ['refresh'],
    queryFn: AuthService.refresh,
    select: (data) => data.data,
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });

  return { ...query };
}
