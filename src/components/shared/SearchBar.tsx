interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: SearchBarProps) {
  return (
    <input
      type='text'
      placeholder='Поиск...'
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className='p-2 w-1/3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-1'
    />
  );
}
