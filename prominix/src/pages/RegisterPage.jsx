import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    location: '',
    mobileNumber: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendUrl = 'https://localhost:7041/api/auth/register'; // Adjust port if needed
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account.');
      }

      setSuccess('Account created successfully! You can now log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="section-title">
        <h2>Create Account</h2>
        <p>Join Prominix as a Client</p>
      </div>
      
      <form onSubmit={handleFormSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        {/* Form fields */}
        <div className="row">
            <div className="col-md-6 mb-3"><label>First Name*</label><input type="text" name="firstName" className="form-control" onChange={handleChange} required /></div>
            <div className="col-md-6 mb-3"><label>Last Name*</label><input type="text" name="lastName" className="form-control" onChange={handleChange} required /></div>
        </div>
        <div className="mb-3"><label>Email*</label><input type="email" name="email" className="form-control" onChange={handleChange} required /></div>
        <div className="mb-3"><label>Password*</label><input type="password" name="password" className="form-control" onChange={handleChange} required /></div>
        <div className="row">
            <div className="col-md-6 mb-3"><label>Gender</label><select name="gender" className="form-select" onChange={handleChange}><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="col-md-6 mb-3"><label>Date of Birth</label><input type="date" name="dateOfBirth" className="form-control" onChange={handleChange} /></div>
        </div>
        <div className="mb-3"><label>Location</label><input type="text" name="location" className="form-control" onChange={handleChange} /></div>
        <div className="mb-3"><label>Mobile Number</label><input type="tel" name="mobileNumber" className="form-control" onChange={handleChange} /></div>
        
        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn" style={{ backgroundColor: '#cda45e', color: '#fff' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          <Link to="/login">Already have an account?</Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;