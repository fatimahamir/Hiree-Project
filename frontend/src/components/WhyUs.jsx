// components/WhyUs.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaRocket, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import whyUsImg from '../assets/whyuss.jpg';

const WhyUs = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: 'Expert Talent Pool',
      description: 'Access to vetted professionals across multiple industries with proven track records.'
    },
    {
      icon: <FaRocket />,
      title: 'Fast & Efficient',
      description: 'Quick matching process that connects you with the right talent in record time.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Trusted',
      description: 'Enterprise-grade security and verified profiles ensure safe transactions.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Quality Assurance',
      description: 'Every project is backed by our quality guarantee and satisfaction promise.'
    }
  ];

  return (
    <section id="why-us" style={{
      background: 'rgba(8, 44, 94, 0.95)',
      padding: '60px 0',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(9, 138, 139, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(249, 210, 141, 0.06) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Centered Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            color: '#f9d28d',
            fontWeight: 600,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            Why Choose Us
          </span>
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.8rem',
            lineHeight: 1.3
          }}>
            Built for <span style={{ color: '#f1dcc1' }}>Success</span>
          </h2>
          
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We make hiring simple, fast, and reliable for businesses of all sizes
          </p>
          
          <div style={{
            width: '60px',
            height: '3px',
            background: '#098a8b',
            margin: '1rem auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        <Row className="align-items-stretch g-3">
          {/* Left Side - Image & Text */}
          <Col lg={6} md={6} className="d-flex flex-column">
            {/* Larger Image for better MD display */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '1.2rem'
            }}>
              <img 
                src={whyUsImg} 
                alt="Why Choose Us"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
            
            {/* Text Content */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.6',
                marginBottom: '1.2rem'
              }}>
                We've helped thousands of companies find the perfect talent. Our platform combines cutting-edge technology with human expertise to deliver results that matter.
              </p>

              {/* CTA Button - Desktop Only (shown on left) */}
              <div className="d-none d-md-block">
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: '#098a8b',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 28px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(9, 138, 139, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f9d28d';
                    e.target.style.color = '#082c5e';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 35px rgba(249, 210, 141, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#098a8b';
                    e.target.style.color = '#fff';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 20px rgba(9, 138, 139, 0.3)';
                  }}
                  >
                    Get Started Today
                  </button>
                </Link>
              </div>
            </div>
          </Col>

          {/* Right Side - 4 Compact Vertical Cards */}
          <Col lg={6} md={6} className="d-flex flex-column">
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.8rem',
              lineHeight: 1.3
            }}>
              Why Businesses <span style={{ color: '#098a8b' }}>Trust Us</span>
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: 1,
              justifyContent: 'flex-start'
            }}>
              {features.map((feature, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '15px 18px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(9, 138, 139, 0.15)';
                    e.currentTarget.style.borderColor = '#098a8b';
                    e.currentTarget.style.boxShadow = '0 8px 35px rgba(9, 138, 139, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {/* Icon */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(9, 138, 139, 0.15)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1.1rem',
                      color: '#098a8b'
                    }}>
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '0.25rem',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {feature.title}
                      </h4>
                      <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.8rem',
                        lineHeight: '1.4',
                        margin: 0
                      }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button - Mobile Only (shown below cards) */}
            <div className="d-md-none" style={{ marginTop: '1.2rem', textAlign: 'center' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: '#098a8b',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 28px',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(9, 138, 139, 0.3)',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f9d28d';
                  e.target.style.color = '#082c5e';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 35px rgba(249, 210, 141, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#098a8b';
                  e.target.style.color = '#fff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(9, 138, 139, 0.3)';
                }}
                >
                  Get Started Today
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyUs;