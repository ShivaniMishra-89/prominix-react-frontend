import React, { useState } from 'react';
import '../assets/css/MyData.css'; // Import the CSS file

// Mock employee data, now with a bank section
const employeeData = {
  general: {
    timeZone: 'Asia/Kolkata',
    userId: '400862656423',
    username: '400545486223',
    firstName: 'Shivani',
    lastName: 'Mishra',
  },
  personal: {
    personnelId: '400865454223',
    dateOfBirth: 'Show',
    placeOfBirth: 'Sol Dungi, Uttarakhand',
  },
  employment: {
    status: 'Active',
    manager: 'Avanthi Gandham',
    stream: 'PROJECT STREAM (50545845000020)',
    designation: 'Project Engineer (D1545450594)',
  },
  bank: {
    accountNumber: '************1234',
    ifscCode: 'SBIN0005555',
    bankName: 'State Bank of India',
    branchName: 'Kolkata Main Branch',
  }
};

// Sub-components for each tab's content
const GeneralInfo = () => (
  <div className="info-card">
    <div className="info-card-header"><h4>User Info</h4></div>
    <div className="info-grid">
      <div className="info-item"><span className="label">Time Zone</span><span className="value">{employeeData.general.timeZone}</span></div>
      <div className="info-item"><span className="label">User ID</span><span className="value read-only">{employeeData.general.userId}</span></div>
      <div className="info-item"><span className="label">Username</span><span className="value read-only">{employeeData.general.username}</span></div>
      <div className="info-item"><span className="label">First Name</span><span className="value read-only">{employeeData.general.firstName}</span></div>
      <div className="info-item"><span className="label">Last Name</span><span className="value read-only">{employeeData.general.lastName}</span></div>
    </div>
  </div>
);

const PersonalInfo = () => (
  <div className="info-card">
    <div className="info-card-header"><h4>Biographical Information</h4></div>
    <div className="info-grid">
      <div className="info-item"><span className="label">Personnel ID</span><span className="value read-only">{employeeData.personal.personnelId}</span></div>
      <div className="info-item"><span className="label">Date Of Birth</span><span className="value">{employeeData.personal.dateOfBirth}</span></div>
      <div className="info-item"><span className="label">Place Of Birth</span><span className="value">{employeeData.personal.placeOfBirth}</span></div>
    </div>
  </div>
);

const EmploymentInfo = () => (
   <div className="info-card">
    <div className="info-card-header"><h4>Job Information</h4></div>
    <div className="info-grid">
      <div className="info-item"><span className="label">Employee Status</span><span className="value">{employeeData.employment.status}</span></div>
      <div className="info-item"><span className="label">Practice/Functional Manager</span><span className="value">{employeeData.employment.manager}</span></div>
      <div className="info-item"><span className="label">Stream</span><span className="value">{employeeData.employment.stream}</span></div>
      <div className="info-item"><span className="label">Designation</span><span className="value">{employeeData.employment.designation}</span></div>
    </div>
  </div>
);

// New component for Bank Information with editable fields
const BankInfo = () => {
  const [bankDetails, setBankDetails] = useState(employeeData.bank);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, you would send this data to a server
    console.log("Saving bank details:", bankDetails);
    alert("Bank details saved successfully!");
  };

  return (
    <div className="info-card">
      <div className="info-card-header"><h4>Bank Information</h4></div>
      <div className="info-grid">
        <div className="info-item">
          <label className="label" htmlFor="accountNumber">Account Number</label>
          <input type="text" id="accountNumber" name="accountNumber" className="value editable" value={bankDetails.accountNumber} onChange={handleChange} />
        </div>
        <div className="info-item">
          <label className="label" htmlFor="ifscCode">IFSC Code</label>
          <input type="text" id="ifscCode" name="ifscCode" className="value editable" value={bankDetails.ifscCode} onChange={handleChange} />
        </div>
        <div className="info-item">
          <label className="label" htmlFor="bankName">Bank Name</label>
          <input type="text" id="bankName" name="bankName" className="value editable" value={bankDetails.bankName} onChange={handleChange} />
        </div>
        <div className="info-item">
          <label className="label" htmlFor="branchName">Branch Name</label>
          <input type="text" id="branchName" name="branchName" className="value editable" value={bankDetails.branchName} onChange={handleChange} />
        </div>
      </div>
      <div className="info-card-footer">
        <button className="btn-save" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};


function MyDataPage() {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralInfo />;
      case 'personal': return <PersonalInfo />;
      case 'employment': return <EmploymentInfo />;
      case 'bank': return <BankInfo />; // Add case for the new component
      default: return <GeneralInfo />;
    }
  };

  return (
    <div className="container my-data-container">
      <div>
        <h2 className="dashboard-subtitle">My Data</h2>
        <p className="dashboard-title">Manage Your Data</p>
      </div>

      <div className="profile-header">
        <div className="profile-avatar"><i className="bi bi-person"></i></div>
        <div className="profile-info">
          <h2>Shivani Mishra (SH40086223)</h2>
          <p>Project Engineer</p>
          <p>Industry 4.0 (PCS1530), ENGG - WIPRO ENGINEERING</p>
        </div>
      </div>

      <nav className="tab-nav">
        <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>General Information</button>
        <button onClick={() => setActiveTab('personal')} className={activeTab === 'personal' ? 'active' : ''}>Personal Information</button>
        <button onClick={() => setActiveTab('employment')} className={activeTab === 'employment' ? 'active' : ''}>Employment Information</button>
        <button onClick={() => setActiveTab('bank')} className={activeTab === 'bank' ? 'active' : ''}>Bank Information</button>
      </nav>

      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default MyDataPage;