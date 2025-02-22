import React, { useState } from 'react';
import Sidebar from './Sidebar';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');

  const mockStats = {
    totalOrders: 156,
    pendingOrders: 23,
    totalRevenue: 45780,
    activeWorkers: 45
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all`}>
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              ☰
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                🔔
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  A
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-500 mt-1">Welcome back, Admin</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Orders" 
              value={mockStats.totalOrders} 
              icon="📦" 
            />
            <StatCard 
              title="Pending Orders" 
              value={mockStats.pendingOrders} 
              icon="⏳" 
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${mockStats.totalRevenue.toLocaleString()}`} 
              icon="💰" 
            />
            <StatCard 
              title="Active Workers" 
              value={mockStats.activeWorkers} 
              icon="👥" 
            />
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <p className="text-gray-500">
              Select a module from the sidebar to view detailed information.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dash;