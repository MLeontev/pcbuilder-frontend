import { keepPreviousData, useQuery } from '@tanstack/react-query';
import componentService from '../../services/componentService';
import { BuildComponentIds } from '../../types/builds/BuildComponentIds';
import { GetComponentsRequest } from '../../types/pcComponents/GetComponentsRequest';

export function useCompatibleComponents(
  category: string,
  request: GetComponentsRequest,
  buildComponentIds: BuildComponentIds
) {
  const query = useQuery({
    queryKey: ['compatible-components', category, request, buildComponentIds],
    queryFn: () =>
      componentService.getCompatibleComponents(
        category,
        request,
        buildComponentIds
      ),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    retry: false,
  });

  return { ...query };
}
