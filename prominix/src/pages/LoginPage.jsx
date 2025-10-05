import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Ensure this URL and port match your running .NET backend
      const backendUrl = 'https://localhost:7041/api/auth/login'; 

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password. Please try again.');
      }

      const data = await response.json();
      onLogin(data.user);

      if (data.user.role === 'Employee') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="section-title">
        <h2>Login</h2>
        <p>Sign in to your Prominix Account</p>
      </div>
      
      <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="emailInput" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="passwordInput" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn" style={{ backgroundColor: '#cda45e', color: '#fff', border: 'none' }} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        
        <div className="text-center mt-4">
          <p>Don't have an account? <Link to="/register">Create one here</Link></p>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;