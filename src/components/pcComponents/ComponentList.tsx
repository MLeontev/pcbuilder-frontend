import { Navigate, useSearchParams } from 'react-router-dom';
import { useCompatibleComponents } from '../../hooks/pcComponents/useCompatibleComponents';
import { useComponents } from '../../hooks/pcComponents/useComponents';
import { useBuildStore } from '../../store/buildStore';
import ComponentListItem from './ComponentListItem';

interface ComponentListProps {
  category: string;
  title: string;
}

export default function ComponentList({ category, title }: ComponentListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedComponents = useBuildStore((state) => state.selectedComponents);

  const defaultParams = {
    page: '1',
    pageSize: '10',
    searchQuery: '',
    onlyCompatible: 'false',
  };

  const page = parseInt(searchParams.get('page') || defaultParams.page);
  const pageSize = parseInt(
    searchParams.get('pageSize') || defaultParams.pageSize
  );
  const searchQuery =
    searchParams.get('searchQuery') || defaultParams.searchQuery;
  const onlyCompatible = searchParams.get('onlyCompatible') === 'true' || false;

  const { data, isLoading, isError } = onlyCompatible
    ? useCompatibleComponents(
        category,
        { page, pageSize, searchQuery },
        selectedComponents
      )
    : useComponents(category, { page, pageSize, searchQuery });
  console.log(data);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <Navigate to='/404' />;
  }

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

  return (
    <div className='w-3/4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center mt-3 mb-6'>{title}</h1>

      <div className='flex items-center justify-between mb-3'>
        <input
          type='text'
          placeholder='Поиск...'
          value={searchQuery}
          onChange={(e) => updateSearchParams('searchQuery', e.target.value)}
          className='p-2 w-1/3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-1'
        />

        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={onlyCompatible}
              onChange={() =>
                updateSearchParams('onlyCompatible', !onlyCompatible)
              }
              className='w-4 h-4'
            />
            <span>Только совместимые со сборкой</span>
          </label>

          <select
            value={pageSize}
            onChange={(e) => updateSearchParams('pageSize', e.target.value)}
            className='border border-gray-300 rounded-lg shadow-md p-2 focus:ring-1'
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} на странице
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {data?.items.length === 0 ? (
          <div className='text-center text-xl'>Комплектующих не найдено</div>
        ) : (
          <>
            {data?.items.map((component) => (
              <ComponentListItem
                key={component.id}
                component={component}
                category={category}
              />
            ))}
            <div className='flex justify-center gap-3 mt-4'>
              <button
                disabled={!data?.hasPreviousPage}
                onClick={() => updateSearchParams('page', page - 1)}
                className='px-3 py-1 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition'
              >
                Предыдущая
              </button>

              <span className='self-center'>
                Страница {data?.page} из {data?.totalPages}
              </span>

              <button
                disabled={!data?.hasNextPage}
                onClick={() => updateSearchParams('page', page + 1)}
                className='px-3 py-1 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition'
              >
                Следующая
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
