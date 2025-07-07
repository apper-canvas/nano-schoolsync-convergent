import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          {...props}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              if (onSearch) onSearch('');
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={16} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;