import { useQuery } from '@tanstack/react-query';
import buildService from '../../services/buildService';

export function useBuild(id: number) {
  const query = useQuery({
    queryKey: ['build', id],
    queryFn: () => buildService.getBuildById(id),
    select: (data) => data.data,
    enabled: false,
    retry: false,
  });

  return { ...query };
}
