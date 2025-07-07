import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const AnnouncementList = ({ 
  announcements, 
  onEdit, 
  onDelete,
  className 
}) => {
  const getAudienceBadgeVariant = (audience) => {
    const variants = {
      all: 'primary',
      teachers: 'secondary',
      students: 'success',
      parents: 'warning',
      class: 'info'
    };
    return variants[audience] || 'default';
  };

  return (
    <div className={cn("space-y-4", className)}>
      {announcements.map((announcement) => (
        <Card key={announcement.Id} className="overflow-hidden" hover>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-display font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                  <Badge variant={getAudienceBadgeVariant(announcement.targetAudience)}>
                    {announcement.targetAudience.charAt(0).toUpperCase() + announcement.targetAudience.slice(1)}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {announcement.content}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Calendar" size={16} />
                    <span>
                      {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="User" size={16} />
                    <span>Admin</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Edit"
                  onClick={() => onEdit(announcement)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Trash2"
                  onClick={() => onDelete(announcement)}
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementList;