import React, { useState } from 'react';

const SiteAccessModal = ({ isVisible, onClose, onLoginSuccess }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSiteLogin = () => {
    setLoading(true);
    setError(null);
    fetch('//localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    })
      .then(async response => {
        setLoading(false);
        if (response.ok) {
          const data = await response.json();
          onLoginSuccess(data);
          onClose();
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch(err => {
        setLoading(false);
        setError("An error occurred. Please try again later.");
        console.error("Error logging in:", err);
      });
  };

  const handleSignup = () => {
    setLoading(true);
    setError(null);
    fetch('//localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    })
      .then(response => {
        setLoading(false);
        if (response.ok) {
          alert("Registration successful! Please log in.");
          setIsSignupMode(false);
          setUsername('');
          setPassword('');
        } else {
          setError("Registration failed! Please try again.");
        }
      })
      .catch(err => {
        setLoading(false);
        setError("An error occurred. Please try again later.");
        console.error("Error registering:", err);
      });
  };

  const handleLogout = () => {
    fetch('//localhost:5000/logout', {
      method: 'POST',
      credentials: 'include', // Ensure session cookies are included
    })
      .then(response => {
        if (response.ok) {
          alert("Logged out successfully.");
          onClose(); // Close the modal
        } else {
          console.error("Failed to log out.");
        }
      })
      .catch(err => {
        console.error("Error logging out:", err);
      });
  };

  if (!isVisible) return null;

  return (
    <div className="SiteAccessModal-overlay">
      <div className="SiteAccessModal">
        <button onClick={onClose} className="SiteAccessModal-closeButton">X</button>
        <h2 className="SiteAccessModal-header">{isSignupMode ? "Sign Up" : "Log In"}</h2>
        <div className="SiteAccessModal-form">
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="SiteAccessModal-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="SiteAccessModal-input"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <p>Loading...</p>}
          {isSignupMode ? (
            <>
              <button onClick={handleSignup} className="SiteAccessModal-loginButton">Sign Up</button>
              <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsSignupMode(false)}>
                Already have an account? <span style={{ color: '#4CAF50' }}>Log in</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSiteLogin} className="SiteAccessModal-loginButton">Login</button>
              <button onClick={() => setIsSignupMode(true)} className="SiteAccessModal-signupButton">Sign Up</button>
              <button onClick={handleLogout} className="SiteAccessModal-logoutButton">Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteAccessModal;
