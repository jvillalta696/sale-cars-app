import './App.css';
import { MockAuthProvider } from './context/MockAuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Page404NotFound from './pages/Page404NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MockAuthProvider>        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Page404NotFound />} />
        </Routes>
      </MockAuthProvider>
    </Router>
  );
}

export default App;
