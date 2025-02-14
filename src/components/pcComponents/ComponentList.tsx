import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useComponents } from '../../hooks/pcComponents/useComponents';
import { useBuildStore } from '../../store/buildStore';

interface ComponentListProps {
  category: string;
  title: string;
}

export default function ComponentList({ category, title }: ComponentListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultParams = {
    page: '1',
    pageSize: '10',
    searchQuery: '',
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (!newSearchParams.has(key)) {
        newSearchParams.set(key, value);
      }
    });

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const page = parseInt(searchParams.get('page') || defaultParams.page);
  const pageSize = parseInt(
    searchParams.get('pageSize') || defaultParams.pageSize
  );
  const searchQuery =
    searchParams.get('searchQuery') || defaultParams.searchQuery;

  const addComponent = useBuildStore((state) => state.addComponent);

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
      <h1>{title}</h1>

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
          <div
            className='max-w-xl border border-solid border-black p-1 m-1 cursor-pointer'
            key={component.id}
            onClick={() => navigate(`/${category}/${component.id}`)}
          >
            <h2>{component.fullName}</h2>
            <p>{component.description}</p>
            <button
              onClick={(event) => {
                event.stopPropagation();
                addComponent(category || '', component.id);
              }}
            >
              Добавить в сборку
            </button>
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
