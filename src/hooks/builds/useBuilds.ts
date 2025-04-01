import { keepPreviousData, useQuery } from '@tanstack/react-query';
import buildService from '../../services/buildService';
import { GetBuildsRequest } from '../../types/builds/GetBuildsRequest';

export function useBuilds(request: GetBuildsRequest) {
  const query = useQuery({
    queryKey: ['builds', request],
    queryFn: () => buildService.getBuilds(request),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    retry: false,
  });

  return { ...query };
}
