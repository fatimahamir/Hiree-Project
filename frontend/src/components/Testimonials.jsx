// components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/test.webp';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('lg');

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setScreenSize('lg');
      } else if (window.innerWidth >= 768) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Michael Chen',
      company: 'MDS Manufacturing',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      text: 'Found exceptional web developers for our e-commerce platform. The quality of talent and quick turnaround time exceeded our expectations.'
    },
    {
      id: 2,
      name: 'Diane Roberts',
      company: 'ABC Rentals',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      text: 'Hired a graphic designer who transformed our brand identity. Professional service and amazing results. Highly recommend this platform!'
    },
    {
      id: 3,
      name: 'Allison Martinez',
      company: 'Grand Party Rental',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      text: 'Connected with talented digital marketers who increased our online presence by 300%. Best investment for our growing business.'
    },
    {
      id: 4,
      name: 'James Wilson',
      company: 'Tech Solutions Inc',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      text: 'As a service provider, this platform helped me grow my freelance business. Got 15+ long-term clients in just 3 months!'
    }
  ];

  // Determine how many cards to show based on screen size
  const cardsToShow = screenSize === 'lg' ? 3 : screenSize === 'md' ? 2 : 1;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials based on active index and screen size
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + cardsToShow);
  if (visibleTestimonials.length < cardsToShow) {
    const remaining = cardsToShow - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <section id='testimonials' style={{
      background: 'rgba(8, 44, 94, 0.2)',
      padding: '100px 0',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      minHeight: '600px'
    }}>
     <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
 
  zIndex: 0
}} />

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(8,44,94,0.9) 0%, rgba(8,44,94,0.85) 100%)',
        zIndex: 0
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-center">
          {/* Left Side - Heading & Description */}
          <Col lg={4} md={5} className="mb-4 mb-lg-0">
            {/* Large Quote Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              background: '#098a8b',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(9, 138, 139, 0.3)'
            }}>
              <FaQuoteLeft style={{ 
                color: '#ffffff', 
                fontSize: '2.5rem',
                opacity: 0.9
              }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.2rem',
              lineHeight: 1.3
            }}>
              Join Our Growing Community
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: '1.8',
              marginBottom: '1.5rem'
            }}>
              Whether you're a skilled professional looking to offer your services or a business seeking top talent, our platform connects you with the right opportunities.
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '2rem'
            }}>
              <li style={{
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '0.8rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  color: '#098a8b',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}>✓</span>
                Access 10,000+ verified professionals
              </li>
              <li style={{
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '0.8rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  color: '#098a8b',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}>✓</span>
                Post projects or offer your services
              </li>
              <li style={{
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '0.8rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  color: '#098a8b',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}>✓</span>
                Secure payments & dispute protection
              </li>
            </ul>

            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outline-light"
                style={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#ffffff';
                  e.target.style.color = 'rgba(8, 44, 94, 0.95)';
                  e.target.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#ffffff';
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                Register Now <FaArrowRight style={{ marginLeft: '8px', fontSize: '0.85rem' }} />
              </Button>
            </Link>
          </Col>

          {/* Right Side - Testimonial Cards */}
          <Col lg={8} md={7}>
            <Row className="g-4">
              {visibleTestimonials.map((testimonial, index) => (
                <Col key={testimonial.id} lg={4} md={6} sm={12}>
                  <Card style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: screenSize === 'lg' ? '380px' : '420px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
                  }}
                  >
                    {/* Image */}
                    <div style={{
                      height: screenSize === 'lg' ? '160px' : '180px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Card Body */}
                    <Card.Body style={{ 
                      padding: screenSize === 'lg' ? '1.2rem' : '1rem',
                      background: '#ffffff'
                    }}>
                      {/* Quote Icon */}
                      <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'rgba(9, 138, 139, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.8rem'
                      }}>
                        <FaQuoteLeft style={{ 
                          color: '#098a8b', 
                          fontSize: '0.9rem' 
                        }} />
                      </div>

                      {/* Text - Fixed height with ellipsis */}
                      <p style={{
                        color: '#555',
                        fontSize: screenSize === 'lg' ? '0.85rem' : '0.8rem',
                        lineHeight: '1.5',
                        marginBottom: '1rem',
                        height: screenSize === 'lg' ? '75px' : '65px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {testimonial.text}
                      </p>

                      {/* Name & Company */}
                      <div>
                        <h6 style={{
                          color: 'rgba(8, 44, 94, 0.95)',
                          fontWeight: 700,
                          fontSize: screenSize === 'lg' ? '0.95rem' : '0.9rem',
                          marginBottom: '0.2rem'
                        }}>
                          {testimonial.name}
                        </h6>
                        <small style={{
                          color: '#098a8b',
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}>
                          {testimonial.company}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Navigation Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2.5rem',
              paddingLeft: '10px'
            }}>
              {/* Arrow Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={prevTestimonial}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#098a8b';
                    e.target.style.borderColor = '#098a8b';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextTestimonial}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#098a8b';
                    e.target.style.borderColor = '#098a8b';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Dots Indicator */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;