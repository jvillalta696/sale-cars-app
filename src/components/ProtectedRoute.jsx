import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MockAuthContext } from '../context/MockAuthContext';
import Preloading from './Preloading';

const ProtectedRoute = () => {
  const { user, loading } = useContext(MockAuthContext);

  if (loading) {
    return (
      <div className="centered-container">
        <Preloading />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;