import { useCallback } from 'react';
import { Tag } from '../tag';
import { ColumnDefinition, RowDefinition, RowValue } from './types';

interface TableProps {
  columns: ColumnDefinition[];
  data: RowDefinition[];
}

export const Table = ({ columns, data }: TableProps) => {
  const renderCell = useCallback((value: RowValue) => {
    // When data is array, render as tags
    if (Array.isArray(value)) {
      return (
        <div className="flex gap-3 flex-wrap">
          {value.map((v) => (
            <Tag key={v.id} color={v.color}>
              {v.label}
            </Tag>
          ))}
        </div>
      );
    }

    // When data is date, render date
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    return value;
  }, []);

  return (
    <div className="relative overflow-x-auto border border-secondary-100 rounded-3xl">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase bg-secondary-950 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3"
                style={
                  column.maxWidth ? { maxWidth: column.maxWidth } : undefined
                }
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx} className="bg-white border-b border-secondary-100">
              {columns.map((column, idx) => {
                const value = d[column.key];
                if (idx === 0) {
                  return (
                    <th
                      key={column.key}
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                      style={
                        column.maxWidth
                          ? { maxWidth: column.maxWidth }
                          : undefined
                      }
                    >
                      {renderCell(value)}
                    </th>
                  );
                }
                return (
                  <td
                    key={column.key}
                    className="px-6 py-4"
                    style={
                      column.maxWidth
                        ? { maxWidth: column.maxWidth }
                        : undefined
                    }
                  >
                    {renderCell(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
