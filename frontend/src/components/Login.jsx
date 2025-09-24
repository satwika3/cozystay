import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Match your Spring Boot port 8084
const API_BASE_URL = 'http://localhost:8084/api';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData);
        navigate('/');
      } else {
        const errorText = await response.text();
        setError(errorText || `Authentication failed (Status: ${response.status}). Please try again.`);
      }
    } catch (error) {
      setError(`Cannot connect to backend server at ${API_BASE_URL}. Make sure Spring Boot is running on port 8084.`);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <h2>{isLogin ? 'Login to CozyStay' : 'Create Account'}</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  disabled={isLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn login-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
            </form>
            
            <div className="auth-switch">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="switch-btn"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={isLoading}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>

            {/* Demo credentials */}
            {isLogin && (
              <div className="demo-credentials">
                <h4>Demo Credentials:</h4>
                <p>Admin: admin@cozystay.com / admin123</p>
                <p>Customer: customer@cozystay.com / customer123</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;