interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (value: number) => void;
}

export default function PageSizeSelector({
  pageSize,
  onPageSizeChange,
}: PageSizeSelectorProps) {
  return (
    <select
      value={pageSize}
      onChange={(e) => onPageSizeChange(Number(e.target.value))}
      className='border border-gray-300 rounded-lg shadow-md p-2 focus:ring-1'
    >
      {[5, 10, 20, 50].map((size) => (
        <option key={size} value={size}>
          {size} на странице
        </option>
      ))}
    </select>
  );
}
