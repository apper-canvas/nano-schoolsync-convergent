import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-primary/20 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-purple-600 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-secondary/20 shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/20 bg-white hover:shadow-lg transform hover:scale-105",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-200",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-green-700 hover:to-green-800 focus:ring-success/20 shadow-lg hover:shadow-xl transform hover:scale-105",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-white hover:from-yellow-700 hover:to-yellow-800 focus:ring-warning/20 shadow-lg hover:shadow-xl transform hover:scale-105",
    error: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-700 hover:to-red-800 focus:ring-error/20 shadow-lg hover:shadow-xl transform hover:scale-105"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin mr-2" 
        />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className={cn("mr-2", children && "mr-2")} 
        />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className={cn("ml-2", children && "ml-2")} 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;