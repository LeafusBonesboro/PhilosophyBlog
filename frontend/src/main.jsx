import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";  // ✅ import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/"> 
      <AuthProvider>
        <CartProvider>   {/* ✅ Wrap App with CartProvider */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
