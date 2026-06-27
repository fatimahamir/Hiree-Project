import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// 1. Navbars & Footer Imports
import Navbar from './components/Navbar';
import FreelancerNavbar from './freelancer/components/FreelancerNavbar';
import CustomerNavbar from './customer/components/CustomerNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// 2. Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import FindTalentPage from './pages/FindTalent';
import FindWorkPage from './pages/FindWork';
import AccountSetup from './pages/AccountSetup';

// 3. Freelancer Pages
import FreelancerDashboard from './freelancer/pages/FreelancerDashboard';
import CreateService from './freelancer/pages/CreateService';
import EditService from './freelancer/pages/EditService';
import MyServices from './freelancer/pages/MyServices';
import MyPortfolio from './freelancer/pages/MyPortfolio';
import ReceivedRequests from './freelancer/pages/ReceivedRequests';
import ActiveProjects from './freelancer/pages/ActiveProjects';
import Earnings from './freelancer/pages/Earnings';
import FreelancerProfile from './freelancer/pages/FreelancerProfile';

// Customer Pages
import CustomerDashboard from './customer/pages/CustomerDashboard';
import CustomerProfile from './customer/pages/CustomerProfile';
import PostJob from './customer/pages/PostJob';
import MyJobs from './customer/pages/MyJobs';
import JobDetail from './pages/JobDetail';

// ==========================================
// MAIN LAYOUT COMPONENT
// ==========================================
const AppLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const hideNavFooter = ['/login', '/register', '/account-setup'].includes(location.pathname);
  let ActiveNavbar = Navbar;

  if (location.pathname === '/') {
    ActiveNavbar = Navbar;
  } else if (user) {
    if (user.role === 'provider') {
      ActiveNavbar = FreelancerNavbar;
    } else if (user.role === 'customer') {
      ActiveNavbar = CustomerNavbar;
    }
  }

  const showFooter = !user && !hideNavFooter;

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavFooter && <ActiveNavbar />}
      
      <div className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          
          {/* FIND TALENT & FIND WORK ROUTES (PUBLIC) */}
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/find-work" element={<FindWorkPage />} /> 

          {/* Account Setup */}
          <Route path="/account-setup" element={<ProtectedRoute><AccountSetup /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

          {/* ========================================== */}
          {/* FREELANCER ROUTES */}
          {/* ========================================== */}
          <Route path="/freelancer/dashboard" element={<ProtectedRoute requiredRole="provider"><FreelancerDashboard /></ProtectedRoute>} />
          <Route path="/freelancer/create-service" element={<ProtectedRoute requiredRole="provider"><CreateService /></ProtectedRoute>} />
          <Route path="/freelancer/edit-service/:id" element={<ProtectedRoute requiredRole="provider"><EditService /></ProtectedRoute>} />
          <Route path="/freelancer/my-services" element={<ProtectedRoute requiredRole="provider"><MyServices /></ProtectedRoute>} />
          <Route path="/freelancer/my-portfolio" element={<ProtectedRoute requiredRole="provider"><MyPortfolio /></ProtectedRoute>} />
          <Route path="/freelancer/received-requests" element={<ProtectedRoute requiredRole="provider"><ReceivedRequests /></ProtectedRoute>} />
          <Route path="/freelancer/active-projects" element={<ProtectedRoute requiredRole="provider"><ActiveProjects /></ProtectedRoute>} />
          <Route path="/freelancer/earnings" element={<ProtectedRoute requiredRole="provider"><Earnings /></ProtectedRoute>} />
          
          {/* ✅ Freelancer ki APNI profile (logged-in user) */}
          <Route path="/freelancer/profile" element={<ProtectedRoute requiredRole="provider"><FreelancerProfile /></ProtectedRoute>} />
          
          {/* ✅ Kisi bhi Freelancer ki PUBLIC profile (dashboard se link aayega) */}
          <Route path="/freelancer/profile/:id" element={<ProtectedRoute><FreelancerProfile /></ProtectedRoute>} />

          {/* ========================================== */}
          {/* CUSTOMER ROUTES */}
          {/* ========================================== */}
          <Route path="/customer/dashboard" element={<ProtectedRoute requiredRole="customer"><CustomerDashboard /></ProtectedRoute>} />
          
          {/* ✅ Customer ki APNI profile (logged-in user) */}
          <Route path="/customer/profile" element={<ProtectedRoute requiredRole="customer"><CustomerProfile /></ProtectedRoute>} />
          
          {/* ✅ Kisi bhi Customer ki PUBLIC profile (dashboard se link aayega) */}
          <Route path="/customer/profile/:id" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
          
          <Route path="/customer/post-job" element={<ProtectedRoute requiredRole="customer"><PostJob /></ProtectedRoute>} />
          <Route path="/customer/my-jobs" element={<ProtectedRoute requiredRole="customer"><MyJobs /></ProtectedRoute>} />
         
          {/* Job Detail */}
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          {/* 404 Page (Yeh sabse end mein hona chahiye) */}
          <Route path="*" element={
            <div className="container text-center py-5">
              <h1>404 - Page Not Found</h1>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

// ==========================================
// DASHBOARD REDIRECT LOGIC
// ==========================================
const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  if (user && user.isProfileComplete === false) return <Navigate to="/account-setup" replace />;
  if (user?.role === 'provider') return <Navigate to="/freelancer/dashboard" replace />;
  if (user?.role === 'customer') return <Navigate to="/customer/dashboard" replace />;
  return <Navigate to="/" replace />;
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;