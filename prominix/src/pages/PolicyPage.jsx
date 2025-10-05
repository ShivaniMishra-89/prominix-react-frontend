import React from 'react';
import '../assets/css/Policy.css'; // Import the new CSS file

function PolicyPage() {
  return (
    <div className="container">
      <div>
        <h2 className="dashboard-subtitle">COMPANY POLICIES</h2>
        <p className="dashboard-title">Guidelines and Regulations</p>
      </div>

      <div className="policy-card">
        <h4>Code of Conduct</h4>
        <p>All employees of Prominix Limited are expected to conduct themselves in a professional and ethical manner. This includes treating colleagues, clients, and partners with respect and integrity.</p>
        <ul>
          <li>Harassment of any kind will not be tolerated.</li>
          <li>Confidential information must be protected at all times.</li>
          <li>Conflicts of interest must be disclosed to management immediately.</li>
        </ul>
      </div>

      <div className="policy-card">
        <h4>IT & Asset Usage Policy</h4>
        <p>Company-provided assets, including laptops and software, are for business purposes. Personal use should be minimal and must not interfere with professional responsibilities.</p>
        <ul>
          <li>Do not install unauthorized software on company devices.</li>
          <li>Ensure your devices are secured with strong passwords.</li>
          <li>Report any lost or stolen equipment immediately to the IT department.</li>
        </ul>
      </div>

      <div className="policy-card">
        <h4>Leave & Attendance Policy</h4>
        <p>All leave requests must be submitted through the official HR portal at least one week in advance, except in cases of emergency. Attendance is tracked via the My Time portal and must be filled out daily.</p>
      </div>
    </div>
  );
}

export default PolicyPage;