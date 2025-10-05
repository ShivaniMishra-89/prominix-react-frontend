import React, { useState } from 'react';
import '../assets/css/Notifications.css'; // Import the new CSS file

// Mock data for the notification feed
const initialNotifications = [
  { id: 1, icon: 'bi-calendar-check', message: 'Your leave request for Aug 28th has been approved.', timestamp: '2 hours ago', read: false, category: 'system' },
  { id: 2, icon: 'bi-file-earmark-text', message: 'A new company policy document has been uploaded.', timestamp: '1 day ago', read: false, category: 'announcement' },
  { id: 3, icon: 'bi-clock-history', message: 'Reminder: Please submit your timesheet for the week.', timestamp: '2 days ago', read: true, category: 'timesheet' },
  { id: 4, icon: 'bi-briefcase', message: 'Your project "Phoenix" has a new task assigned to you.', timestamp: '3 days ago', read: true, category: 'project' },
];

function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [settings, setSettings] = useState({
    email: 'shivani.mishra@prominix.com',
    push: true,
    announcements: true,
    timesheet: true,
    project: false,
  });

  const handleSettingChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'system') return n.category === 'system' || n.category === 'announcement';
    return true; // 'all' tab
  });

  return (
    <div className="container">
      <div>
        <h2 className="dashboard-subtitle">Notifications</h2>
        <p className="dashboard-title">Manage Your Alerts and Updates</p>
      </div>

      <div className="notifications-container">
        {/* Left Side: Notification Settings */}
        <div className="settings-card">
          <h4>Notification Settings</h4>
          <div className="form-group">
            <label htmlFor="email">Employee Mail ID</label>
            <input type="email" id="email" name="email" value={settings.email} onChange={handleSettingChange} />
          </div>
          <div className="form-group">
            <div className="toggle-switch">
              <label htmlFor="push">Enable Push Notifications</label>
              <input type="checkbox" id="push" name="push" checked={settings.push} onChange={handleSettingChange} />
            </div>
          </div>
          
          <h4>Notification Types</h4>
          <div className="form-group">
            <div className="toggle-switch">
              <label htmlFor="announcements">Company Announcements</label>
              <input type="checkbox" id="announcements" name="announcements" checked={settings.announcements} onChange={handleSettingChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="toggle-switch">
              <label htmlFor="timesheet">Timesheet Reminders</label>
              <input type="checkbox" id="timesheet" name="timesheet" checked={settings.timesheet} onChange={handleSettingChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="toggle-switch">
              <label htmlFor="project">Project Updates</label>
              <input type="checkbox" id="project" name="project" checked={settings.project} onChange={handleSettingChange} />
            </div>
          </div>
        </div>

        {/* Right Side: Notification Feed */}
        <div className="feed-card">
          <div className="feed-tabs">
            <button onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setActiveTab('unread')} className={activeTab === 'unread' ? 'active' : ''}>Unread</button>
            <button onClick={() => setActiveTab('system')} className={activeTab === 'system' ? 'active' : ''}>System Alerts</button>
          </div>
          <ul className="notification-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <li key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                  <i className={`bi ${notification.icon} notification-icon`}></i>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="timestamp">{notification.timestamp}</span>
                  </div>
                  {!notification.read && (
                    <div className="notification-actions">
                      <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="notification-item">
                <p>No notifications to display in this tab.</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;