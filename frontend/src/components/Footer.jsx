// components/Footer.jsx
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: '#082c5e',
      color: '#ffffff',
      padding: '70px 0 0',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Decorative Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #098a8b, #f9d28d, #098a8b)',
        backgroundSize: '200% 100%',
        animation: 'gradientMove 3s ease-in-out infinite'
      }} />

      <Container>
        <Row className="g-4">
          {/* Column 1 - Brand */}
          <Col lg={4} md={6} sm={12}>
            <div style={{ marginBottom: '1.5rem' }}>
              <Link to="/" style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                Hiree
                <span style={{ color: '#098a8b' }}>.</span>
              </Link>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                maxWidth: '350px',
                marginTop: '0.5rem'
              }}>
                Find trusted service providers for web development, graphic design, 
                and digital marketing. Connect with top talent worldwide.
              </p>
            </div>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
              {[
                { icon: <FaFacebook />, link: '#', color: '#1877f2' },
                { icon: <FaTwitter />, link: '#', color: '#1da1f2' },
                { icon: <FaLinkedin />, link: '#', color: '#0a66c2' },
                { icon: <FaInstagram />, link: '#', color: '#e4405f' },
                { icon: <FaYoutube />, link: '#', color: '#ff0000' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>

          {/* Column 2 - Quick Links */}
          <Col lg={2} md={6} sm={6}>
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#f1dcc1',
              marginBottom: '1.2rem',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Quick Links
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                background: '#098a8b'
              }} />
            </h5>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Why Us', path: '/#why-us' },
                { name: 'Categories', path: '/#categories' },
                { name: 'Find Talent', path: '/find-talent' },
                { name: 'Services', path: '/services' },
                { name: 'How It Works', path: '/#how-it-works' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.6rem' }}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#098a8b';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaArrowRight style={{ fontSize: '0.6rem', opacity: 0.4 }} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Column 3 - Services */}
          <Col lg={2} md={6} sm={6}>
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#f1dcc1',
              marginBottom: '1.2rem',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Services
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                background: '#098a8b'
              }} />
            </h5>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: 'Web Development', path: '/services/1' },
                { name: 'Graphic Design', path: '/services/2' },
                { name: 'UI/UX Designing', path: '/services/3' },
                { name: 'Digital Marketing', path: '/services/4' },
                { name: 'App Development', path: '/services/5' },
                { name: 'Video Editing', path: '/services/6' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.6rem' }}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#f9d28d';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaArrowRight style={{ fontSize: '0.6rem', opacity: 0.4 }} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Column 4 - Contact */}
          <Col lg={4} md={6} sm={12}>
            <h5 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#f1dcc1',
              marginBottom: '1.2rem',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Contact Us
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                background: '#098a8b'
              }} />
            </h5>

            {/* Contact Items */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '0.8rem',
                color: 'rgba(255,255,255,0.7)',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#098a8b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(9, 138, 139, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#098a8b',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  <FaEnvelope />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Email</div>
                  <a href="mailto:support@hiree.com" style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    wordBreak: 'break-word'
                  }}>
                    support@hiree.com
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '0.8rem',
                color: 'rgba(255,255,255,0.7)',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#098a8b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(9, 138, 139, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#098a8b',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  <FaPhone />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Phone</div>
                  <a href="tel:+923001234567" style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}>
                    +92 300 1234567
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'rgba(255,255,255,0.7)',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#098a8b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(9, 138, 139, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#098a8b',
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  <FaMapMarkerAlt />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Address</div>
                  <span style={{ fontSize: '0.95rem' }}>
                    Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{
              marginTop: '1.5rem',
              padding: '15px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '0.5rem'
              }}>
                📧 Subscribe to our newsletter
              </p>
              <div className="newsletter-form" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{
                    flex: '1 1 150px',
                    minWidth: '120px',
                    padding: '8px 14px',
                    borderRadius: '25px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    transition: '0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#098a8b';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
                <button
                  style={{
                    padding: '8px 18px',
                    borderRadius: '25px',
                    border: 'none',
                    background: '#098a8b',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: '0.3s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f9d28d';
                    e.target.style.color = '#082c5e';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#098a8b';
                    e.target.style.color = '#fff';
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="footer-bottom" style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1.5rem'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} Hiree. All rights reserved.
          </p>
          <div className="footer-bottom-links" style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/privacy" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: '0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#098a8b'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              Privacy Policy
            </Link>
            <Link to="/terms" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: '0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#098a8b'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              Terms of Service
            </Link>
            <Link to="/faq" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: '0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#098a8b'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              FAQ
            </Link>
          </div>
        </div>
      </Container>

      {/* Responsive Styles */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Medium screens (768px - 991px) */
        @media (max-width: 991px) {
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          .footer-bottom-links {
            justify-content: center !important;
            gap: 1rem !important;
          }
        }

        /* Small screens (576px - 767px) */
        @media (max-width: 767px) {
          .newsletter-form {
            flex-direction: column !important;
          }
          .newsletter-form input,
          .newsletter-form button {
            width: 100% !important;
          }
        }

        /* Extra small screens (< 576px) */
        @media (max-width: 575px) {
          .footer-bottom-links {
            flex-direction: column !important;
            gap: 0.8rem !important;
            width: 100%;
          }
          .footer-bottom-links a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;