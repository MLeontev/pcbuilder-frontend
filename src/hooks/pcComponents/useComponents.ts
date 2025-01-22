import { keepPreviousData, useQuery } from '@tanstack/react-query';
import componentService from '../../services/componentService';
import { GetComponentsRequest } from '../../types/pcComponents/GetComponentsRequest';

export function useComponents(category: string, request: GetComponentsRequest) {
  const query = useQuery({
    queryKey: ['components', category, request],
    queryFn: () => componentService.getComponents(category, request),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  return { ...query };
}
