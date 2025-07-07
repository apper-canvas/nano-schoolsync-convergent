import React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No data found", 
  message = "There's nothing here yet. Get started by adding some data.", 
  icon = "Inbox",
  actionLabel,
  onAction,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onAction && actionLabel && (
        <Button
          variant="primary"
          onClick={onAction}
          icon="Plus"
          className="shadow-lg hover:shadow-xl"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;