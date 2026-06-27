import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useContext(AuthContext);

  // Agar user login nahi hai
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role check karna hai aur match nahi hota
  if (requiredRole && user.role !== requiredRole) {
    // Apne role ke dashboard par bhejo
    if (user.role === 'provider') {
      return <Navigate to="/freelancer/dashboard" replace />;
    }
    if (user.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Agar user login hai aur role match karta hai
  return children;
};

export default ProtectedRoute;