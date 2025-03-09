interface PaginationProps {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='flex justify-center gap-3 mt-4'>
      <button
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
        className='px-3 py-1 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition'
      >
        Предыдущая
      </button>

      <span className='self-center'>
        Страница {page} из {totalPages}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        className='px-3 py-1 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition'
      >
        Следующая
      </button>
    </div>
  );
}
