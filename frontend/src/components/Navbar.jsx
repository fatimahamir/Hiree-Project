import { Navbar as BSNavbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(false);

  // ✅ Section scroll function - agar user home par hai toh scroll kare, warna pehle home par le jaye
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setExpanded(false);
    
    if (location.pathname === '/') {
      // Agar already home page par hai, toh scroll kare
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Agar doosre page par hai, toh pehle home par jaye aur phir scroll kare
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setExpanded(false);
  };

  return (
    <>
      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <BSNavbar
        sticky="top"
        style={{
          backgroundColor: 'rgba(8,44,94,0.92)',
          backdropFilter: 'blur(10px)',
          minHeight: '70px',
          padding: '0 20px'
        }}
      >
        <Container className="position-relative d-flex align-items-center justify-content-between px-0 main-navbar">

          {/* LEFT - Get Started Button (Mobile) */}
          <div className="d-flex d-lg-none">
            <Link to="/register">
              <Button className="primary-btn mobile-get-started">Get Started</Button>
            </Link>
          </div>

          {/* LEFT (Desktop) - Only for screens > 1200px */}
          <div className="d-none d-xl-flex gap-4 align-items-center left-links">
            <Link to="/" className="nav-link-custom">Home</Link>
            <a href="/#why-us" onClick={(e) => handleSectionClick(e, 'why-us')} className="nav-link-custom">Why Us</a>
            <a href="/#categories" onClick={(e) => handleSectionClick(e, 'categories')} className="nav-link-custom">Categories</a>
            <Link to="/find-talent" className="nav-link-custom">Find Talent</Link>
            <Link to="/find-work" className="nav-link-custom">Find Work</Link>
          </div>

          {/* LOGO CENTER - For > 1200px and mobile */}
          <BSNavbar.Brand as={Link} to="/" className="brand-logo fw-semibold">
            Hiree
          </BSNavbar.Brand>

          {/* RIGHT (Desktop) - Only for screens > 1200px */}
          <div className="d-none d-xl-flex align-items-center gap-4 right-links">
            <a href="/#how-it-works" onClick={(e) => handleSectionClick(e, 'how-it-works')} className="nav-link-custom">How It Works</a>
            <a href="/#testimonials" onClick={(e) => handleSectionClick(e, 'testimonials')} className="nav-link-custom">Testimonials</a>

            {!user ? (
              <Link to="/login" className="sign-btn">Sign In</Link>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            )}

            <Link to="/register">
              <Button className="primary-btn">Get Started</Button>
            </Link>
          </div>

          {/* MOBILE RIGHT → Hamburger */}
          <div className="d-flex d-lg-none">
            <button className="hamburger-btn" onClick={() => setExpanded(!expanded)}>
              ☰
            </button>
          </div>

        </Container>

        {/* SPECIAL 2-ROW LAYOUT FOR 992px TO 1200px SCREENS */}
        <div className="two-row-layout">
          <Container fluid className="px-4">
            {/* Row 1: Logo Left | Auth Right */}
            <div className="d-flex align-items-center justify-content-between w-100 py-2 px-4">
              <BSNavbar.Brand as={Link} to="/" className="brand-logo-two-row">
                Hiree
              </BSNavbar.Brand>

              <div className="d-flex align-items-center gap-3">
                {!user ? (
                  <>
                    <Link to="/login" className="sign-btn">Sign In</Link>
                    <Link to="/register">
                      <Button className="primary-btn">Get Started</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-white">{user.name || 'User'}</span>
                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                  </>
                )}
              </div>
            </div>

            {/* Row 2: All Navigation Links - CENTERED */}
            <div className="d-flex align-items-center justify-content-center gap-4 py-2 border-top border-light border-opacity-10 w-100 nav-links-row">
              <Link to="/" className="nav-link-custom">Home</Link>
              <a href="/#why-us" onClick={(e) => handleSectionClick(e, 'why-us')} className="nav-link-custom">Why Us</a>
              <a href="/#categories" onClick={(e) => handleSectionClick(e, 'categories')} className="nav-link-custom">Categories</a>
              <Link to="/find-talent" className="nav-link-custom">Find Talent</Link>
              <Link to="/find-work" className="nav-link-custom">Find Work</Link>
              <a href="/#how-it-works" onClick={(e) => handleSectionClick(e, 'how-it-works')} className="nav-link-custom">How It Works</a>
              <a href="/#testimonials" onClick={(e) => handleSectionClick(e, 'testimonials')} className="nav-link-custom">Testimonials</a>
            </div>
          </Container>
        </div>

        {/* MOBILE MENU */}
        {expanded && (
          <div className="mobile-menu d-lg-none">
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <a href="/#why-us" onClick={(e) => handleSectionClick(e, 'why-us')}>Why Us</a>
            <a href="/#categories" onClick={(e) => handleSectionClick(e, 'categories')}>Categories</a>
            <Link to="/find-talent" onClick={handleNavClick}>Find Talent</Link>
            <Link to="/find-work" onClick={handleNavClick}>Find Work</Link>
            <a href="/#how-it-works" onClick={(e) => handleSectionClick(e, 'how-it-works')}>How It Works</a>
            <a href="/#testimonials" onClick={(e) => handleSectionClick(e, 'testimonials')}>Testimonials</a>

            <div className="mt-4 d-flex flex-column gap-2">
              {!user ? (
                <>
                  <Link to="/login" onClick={handleNavClick}>
                    <Button className="w-100 btn-light">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={handleNavClick}>
                    <Button className="w-100 primary-btn">Get Started</Button>
                  </Link>
                </>
              ) : (
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </BSNavbar>

      {/* STYLE */}
      <style>{`
        .brand-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff !important;
          margin: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .brand-logo-two-row {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff !important;
          text-decoration: none;
          transition: 0.3s;
        }

        .brand-logo-two-row:hover {
          color: #098a8b !important;
        }

        .nav-link-custom {
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s;
          position: relative;
          padding-bottom: 2px;
          font-size: 0.95rem;
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #098a8b;
          transition: width 0.3s ease;
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .nav-link-custom:hover {
          color: #098a8b !important;
        }

        .sign-btn {
          font-family: 'Inter', sans-serif;
          color: #fff;
          padding: 6px 16px;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 20px;
          text-decoration: none;
          transition: 0.3s;
          white-space: nowrap;
        }

        .sign-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: #098a8b;
          color: #098a8b;
        }

        .primary-btn {
          background: #098a8b !important;
          border: none !important;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          padding: 8px 22px;
          transition: 0.3s;
          white-space: nowrap;
        }

        .primary-btn:hover {
          background: #0a7a7b !important;
          transform: translateY(-2px);
        }

        .mobile-get-started {
          font-size: 0.85rem;
          padding: 6px 14px;
        }

        .hamburger-btn {
          font-size: 26px;
          background: none;
          border: none;
          color: #fff;
          padding: 0 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .hamburger-btn:hover {
          color: #098a8b;
        }

        .nav-links-row {
          border-top: 1px solid rgba(255,255,255,0.08) !important;
        }

        .mobile-menu {
          position: absolute;
          top: 70px;
          left: 0;
          width: 100%;
          height: auto;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          background: rgba(8,44,94,0.96);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 22px 25px;
          z-index: 999;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-menu a {
          font-family: 'Inter', sans-serif;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 1.05rem;
          padding: 10px 12px;
          border-radius: 8px;
          transition: 0.3s;
        }

        .mobile-menu a:hover {
          background: rgba(9,138,139,0.15);
          color: #098a8b;
        }

        .mobile-menu .btn {
          padding: 10px;
          font-weight: 500;
        }

        /* Hide 2-row layout by default */
        .two-row-layout {
          display: none !important;
        }

        /* 2-ROW LAYOUT ONLY FOR 992px TO 1200px */
        @media (min-width: 768px) and (max-width: 1200px) {
          .main-navbar {
            display: none !important;
          }

          .two-row-layout {
            display: block !important;
            width: 100%;
          }

          .two-row-layout .container-fluid {
            max-width: 100%;
            width: 100%;
            padding: 0 24px !important;
          }

          .navbar {
            min-height: auto !important;
            padding: 0 !important;
          }

          .nav-links-row {
            width: 100%;
            justify-content: center;
            gap: 32px !important;
            padding: 12px 0 !important;
            overflow: visible;
            flex-wrap: nowrap;
          }

          .brand-logo-two-row {
            font-size: 1.7rem;
          }

          .nav-link-custom {
            font-size: .92rem;
          }

          .sign-btn {
            padding: 6px 16px;
          }

          .primary-btn {
            padding: 8px 20px;
          }
        }

        /* Mobile spacing fix */
        @media (max-width: 991px) {
          .brand-logo {
            font-size: 1.5rem;
          }

          .container > .d-flex:first-child .brand-logo {
            display: none !important;
          }
        }

        /* Very small screens */
        @media (max-width: 576px) {
          .brand-logo {
            font-size: 1.2rem;
          }
          
          .mobile-get-started {
            font-size: 0.75rem;
            padding: 5px 10px;
          }
          
          .hamburger-btn {
            font-size: 22px;
          }
          
          .mobile-menu {
            padding: 16px 18px;
          }
          
          .mobile-menu a {
            font-size: 0.95rem;
            padding: 8px 10px;
          }
        }

        /* 1200px - 1400px: Compact mode */
        @media (min-width: 1201px) and (max-width: 1400px) {
          .left-links {
            padding-right: 50px !important;
            gap: 16px !important;
          }

          .right-links {
            padding-left: 50px !important;
            gap: 14px !important;
          }

          .nav-link-custom {
            font-size: 0.82rem !important;
          }

          .sign-btn {
            padding: 5px 12px !important;
            font-size: 0.82rem !important;
          }

          .primary-btn {
            padding: 6px 16px !important;
            font-size: 0.82rem !important;
          }

          .brand-logo {
            font-size: 1.5rem !important;
          }
        }

        /* 1400px+: Full spacing */
        @media (min-width: 1401px) {
          .left-links {
            flex: 1 !important;
            justify-content: flex-end !important;
            padding-right: 150px !important;
            gap: 30px !important;
          }

          .right-links {
            flex: 1 !important;
            justify-content: flex-start !important;
            padding-left: 150px !important;
            gap: 25px !important;
          }

          .brand-logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;