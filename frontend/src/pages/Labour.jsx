import React, { useState } from 'react';
import { TrashIcon, PencilIcon, PlusCircleIcon, FileTextIcon, PrinterIcon } from 'lucide-react';

// Worker Profile Component
const WorkerProfile = ({ workers, setWorkers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWorker, setEditingWorker] = useState(null);
  const [newWorker, setNewWorker] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    photo: null
  });

  const handleAddWorker = () => {
    if (!newWorker.name || !newWorker.dob || !newWorker.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setWorkers([...workers, { ...newWorker, id: Date.now() }]);
    setNewWorker({ name: '', dob: '', phone: '', email: '', photo: null });
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Worker Profiles</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search workers..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add New Worker Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Worker Name"
            className="p-2 border rounded"
            value={newWorker.name}
            onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newWorker.dob}
            onChange={(e) => setNewWorker({...newWorker, dob: e.target.value})}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-2 border rounded"
            value={newWorker.phone}
            onChange={(e) => setNewWorker({...newWorker, phone: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={newWorker.email}
            onChange={(e) => setNewWorker({...newWorker, email: e.target.value})}
          />
        </div>
        <button
          onClick={handleAddWorker}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusCircleIcon size={20} />
          Add Worker
        </button>
      </div>

      {/* Workers List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Date of Birth</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers
              .filter(worker => 
                worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                worker.phone.includes(searchTerm)
              )
              .map(worker => (
                <tr key={worker.id} className="border-t">
                  <td className="p-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </td>
                  <td className="p-4">{worker.name}</td>
                  <td className="p-4">{worker.dob}</td>
                  <td className="p-4">{worker.phone}</td>
                  <td className="p-4">{worker.email}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingWorker(worker)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      >
                        <PencilIcon size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Attendance Tracking Component
const AttendanceTracking = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});

  const handleAttendanceChange = (workerId, status) => {
    setAttendance({
      ...attendance,
      [workerId]: {
        ...attendance[workerId],
        [date]: status
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Tracking</h2>
      
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Worker Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample attendance row */}
            <tr className="border-t">
              <td className="p-4">Sample Worker</td>
              <td className="p-4">
                {attendance['sample']?.[date] || 'Not Marked'}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAttendanceChange('sample', 'Present')}
                    className="px-3 py-1 rounded bg-green-100 text-green-700"
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => handleAttendanceChange('sample', 'Absent')}
                    className="px-3 py-1 rounded bg-red-100 text-red-700"
                  >
                    Absent
                  </button>
                  <button 
                    onClick={() => handleAttendanceChange('sample', 'Half-day')}
                    className="px-3 py-1 rounded bg-yellow-100 text-yellow-700"
                  >
                    Half-day
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const WageCalculation = () => {
    const [capTypes, setCapTypes] = useState([
      { id: 1, name: "Plane Cap", rate: 60 },
      { id: 2, name: "Dabba Cap", rate: 60 },
      { id: 3, name: "Net Cap", rate: 78 },
      { id: 4, name: "Puma Cap", rate: 72 },
    ]);
  
    const [newCapType, setNewCapType] = useState({ name: "", rate: "" });
    const [production, setProduction] = useState({});
    const [workers, setWorkers] = useState([]);
    const [newWorker, setNewWorker] = useState("");
  
    const handleAddCapType = () => {
      if (!newCapType.name || !newCapType.rate) return;
      setCapTypes([...capTypes, { ...newCapType, id: Date.now() }]);
      setNewCapType({ name: "", rate: "" });
    };
  
    const handleRateChange = (id, newRate) => {
      setCapTypes(capTypes.map(cap => (cap.id === id ? { ...cap, rate: parseFloat(newRate) } : cap)));
    };
  
    const handleProductionChange = (workerId, capId, totalCaps) => {
      setProduction({
        ...production,
        [workerId]: {
          ...production[workerId],
          [capId]: totalCaps,
        },
      });
    };
  
    const calculateWage = (workerId) => {
      let total = 0;
      Object.entries(production[workerId] || {}).forEach(([capId, totalCaps]) => {
        const capType = capTypes.find(cap => cap.id === parseInt(capId));
        if (capType) {
          const dozens = Math.floor(totalCaps / 12);
          total += dozens * capType.rate;
        }
      });
      return total;
    };
  
    const handleAddWorker = () => {
      if (newWorker && !workers.includes(newWorker)) {
        setWorkers([...workers, newWorker]);
        setNewWorker("");
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4">Wage Calculation</h2>
  
        {/* Add Workers */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Add Workers</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Worker ID"
              className="p-2 border rounded w-full"
              value={newWorker}
              onChange={(e) => setNewWorker(e.target.value)}
            />
            <button onClick={handleAddWorker} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Worker
            </button>
          </div>
        </div>
  
        {/* Cap Types Management */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Cap Types & Rates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Cap Type Name"
              className="p-2 border rounded"
              value={newCapType.name}
              onChange={(e) => setNewCapType({ ...newCapType, name: e.target.value })}
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Rate per dozen"
                className="p-2 border rounded w-full"
                value={newCapType.rate}
                onChange={(e) => setNewCapType({ ...newCapType, rate: e.target.value })}
              />
              <button onClick={handleAddCapType} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </div>
  
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Cap Type</th>
                <th className="p-4 text-left">Rate (₹/dozen)</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {capTypes.map(cap => (
                <tr key={cap.id} className="border-t">
                  <td className="p-4">{cap.name}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={cap.rate}
                      onChange={(e) => handleRateChange(cap.id, e.target.value)}
                      className="p-1 border rounded w-24"
                    />
                  </td>
                  <td className="p-4">
                    <button onClick={() => setCapTypes(capTypes.filter(c => c.id !== cap.id))} className="text-red-500 hover:bg-red-50 p-2 rounded">
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Worker Production and Wage Calculation */}
        <div>
          <h3 className="text-lg font-medium mb-3">Worker Production</h3>
          <table className="w-full border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Worker ID</th>
                {capTypes.map(cap => (
                  <th key={cap.id} className="p-4 text-left">{cap.name} (Dozens)</th>
                ))}
                <th className="p-4 text-left">Total Wage (₹)</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(workerId => (
                <tr key={workerId} className="border-t">
                  <td className="p-4">{workerId}</td>
                  {capTypes.map(cap => (
                    <td key={cap.id} className="p-4">
                      <input
                        type="number"
                        className="p-1 border rounded w-24"
                        value={Math.floor((production[workerId]?.[cap.id] || 0) / 12)}
                        onChange={(e) => handleProductionChange(workerId, cap.id, parseInt(e.target.value) * 12 || 0)}
                      />
                    </td>
                  ))}
                  <td className="p-4 font-bold">₹{calculateWage(workerId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
// Main Labour Management Component
const Labour = () => {
  const [workers, setWorkers] = useState([]);
  const [activeTab, setActiveTab] = useState('profiles');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Labour Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {[
          { id: 'profiles', label: 'Worker Profiles' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'wages', label: 'Wage Calculation' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profiles' && <WorkerProfile workers={workers} setWorkers={setWorkers} />}
      {activeTab === 'attendance' && <AttendanceTracking />}
      {activeTab === 'wages' && <WageCalculation />}
    </div>
  );
};

export default Labour;