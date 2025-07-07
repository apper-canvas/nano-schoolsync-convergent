import React from 'react';
import { cn } from '@/utils/cn';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const FormField = ({ 
  label, 
  type = 'text', 
  options = [], 
  error, 
  required = false,
  className,
  ...props 
}) => {
  const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <Select 
          id={fieldId}
          error={!!error}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input 
          id={fieldId}
          type={type}
          error={!!error}
          {...props}
        />
      )}
      
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;