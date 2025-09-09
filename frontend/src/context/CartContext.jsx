// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // each item: { id, name, price, qty, ... }

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
  // Optional: throw a clearer error if someone forgets the provider
  if (ctx === undefined) {
    // Comment out the throw to avoid runtime crash in production:
    // throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
};
