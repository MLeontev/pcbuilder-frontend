import { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort: (column: keyof T) => void;
  sortItem: keyof T;
  sortOrder: 'asc' | 'desc';
  onRowAction: (item: T) => void;
}

export default function Table<T extends {}>(props: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((column) => (
            <th
              key={column.accessor.toString()}
              onClick={() => column.sortable && props.onSort(column.accessor)}
            >
              {column.header}
              {column.sortable && props.sortItem === column.accessor && (
                <span>{props.sortOrder === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            {props.columns.map((column) => (
              <td key={column.accessor.toString()}>
                {item[column.accessor] as ReactNode}
              </td>
            ))}
            <td>
              <button onClick={() => props.onRowAction(item)}>Action</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
