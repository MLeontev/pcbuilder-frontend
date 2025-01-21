import { useQuery } from '@tanstack/react-query';
import componentService from '../../services/componentService';

export function useComponent(componentProps: { id: number; category: string }) {
  const query = useQuery({
    queryKey: ['component', componentProps.id],
    queryFn: () =>
      componentService.getComponentById(
        componentProps.id,
        componentProps.category
      ),
    select: (data) => data.data,
    enabled: !!componentProps.id,
  });

  return { ...query };
}
