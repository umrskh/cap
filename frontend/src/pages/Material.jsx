import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { 
  Bell, TrendingUp, Package, AlertTriangle, 
  Download, Printer, Settings, BarChart2 
} from 'lucide-react';

const Material = () => {
  const [activeTab, setActiveTab] = useState('stock');
  const [timeRange, setTimeRange] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [thresholds, setThresholds] = useState({});

  const stockData = [
    { id: 1, name: 'Plane Cap', quantity: 450, reorderLevel: 50, orderCount: 1200 },
    { id: 2, name: 'Dabba Cap', quantity: 320, reorderLevel: 40, orderCount: 800 },
    { id: 3, name: 'Net Cap', quantity: 280, reorderLevel: 45, orderCount: 950 },
    { id: 4, name: 'Puma Cap', quantity: 180, reorderLevel: 30, orderCount: 600 }
  ];

  const getTrendingCaps = () => {
    return stockData.sort((a, b) => b.orderCount - a.orderCount).slice(0, 3);
  };

  const updateThreshold = (capType, value) => {
    setThresholds(prev => ({
      ...prev,
      [capType]: value
    }));
  };

  const StockOverview = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Stock Overview</h2>
        <select 
          className="p-2 border rounded-lg bg-white"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-600">Total Stock</h3>
            <Package className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">12,450</p>
          <p className="text-sm text-blue-600 mt-1">Caps in inventory</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-green-600">Most Ordered</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">Plane Cap</p>
          <p className="text-sm text-green-600 mt-1">3,240 orders this month</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-purple-600">Low Stock</h3>
            <AlertTriangle className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-purple-700 mt-2">2 Items</p>
          <p className="text-sm text-purple-600 mt-1">Below reorder level</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-orange-600">Trending</h3>
            <BarChart2 className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">Net Cap</p>
          <p className="text-sm text-orange-600 mt-1">+45% this week</p>
        </div>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Cap Type</th>
              <th className="p-4 text-left">Current Stock</th>
              <th className="p-4 text-left">Reorder Level</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {getTrendingCaps().map(cap => (
              <tr key={cap.id} className="border-t">
                <td className="p-4">{cap.name}</td>
                <td className="p-4">{cap.quantity}</td>
                <td className="p-4">{cap.reorderLevel}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    cap.quantity > cap.reorderLevel 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {cap.quantity > cap.reorderLevel ? 'In Stock' : 'Low Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UsageCalculation = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-6">Production Records</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Download size={20} />
          Export Records
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <Printer size={20} />
          Print Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Worker</th>
              <th className="p-4 text-left">Cap Type</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Bill Number</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">John Doe</td>
              <td className="p-4">Plane Cap</td>
              <td className="p-4">24</td>
              <td className="p-4">10:30 AM</td>
              <td className="p-4">#BILL001</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const ReorderAlerts = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reorder Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Settings size={20} />
          Configure Alerts
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-1" size={20} />
          <div>
            <p className="text-red-700">Plane Cap stock is below threshold (20 remaining, threshold: 50)</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Reorder Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>Plane Cap</span>
              <input
                type="number"
                className="w-24 p-1 border rounded bg-white"
                value={thresholds['plane'] || 50}
                onChange={(e) => updateThreshold('plane', e.target.value)}
              />
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div className="h-2 bg-blue-500 rounded w-3/5"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Alert History</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Low stock alert: Plane Cap</p>
              <p className="text-sm text-gray-500">Today at 10:30 AM</p>
            </div>
            <Bell size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Material Management</h1>
      </div>

      <div className="flex gap-4 mb-6">
        {[
          { id: 'stock', label: 'Stock Overview' },
          { id: 'usage', label: 'Usage Calculation' },
          { id: 'alerts', label: 'Reorder Alerts' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'stock' && <StockOverview />}
      {activeTab === 'usage' && <UsageCalculation />}
      {activeTab === 'alerts' && <ReorderAlerts />}
    </div>
  );
};

export default Material;