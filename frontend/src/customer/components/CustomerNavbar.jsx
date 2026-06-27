import { Navbar as BSNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { 
  FaHome, FaPlusCircle, FaBriefcase, FaSearch, FaUserCircle, 
  FaSignOutAlt, FaMoon, FaSun 
} from 'react-icons/fa';

const CustomerNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BSNavbar 
      expand="lg" 
      sticky="top" 
      className="shadow-sm py-3"
      style={{ 
        backgroundColor: colors.bg, 
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease'
      }}
    >
      <Container fluid className="px-4 px-lg-5">
        
        {/* LOGO */}
        <BSNavbar.Brand as={Link} to="/customer/dashboard" className="fw-bold me-4">
          <span style={{ color: colors.brand, fontSize: '1.8rem', fontFamily: "'Playfair Display', serif" }}>
            Hiree
          </span>
          <span style={{ color: colors.text, fontSize: '0.9rem', fontWeight: '400', marginLeft: '5px' }}>
            | Customer
          </span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="customer-navbar" style={{ borderColor: colors.text }} />
        
        <BSNavbar.Collapse id="customer-navbar">
          
          {/* NAVIGATION LINKS (Center) */}
          <Nav className="mx-auto align-items-center gap-lg-4">
            <Nav.Link as={Link} to="/customer/dashboard" className="d-flex align-items-center" style={{ color: colors.text, transition: '0.3s' }}>
              <FaHome className="me-2" style={{ color: colors.accent }} /> Dashboard
            </Nav.Link>
             <Nav.Link as={Link} to="/find-talent" className="d-flex align-items-center" style={{ color: colors.text, transition: '0.3s' }}>
              <FaBriefcase className="me-2" style={{ color: colors.accent }} /> Find Talent
            </Nav.Link>
            
            <Nav.Link as={Link} to="/find-work" className="d-flex align-items-center" style={{ color: colors.text, transition: '0.3s' }}>
              <FaSearch className="me-2" style={{ color: colors.accent }} /> Find Work
            </Nav.Link>
            
            
            <Nav.Link as={Link} to="/customer/my-jobs" className="d-flex align-items-center" style={{ color: colors.text, transition: '0.3s' }}>
              <FaBriefcase className="me-2" style={{ color: colors.accent }} /> My Jobs
            </Nav.Link>
            
            
          </Nav>

          {/* PROFILE DROPDOWN (Right Side) */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="link" 
              className="d-flex align-items-center text-decoration-none p-0"
              style={{ color: colors.text }}
            >
              {user?.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="rounded-circle me-2" 
                  style={{ width: '40px', height: '40px', objectFit: 'cover', border: `2px solid ${colors.brand}` }}
                />
              ) : (
                <FaUserCircle size={35} className="me-2" style={{ color: colors.brand }} />
              )}
              <div className="d-none d-md-block text-start">
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.brand }}>
                  {user?.name || 'User'}
                </div>
                <div style={{ fontSize: '0.75rem', color: colors.text, opacity: 0.8 }}>
                  {user?.email || 'email@example.com'}
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-lg border-0 mt-2" style={{ borderRadius: '12px', minWidth: '220px' }}>
              <Dropdown.Header style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <div className="fw-bold" style={{ color: '#082c5e' }}>{user?.name}</div>
                <div className="text-muted small">{user?.email}</div>
              </Dropdown.Header>
              
              {/* THEME TOGGLE */}
              <Dropdown.Item className="py-2" onClick={toggleTheme} style={{ color: '#082c5e' }}>
                <div className="d-flex align-items-center">
                  {isDarkMode ? <FaSun className="me-2 text-warning" /> : <FaMoon className="me-2 text-primary" />}
                  {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </div>
              </Dropdown.Item>

              <Dropdown.Divider />
              
              <Dropdown.Item as={Link} to="/customer/profile" className="py-2" style={{ color: '#082c5e' }}>
                <FaUserCircle className="me-2" /> My Profile
              </Dropdown.Item>

              <Dropdown.Divider />
              
              <Dropdown.Item onClick={handleLogout} className="py-2 text-danger fw-semibold">
                <FaSignOutAlt className="me-2" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default CustomerNavbar;