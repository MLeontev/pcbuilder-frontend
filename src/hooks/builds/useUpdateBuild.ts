import { useMutation, useQueryClient } from '@tanstack/react-query';
import buildService from '../../services/buildService';
import { SaveUpdateBuildRequest } from '../../types/builds/SaveUpdateBuildRequest';
import { getErrorMessage } from '../../utils/errorUtils';

export function useUpdateBuild() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateBuild'],
    mutationFn: (data: { buildId: number; build: SaveUpdateBuildRequest }) =>
      buildService.updateBuild(data.buildId, data.build),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    },
  });

  return { ...mutation };
}
