import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (!user || user.role !== 'ADMIN') {
    return (
      <section className="admin-dashboard">
        <div className="container">
          <div className="error">Access denied. Admin privileges required.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user.name}</p>
        </div>
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Hotels</h3>
            <p className="stat-number">25</p>
          </div>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p className="stat-number">156</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p className="stat-number">₹12,45,000</p>
          </div>
        </div>

        <div className="admin-actions">
          <button className="btn">Manage Hotels</button>
          <button className="btn">View Bookings</button>
          <button className="btn">User Management</button>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;