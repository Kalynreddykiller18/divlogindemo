'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function to set user data
  const login = (userData) => {
    setUser(userData.Business_Owner);
    // Optionally store token in local storage
    localStorage.setItem('accessToken', userData.access); // Assuming userData contains accessToken
  };

  // Update user information
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  // Logout function to clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken'); // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
