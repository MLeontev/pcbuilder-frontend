import { useCompatibleComponents } from '../../hooks/pcComponents/useCompatibleComponents';
import { useComponents } from '../../hooks/pcComponents/useComponents';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams';
import { useBuildStore } from '../../store/buildStore';
import PageSizeSelector from '../shared/PageSizeSelector';
import Pagination from '../shared/Pagination';
import SearchBar from '../shared/SearchBar';
import ComponentListItem from './ComponentListItem';

interface ComponentListProps {
  category: string;
  title: string;
}

export default function ComponentList({ category, title }: ComponentListProps) {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();
  const selectedComponents = useBuildStore((state) => state.selectedComponents);

  const defaultParams = {
    page: '1',
    pageSize: '5',
    searchQuery: '',
    onlyCompatible: 'true',
  };

  const page = parseInt(searchParams.get('page') || defaultParams.page);
  const pageSize = parseInt(
    searchParams.get('pageSize') || defaultParams.pageSize
  );
  const searchQuery =
    searchParams.get('searchQuery') || defaultParams.searchQuery;
  const onlyCompatible = searchParams.get('onlyCompatible') !== 'false';

  const { data, isLoading, isError } = onlyCompatible
    ? useCompatibleComponents(
        category,
        { page, pageSize, searchQuery },
        selectedComponents
      )
    : useComponents(category, { page, pageSize, searchQuery });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div className='text-center text-xl'>
        Не удалось загрузить комплектующие
      </div>
    );
  }

  return (
    <div className='w-3/4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center mt-3 mb-6'>{title}</h1>

      <div className='flex items-center justify-between mb-3'>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(value) => updateSearchParams({ searchQuery: value })}
        />
        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={onlyCompatible}
              onChange={() =>
                updateSearchParams({ onlyCompatible: !onlyCompatible })
              }
              className='w-4 h-4'
            />
            <span>Показать только совместимые со сборкой</span>
          </label>

          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={(value) =>
              updateSearchParams({ pageSize: value, page: '1' })
            }
          />
        </div>
      </div>

      <div>
        {data?.items.length === 0 ? (
          <div className='text-center text-xl'>Комплектующие не найдены</div>
        ) : (
          <>
            {data?.items.map((component) => (
              <ComponentListItem
                key={component.id}
                component={component}
                category={category}
              />
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
