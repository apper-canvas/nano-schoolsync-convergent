import React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the data. Please try again.", 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" size={32} className="text-error" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          icon="RefreshCw"
          className="shadow-lg hover:shadow-xl"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;