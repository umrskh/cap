import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, FileText, Download, 
  Filter, CreditCard, CheckCircle, TruckIcon 
} from 'lucide-react';

// Customer Database Component
const CustomerDatabase = ({ customers, setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    location: ''
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.location) {
      alert('Please fill in all required fields');
      return;
    }
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    setNewCustomer({ name: '', dob: '', phone: '', email: '', location: '' });
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const filteredCustomers = customers.filter(customer => {
    const searchValue = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'name':
        return customer.name.toLowerCase().includes(searchValue);
      case 'location':
        return customer.location.toLowerCase().includes(searchValue);
      case 'contact':
        return customer.phone.includes(searchValue) || 
               customer.email.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Customer Database</h2>
      
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">Filter by Name</option>
          <option value="location">Filter by Location</option>
          <option value="contact">Filter by Contact</option>
        </select>
      </div>

      {/* Add New Customer Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Customer Name *"
            className="p-2 border rounded"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newCustomer.dob}
            onChange={(e) => setNewCustomer({...newCustomer, dob: e.target.value})}
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            className="p-2 border rounded"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location *"
            className="p-2 border rounded"
            value={newCustomer.location}
            onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
          />
        </div>
        <button
          onClick={handleAddCustomer}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      {/* Customers List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Contact Info</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="border-t">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">
                  <div>{customer.phone}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="p-4">{customer.location}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
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

// Order Tracking Component
const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const orderStatuses = ['Pending', 'Processing', 'Dispatched', 'Delivered'];

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeliveryConfirmation = (orderId, deliveryDetails) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        status: 'Delivered',
        deliveryDetails 
      } : order
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Delivery Details</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">#ORD001</td>
              <td className="p-4">John Doe</td>
              <td className="p-4">
                <div>Plane Cap x 24</div>
                <div>Net Cap x 12</div>
              </td>
              <td className="p-4">
                <select 
                  className="p-2 border rounded"
                  onChange={(e) => handleStatusUpdate('ORD001', e.target.value)}
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="p-4">
                <button className="flex items-center gap-2 text-blue-500">
                  <TruckIcon size={16} />
                  Add Delivery Details
                </button>
              </td>
              <td className="p-4">
                <button className="flex items-center gap-2 text-green-500">
                  <FileText size={16} />
                  Generate Invoice
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Payment Status Component
const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);
  const paymentModes = ['Cash', 'Bank Transfer', 'UPI', 'Card'];

  const generateReceipt = (paymentId) => {
    // Implementation for generating receipt
    console.log('Generating receipt for payment:', paymentId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4">Payment Status</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total Amount</th>
              <th className="p-4 text-left">Received</th>
              <th className="p-4 text-left">Outstanding</th>
              <th className="p-4 text-left">Payment Details</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">John Doe</td>
              <td className="p-4">₹12,000</td>
              <td className="p-4">₹8,000</td>
              <td className="p-4">₹4,000</td>
              <td className="p-4">
                <div>Last paid: ₹5,000</div>
                <div className="text-sm text-gray-500">Via UPI on 20 Feb 2024</div>
              </td>
              <td className="p-4">
                <button 
                  onClick={() => generateReceipt('PAY001')}
                  className="flex items-center gap-2 text-green-500"
                >
                  <Download size={16} />
                  Download Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Form */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Record Payment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded"
          />
          <select className="p-2 border rounded">
            {paymentModes.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
            <CreditCard size={20} />
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Customer Management Component
const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {[
          { id: 'database', label: 'Customer Database' },
          { id: 'orders', label: 'Order Tracking' },
          { id: 'payments', label: 'Payment Status' }
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
      {activeTab === 'database' && <CustomerDatabase customers={customers} setCustomers={setCustomers} />}
      {activeTab === 'orders' && <OrderTracking />}
      {activeTab === 'payments' && <PaymentStatus />}
    </div>
  );
};

export default Customer;