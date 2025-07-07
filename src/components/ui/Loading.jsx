import React from 'react';
import { cn } from '@/utils/cn';

const Loading = ({ className, type = 'default' }) => {
  if (type === 'stats') {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="h-2 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-20"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-100", className)}>
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[...Array(4)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <span className="text-gray-600 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;