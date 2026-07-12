import { useState } from 'react';
import { AuthContext } from './CreateAuthContext';

export function AuthProvider({ children }) {
  // Initialize currentUser from localStorage synchronously (no effect needed)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('mock_user_session');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
    return null;
  });
  // Loading is always false since we read from localStorage synchronously
  const loading = false;

  // Mock Registration Flow
  async function register(email, password) {
    // Simulate API network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { email, id: 'user_' + Date.now() };
        
        // Save user record to local storage as our "database"
        localStorage.setItem(`user_db_${email}`, JSON.stringify({ email, password }));
        
        // Log them in immediately
        setCurrentUser(mockUser);
        localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  }

  // Mock Login Flow
  async function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Look up user inside our mock local storage database
        const savedAccount = localStorage.getItem(`user_db_${email}`);
        
        if (!savedAccount) {
          return reject(new Error('No user found with this email address.'));
        }

        const parsedAccount = JSON.parse(savedAccount);
        
        if (parsedAccount.password !== password) {
          return reject(new Error('Incorrect password.'));
        }

        const mockUser = { email, id: 'user_active' };
        setCurrentUser(mockUser);
        localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  }

  // Mock Logout Flow
  async function logout() {
    setCurrentUser(null);
    localStorage.removeItem('mock_user_session');
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}