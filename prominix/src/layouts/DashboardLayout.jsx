import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../assets/css/dashboard.css';

function DashboardLayout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="company-name m-0">
            <Link to="/dashboard" className="text-white text-decoration-none">Prominix Insider</Link>
          </h1>
          
          <nav className="dashboard-nav">
            <ul>
              <li><Link to="/dashboard/notifications">Notifications</Link></li>
              <li><Link to="/dashboard/my-data">My Data</Link></li>
              <li><Link to="/dashboard/my-time">My Time</Link></li>
              <li><Link to="/dashboard/policy">Policy</Link></li>
              <li>
                <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* This Outlet is the placeholder for your page content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;