import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    // Tenta restaurar do localStorage
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { logged: false, usuario: null, cim: null };
  });

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data));
  };
  const logout = () => {
    setAuth({ logged: false, usuario: null, cim: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
