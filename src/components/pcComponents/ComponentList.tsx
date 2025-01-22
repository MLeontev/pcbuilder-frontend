import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useComponents } from '../../hooks/pcComponents/useComponents';

export default function ComponentList() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const searchQuery = searchParams.get('searchQuery') || '';

  const { data, isLoading, isError } = useComponents(category!, {
    page,
    pageSize,
    searchQuery,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <Navigate to='/404' />;
  }

  const updateSearchParams = (key: string, value: string | number) => {
    setSearchParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      searchParams.set(key, value.toString());
      return searchParams;
    });
  };

  return (
    <div>
      <h1>{category?.toUpperCase()} List</h1>

      <input
        type='text'
        placeholder='Поиск...'
        value={searchQuery}
        onChange={(e) => updateSearchParams('searchQuery', e.target.value)}
      />

      <select
        value={pageSize}
        onChange={(e) => updateSearchParams('pageSize', e.target.value)}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} на странице
          </option>
        ))}
      </select>

      <div>
        {data?.items.map((component) => (
          <div key={component.id}>
            <h2>{component.fullName}</h2>
            <p>{component.description}</p>
          </div>
        ))}
      </div>

      <p>
        Страница {data?.page} из {data?.totalPages}
      </p>

      <button
        disabled={!data?.hasPreviousPage}
        onClick={() => updateSearchParams('page', page - 1)}
      >
        Предыдущая
      </button>

      <button
        disabled={!data?.hasNextPage}
        onClick={() => updateSearchParams('page', page + 1)}
      >
        Следующая
      </button>
    </div>
  );
}
