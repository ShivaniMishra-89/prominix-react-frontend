import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleResetSubmit = (event) => {
    event.preventDefault();
    // In a real application, you would send a password reset email here.
    // For this demo, we'll just show an alert and redirect.
    alert("If an account with this email exists, a password reset link has been sent.");
    navigate('/login'); // Redirect back to the login page
  };

  return (
    <section className="container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="section-title">
        <h2>Reset Password</h2>
        <p>Enter your email to receive a password reset link.</p>
      </div>
      
      <form onSubmit={handleResetSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emailInput" placeholder="you@example.com" required />
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn" style={{ backgroundColor: '#cda45e', color: '#fff', border: 'none' }}>
                Send Reset Link
            </button>
            <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordPage;