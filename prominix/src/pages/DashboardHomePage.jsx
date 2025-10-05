import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DashboardHomePage() {
  const [greeting, setGreeting] = useState('');

  // This useEffect hook runs once to determine the time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []); // Empty array means it only runs on component mount

  return (
    <div className="container">
      <div className="greeting-section">
        {/* The greeting will be dynamically set here  ### and also we have to fatch the employee name */}
        <h2>{greeting}, Employee!  Welcome to Prominix Insider.</h2>
        <p>Your place to communicate, collaborate, and connect. Let's get started.</p>
        
        <div className="action-buttons">
          <Link to="#" className="btn">Get Social</Link>
          <Link to="#" className="btn">Connect with People</Link>
          <Link to="#" className="btn">Check News and Events</Link>
        </div>
      </div>
      {/* You can add more dashboard widgets or content below */}
    </div>
  );
}

export default DashboardHomePage;
