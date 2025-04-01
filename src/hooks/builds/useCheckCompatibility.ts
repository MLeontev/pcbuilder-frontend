import { useMutation } from '@tanstack/react-query';
import buildService from '../../services/buildService';
import { BuildComponentIds } from './../../types/builds/BuildComponentIds';

export function useCheckCompatibility() {
  const mutation = useMutation({
    mutationKey: ['checkCompatibility'],
    mutationFn: (components: BuildComponentIds) =>
      buildService.checkCompatibility(components),
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
}
