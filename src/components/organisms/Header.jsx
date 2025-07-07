import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/utils/cn';
import { AuthContext } from '@/App';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ onMenuClick, className }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className={cn("bg-white border-b border-gray-200 px-4 py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden"
          />
          <div>
            <h2 className="text-lg font-display font-semibold text-gray-900">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
        </div>

<div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar
              placeholder="Search students, classes..."
              className="w-80"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            icon="Bell"
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            icon="Settings"
          />

          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex items-center space-x-3">
      {user && (
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.firstName?.charAt(0) || user.emailAddress?.charAt(0) || 'U'}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.firstName || user.emailAddress}
          </span>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        icon="LogOut"
        onClick={logout}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Logout
      </Button>
    </div>
  );
};
export default Header;