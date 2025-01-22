import { useQuery } from '@tanstack/react-query';
import componentService from '../../services/componentService';

export function useComponent(getComponentProps: {
  id: number;
  category: string;
}) {
  const query = useQuery({
    queryKey: ['component', getComponentProps.id],
    queryFn: () =>
      componentService.getComponentById(
        getComponentProps.id,
        getComponentProps.category
      ),
    select: (data) => data.data,
    enabled: !!getComponentProps.id,
  });

  return { ...query };
}
