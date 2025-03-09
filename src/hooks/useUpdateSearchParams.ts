import { useSearchParams } from 'react-router-dom';

export function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (
    key: string,
    value: string | number | boolean
  ) => {
    setSearchParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      searchParams.set(key, value.toString());
      return searchParams;
    });
  };

  return { searchParams, updateSearchParams };
}
