import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Import all necessary components and pages
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackToTopButton from './components/common/BackToTopButton';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage'; // Import the new page
import DashboardHomePage from './pages/DashboardHomePage';
import NotificationPage from './pages/NotificationPage';
import MyDataPage from './pages/MyDataPage';
import MyTimePage from './pages/MyTimePage';
import PolicyPage from './pages/PolicyPage';

const PublicSiteLayout = ({ currentUser, onLogout }) => {
  return (
    <>
      <Header currentUser={currentUser} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route element={<PublicSiteLayout currentUser={currentUser} onLogout={handleLogout} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* NEW: Add the route for the registration page */}
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* --- PRIVATE DASHBOARD ROUTES --- */}
        <Route 
          path="/dashboard" 
          element={currentUser && currentUser.role === 'Employee' ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="my-data" element={<MyDataPage />} />
          <Route path="my-time" element={<MyTimePage />} />
          <Route path="policy" element={<PolicyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;