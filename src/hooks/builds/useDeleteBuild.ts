import { useMutation, useQueryClient } from '@tanstack/react-query';
import buildService from '../../services/buildService';
import { useBuildStore } from '../../store/buildStore';

export function useDeleteBuild() {
  const queryClient = useQueryClient();
  const buildId = useBuildStore((state) => state.buildId);
  const resetBuildId = useBuildStore((state) => state.resetBuildId);

  const mutation = useMutation({
    mutationKey: ['deleteBuild'],
    mutationFn: (id: number) => buildService.deleteBuild(id),
    onSuccess: (_, id: number) => {
      queryClient.invalidateQueries({ queryKey: ['builds'] });
      queryClient.removeQueries({ queryKey: ['build', id] });

      if (buildId === id) {
        resetBuildId();
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
