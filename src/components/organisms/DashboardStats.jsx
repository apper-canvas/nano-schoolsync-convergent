import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const DashboardStats = ({ stats, className }) => {
  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: 'Users',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Total Classes',
      value: stats?.totalClasses || 0,
      icon: 'BookOpen',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Today\'s Attendance',
      value: `${stats?.attendanceRate || 0}%`,
      icon: 'CheckCircle',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Active Announcements',
      value: stats?.activeAnnouncements || 0,
      icon: 'Megaphone',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {statCards.map((stat) => (
        <Card key={stat.title} className="overflow-hidden" hover>
          <div className={cn("h-2 bg-gradient-to-r", stat.color)}></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 font-display">
                  {stat.value}
                </p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center",
                stat.bgColor
              )}>
                <ApperIcon 
                  name={stat.icon} 
                  size={24} 
                  className="text-gray-700" 
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;