// MockAuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Create context
const MockAuthContext = createContext();

// Mock user data
const mockUsers = [
  {
    uid: '12345',
    email: 'juanma',
    password: 'qwerty',
    displayName: 'Test User 1'
  },
  {
    uid: '67890',
    email: 'johel',
    password: '123456',
    displayName: 'Test User 2'
  }
];

// Provider component
const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for user data
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && mockUsers.some(u => u.email === storedUser.email)) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // Simulate sign in
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        navigate('/');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      // Simulate sign out
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MockAuthContext.Provider value={{ user, loading, signIn, signOutUser }}>
      {children}
    </MockAuthContext.Provider>
  );
};

MockAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MockAuthContext, MockAuthProvider };