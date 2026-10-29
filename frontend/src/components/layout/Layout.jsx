import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useFleet } from '../../context/FleetContext';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7FB]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
