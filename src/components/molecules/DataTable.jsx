import React from 'react';
import { cn } from '@/utils/cn';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete,
  className,
  ...props 
}) => {
  const renderCellContent = (item, column) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    if (column.type === 'badge') {
      return <Badge variant={value}>{value}</Badge>;
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    return value;
  };

  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={item.Id || index}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {renderCellContent(item, column)}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Edit"
                        onClick={() => onEdit(item)}
                      />
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Trash2"
                        onClick={() => onDelete(item)}
                        className="text-error hover:text-error hover:bg-error/10"
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;