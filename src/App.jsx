import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ClientProvider } from './context/ClientContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Page404NotFound from './pages/Page404NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ClientProvider>
                  <Dashboard />
                </ClientProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
