// src/components/Register.jsx
import { useState } from "react";

export default function Register({ open, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if (!open) return null; // don’t render if closed

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-orange-500 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
