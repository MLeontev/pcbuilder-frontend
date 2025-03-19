import { useNavigate } from 'react-router-dom';
import { useBuilds } from '../../hooks/builds/useBuilds';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams';
import { useBuildStore } from '../../store/buildStore';
import PageSizeSelector from '../shared/PageSizeSelector';
import Pagination from '../shared/Pagination';
import SearchBar from '../shared/SearchBar';
import BuildListItem from './BuildListItem';

export default function BuildList() {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();
  const clearBuild = useBuildStore((state) => state.clearBuild);
  const navigate = useNavigate();

  const defaultParams = {
    page: '1',
    pageSize: '5',
    searchQuery: '',
  };

  const page = parseInt(searchParams.get('page') || defaultParams.page);
  const pageSize = parseInt(
    searchParams.get('pageSize') || defaultParams.pageSize
  );
  const searchQuery =
    searchParams.get('searchQuery') || defaultParams.searchQuery;

  const { data, isLoading, isError } = useBuilds({
    page,
    pageSize,
    searchQuery,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div className='text-center text-xl'>Не удалось загрузить сборки</div>
    );
  }

  const handleNewBuild = () => {
    if (
      window.confirm(
        'Ваша текущая сборка не будет сохранена автоматически. Вы уверены, что хотите начать новую сборку?'
      )
    ) {
      clearBuild();
      navigate('/build');
    }
  };

  return (
    <div className='w-3/4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center mt-3 mb-6'>
        Сохраненные сборки
      </h1>

      <div className='flex items-center justify-between mb-3'>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(value) => updateSearchParams({ searchQuery: value })}
        />
        <div className='flex items-center gap-4'>
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={(value) => {
              updateSearchParams({ pageSize: value, page: '1' });
            }}
          />
          <button
            onClick={handleNewBuild}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
          >
            Начать новую сборку
          </button>
        </div>
      </div>

      <div>
        {data?.items.length === 0 ? (
          <div className='text-center text-xl'>Сборки не найдены</div>
        ) : (
          <>
            {data?.items.map((build) => (
              <BuildListItem key={build.id} build={build} />
            ))}
            <Pagination
              page={data?.page!}
              totalPages={data?.totalPages!}
              hasPreviousPage={data?.hasPreviousPage!}
              hasNextPage={data?.hasNextPage!}
              onPageChange={(newPage) => updateSearchParams({ page: newPage })}
            />
          </>
        )}
      </div>
    </div>
  );
}
