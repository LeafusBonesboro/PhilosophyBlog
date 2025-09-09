import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔎 Check if user is already logged in (session cookie persists)
  useEffect(() => {
    fetch("http://localhost:5000/local_auth/protected", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.message?.includes("Hello")) {
          const username = data.message.split(" ")[1]; // parse "Hello {username}"
          setUser({ username });
        }
      })
      .catch(() => {});
  }, []);

  // 🔑 Login via Flask API
  const login = async (username, password) => {
    const res = await fetch("http://localhost:5000/local_auth/local_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // keep session cookie
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser({ username: data.username });
      return true;
    } else {
      throw new Error(data.error || "Login failed");
    }
  };

  // 🚪 Logout via Flask API
  const logout = async () => {
    await fetch("http://localhost:5000/local_auth/local_logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
