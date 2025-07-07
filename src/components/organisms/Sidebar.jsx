import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ isOpen, onClose, className }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/students', label: 'Students', icon: 'Users' },
    { path: '/classes', label: 'Classes', icon: 'BookOpen' },
    { path: '/attendance', label: 'Attendance', icon: 'CheckCircle' },
    { path: '/grades', label: 'Grades', icon: 'GraduationCap' },
    { path: '/announcements', label: 'Announcements', icon: 'Megaphone' },
    { path: '/schedule', label: 'Schedule', icon: 'Calendar' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          // Base styles
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out",
          // Mobile styles
          "lg:transform-none lg:static lg:z-auto",
          // Mobile visibility
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop visibility (always visible)
          "lg:translate-x-0",
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-display font-bold gradient-text">
              SchoolSync
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )
              }
            >
              <ApperIcon name={item.icon} size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;