// src/components/Login.jsx
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Redirect user to backend route that starts Yahoo OAuth
    window.location.href = "https://ffopt-render.onrender.com/auth/login";

  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Yahoo</button>
    </div>
  );
};

export default Login;
