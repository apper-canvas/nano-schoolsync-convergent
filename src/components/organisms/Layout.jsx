import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;