import { useSearchParams } from 'react-router-dom';

export function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (
    updates: Record<string, string | number | boolean>
  ) => {
    setSearchParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        searchParams.set(key, value.toString());
      });
      return searchParams;
    });
  };

  return { searchParams, updateSearchParams };
}
