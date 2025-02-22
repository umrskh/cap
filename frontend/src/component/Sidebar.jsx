import { Link } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen, activeModule, setActiveModule }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'labour', label: 'Labour Management', icon: '👥' },
    { id: 'customers', label: 'Customer Management', icon: '🤝' },
    { id: 'materials', label: 'Material Management', icon: '📦' },
    { id: 'costs', label: 'Cost Calculation', icon: '🧮' },
    { id: 'billing', label: 'Billing & Payments', icon: '💳' },
    { id: 'production', label: 'Production & Orders', icon: '🏭' },
    { id: 'analytics', label: 'Analytics & Reports', icon: '📈' }
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } bg-white border-r border-gray-200 w-64`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Cap Factory</h1>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
      <nav className="p-4 space-y-1">
        {navigationItems.map(item => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            onClick={() => setActiveModule(item.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
              activeModule === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;