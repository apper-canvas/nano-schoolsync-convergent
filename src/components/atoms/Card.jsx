import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className, 
  variant = 'default',
  hover = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg transition-all duration-200";
  
  const variants = {
    default: "card-shadow border border-gray-100",
    elevated: "shadow-lg border border-gray-100",
    outline: "border border-gray-200",
    gradient: "bg-gradient-to-br from-white to-gray-50 card-shadow border border-gray-100"
  };

  const hoverEffect = hover ? "hover:card-shadow-hover hover:scale-[1.02] cursor-pointer" : "";

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverEffect,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;