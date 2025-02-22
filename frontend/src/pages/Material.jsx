import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { 
  Bell, TrendingUp, Package, AlertTriangle, 
  Download, Printer, Settings, BarChart2, PlusCircle 
} from 'lucide-react';

const Material = () => {
  const [activeTab, setActiveTab] = useState('stock');
  const [timeRange, setTimeRange] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [thresholds, setThresholds] = useState({});
  const [materials, setMaterials] = useState([]);

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

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMaterial = {
      id: Date.now(),
      name: formData.get('name'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
      date: formData.get('date')
    };
    setMaterials([...materials, newMaterial]);
    e.target.reset();
  };

  const StockOverview = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Stock Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Total Stock</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">12,450</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Most Ordered</h3>
          <p className="text-2xl font-bold text-green-700 mt-2">Plane Cap</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">Low Stock</h3>
          <p className="text-2xl font-bold text-purple-700 mt-2">2 Items</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-600">Trending</h3>
          <p className="text-2xl font-bold text-orange-700 mt-2">Net Cap</p>
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
    </div>
  );

  const ManageMaterials = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-6">Material Management</h2>

      <form onSubmit={handleAddMaterial} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input type="text" name="name" placeholder="Material Name" required className="p-2 border rounded-lg" />
        <input type="number" name="quantity" placeholder="Quantity" required className="p-2 border rounded-lg" />
        <input type="number" name="price" placeholder="Price" required className="p-2 border rounded-lg" />
        <input type="date" name="date" required className="p-2 border rounded-lg" />
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <PlusCircle size={20} />
          Add Material
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Material</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <tr key={material.id} className="border-t">
                <td className="p-4">{material.name}</td>
                <td className="p-4">{material.quantity}</td>
                <td className="p-4">{material.price}</td>
                <td className="p-4">{material.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Material Management</h1>

      <div className="flex gap-4 mb-6">
        {[
          { id: 'stock', label: 'Stock Overview' },
          { id: 'materials', label: 'Manage Materials' }
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
      {activeTab === 'materials' && <ManageMaterials />}
    </div>
  );
};

export default Material;
