"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔄 Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 💾 Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) =>
    setCart((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i === -1) return [...prev, { ...item, qty: 1 }];
      const clone = [...prev];
      clone[i] = { ...clone[i], qty: clone[i].qty + 1 };
      return clone;
    });

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
};
