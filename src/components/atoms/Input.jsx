import React from 'react';
import { cn } from '@/utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type = 'text', 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-lg text-sm placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-gray-300 focus:border-primary focus:ring-primary/20 bg-white",
    error: "border-error focus:border-error focus:ring-error/20 bg-red-50"
  };

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;