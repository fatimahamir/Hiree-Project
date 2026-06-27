// components/HowItWorks.jsx
import { useContext, useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { 
  FaUserPlus, 
  FaSearch, 
  FaHandshake, 
  FaRocket,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';

const HowItWorks = () => {
  const { colors } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('lg');
  const scrollRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setScreenSize('lg');
      } else {
        setScreenSize('sm');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && screenSize !== 'lg') {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.scrollWidth / 4;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [screenSize]);

  // Scroll to specific step when dot is clicked
  const scrollToStep = (index) => {
    if (scrollRef.current && screenSize !== 'lg') {
      const cardWidth = scrollRef.current.scrollWidth / 4;
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
    setActiveIndex(index);
  };

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: 'Create Account',
      description: 'Sign up as a client or freelancer in minutes. Complete your profile and tell us what you need.',
      number: '01'
    },
    {
      id: 2,
      icon: <FaSearch />,
      title: 'Find or Post Work',
      description: 'Browse through top talent or post your project requirements. Our smart matching finds the best fit.',
      number: '02'
    },
    {
      id: 3,
      icon: <FaHandshake />,
      title: 'Connect & Collaborate',
      description: 'Communicate, share files, and collaborate seamlessly. Our platform makes teamwork easy.',
      number: '03'
    },
    {
      id: 4,
      icon: <FaRocket />,
      title: 'Deliver & Succeed',
      description: 'Receive quality work, make payments securely, and grow your business with top talent.',
      number: '04'
    }
  ];

  return (
    <section 
      id='how-it-works' 
      style={{
        background: 'rgba(8, 44, 94, 0.4)',
        padding: '100px 0',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        zIndex: 0
      }} />

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(8,44,94,0.95) 0%, rgba(8,44,94,0.9) 100%)',
        zIndex: 0
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{
            color: '#098a8b',
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.8rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Get Started in <span style={{ color: '#f9d28d' }}>4 Simple Steps</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Your journey to finding the perfect talent starts here
          </p>
          <div style={{
            width: '60px',
            height: '3px',
            background: '#098a8b',
            margin: '1.5rem auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Desktop View - All 4 in one row */}
        <div className="d-none d-lg-block" style={{ position: 'relative', marginBottom: '4rem' }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '5%',
            right: '5%',
            height: '3px',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#098a8b',
              transition: 'all 0.5s ease'
            }} />
          </div>

          <Row className="g-4">
            {steps.map((step, index) => (
              <Col key={step.id} lg={3}>
                <div style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {/* Icon Circle */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(9, 138, 139, 0.2)';
                    e.currentTarget.style.borderColor = '#098a8b';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(9, 138, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {/* Step Number Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '35px',
                      height: '35px',
                      background: '#098a8b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      boxShadow: '0 4px 15px rgba(9, 138, 139, 0.4)'
                    }}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div style={{
                      fontSize: '2.5rem',
                      color: '#098a8b'
                    }}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.8rem',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    margin: 0,
                    padding: '0 5px'
                  }}>
                    {step.description}
                  </p>

                  {/* Arrow Connector */}
                  {index < steps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '60px',
                      right: '-25px',
                      color: '#098a8b',
                      fontSize: '1.2rem',
                      opacity: 0.6,
                      zIndex: 2
                    }}>
                      <FaArrowRight />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Mobile/Tablet View - Scrollable Bar */}
        <div className="d-lg-none" style={{ marginBottom: '3rem' }}>
          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              padding: '20px 10px',
              margin: '0 -10px'
            }}
            className="hide-scrollbar"
          >
            {steps.map((step) => (
              <div 
                key={step.id}
                style={{
                  flex: '0 0 calc(100% - 40px)',
                  scrollSnapAlign: 'center',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '30px 20px',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Icon Circle */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Step Number Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '30px',
                    height: '30px',
                    background: '#098a8b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(9, 138, 139, 0.4)'
                  }}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div style={{
                    fontSize: '2rem',
                    color: '#098a8b'
                  }}>
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.8rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {step.title}
                </h4>

                {/* Description */}
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll Progress Bar */}
          <div style={{
            marginTop: '1.5rem',
            padding: '0 10px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              alignItems: 'center'
            }}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  onClick={() => scrollToStep(index)}
                  style={{
                    width: index === activeIndex ? '30px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: index === activeIndex ? '#098a8b' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Hide scrollbar styles */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;