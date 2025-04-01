import { useMutation, useQueryClient } from '@tanstack/react-query';
import buildService from '../../services/buildService';
import { useBuildStore } from '../../store/buildStore';
import { SaveUpdateBuildRequest } from '../../types/builds/SaveUpdateBuildRequest';
import { getErrorMessage } from '../../utils/errorUtils';

export function useSaveBuild() {
  const queryClient = useQueryClient();
  const setBuildId = useBuildStore((state) => state.setBuildId);

  const mutation = useMutation({
    mutationKey: ['saveBuild'],
    mutationFn: (build: SaveUpdateBuildRequest) =>
      buildService.saveBuild(build),
    onSuccess: (response) => {
      const newBuildId = response.data;
      setBuildId(newBuildId);
      queryClient.invalidateQueries({ queryKey: ['builds'] });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    },
  });

  return { ...mutation };
}
