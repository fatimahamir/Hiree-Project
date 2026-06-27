// components/Categories.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import category images directly from assets folder
import webDevImg from '../assets/webdev.jpg';
import appDevImg from '../assets/app.jpg';
import graphicDesignImg from '../assets/graphic.jpg';
import uiuxImg from '../assets/uiux.jpg';
import digitalMarketingImg from '../assets/digital.jpg';
import videoEditingImg from '../assets/video.jpg';
import dataAnalyticsImg from '../assets/data.jpg';
import photographyImg from '../assets/photo.webp';
import aiMlImg from '../assets/ailml.jpg';
import cloudImg from '../assets/cloud.jpg';
import cybersecurityImg from '../assets/cyber.jpg';
import databaseImg from '../assets/db.jpg';

const Categories = () => {
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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { 
      id: 1,
      image: webDevImg,
      title: 'Web Development',
      count: '1,200+',
      slug: 'web-development',
      color: '#098a8b'
    },
    { 
      id: 2,
      image: appDevImg,
      title: 'App Development',
      count: '850+',
      slug: 'app-development',
      color: '#f9d28d'
    },
    { 
      id: 3,
      image: graphicDesignImg,
      title: 'Graphic Design',
      count: '950+',
      slug: 'graphic-design',
      color: '#f1dcc1'
    },
    { 
      id: 4,
      image: uiuxImg,
      title: 'UI/UX Designing',
      count: '720+',
      slug: 'ui-ux-design',
      color: '#098a8b'
    },
    { 
      id: 5,
      image: digitalMarketingImg,
      title: 'Digital Marketing',
      count: '680+',
      slug: 'digital-marketing',
      color: '#f9d28d'
    },
    { 
      id: 6,
      image: videoEditingImg,
      title: 'Video Editing',
      count: '540+',
      slug: 'video-editing',
      color: '#f1dcc1'
    },
    { 
      id: 7,
      image: dataAnalyticsImg,
      title: 'Data Analytics',
      count: '430+',
      slug: 'data-analytics',
      color: '#098a8b'
    },
    { 
      id: 8,
      image: photographyImg,
      title: 'Photography',
      count: '380+',
      slug: 'photography',
      color: '#f9d28d'
    },
    { 
      id: 9,
      image: aiMlImg,
      title: 'AI & ML',
      count: '290+',
      slug: 'ai-ml',
      color: '#f1dcc1'
    },
    { 
      id: 10,
      image: cloudImg,
      title: 'Cloud Computing',
      count: '350+',
      slug: 'cloud-computing',
      color: '#098a8b'
    },
    { 
      id: 11,
      image: cybersecurityImg,
      title: 'Cybersecurity',
      count: '310+',
      slug: 'cybersecurity',
      color: '#f9d28d'
    },
    { 
      id: 12,
      image: databaseImg,
      title: 'Database Management',
      count: '280+',
      slug: 'database-management',
      color: '#f1dcc1'
    }
  ];

  // Determine cards to show based on screen size
  const cardsToShow = screenSize === 'lg' ? 4 : screenSize === 'md' ? 3 : 1;
  
  const nextCategory = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  // Get visible categories
  const visibleCategories = categories.slice(activeIndex, activeIndex + cardsToShow);
  if (visibleCategories.length < cardsToShow) {
    const remaining = cardsToShow - visibleCategories.length;
    visibleCategories.push(...categories.slice(0, remaining));
  }

  return (
    <section id='categories' style={{
      background: 'rgba(8, 44, 94, 0.95)',
      padding: '100px 0',
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
        background: 'radial-gradient(circle at 30% 20%, rgba(9, 138, 139, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(249, 210, 141, 0.08) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            color: '#f9d28d',
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            Categories
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.8rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Browse <span style={{ color: '#f1dcc1' }}>Top Categories</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Find the perfect talent across multiple categories
          </p>
          <div style={{
            width: '60px',
            height: '3px',
            background: '#098a8b',
            margin: '1.5rem auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Categories Carousel with Side Arrows */}
        <div style={{ position: 'relative', marginBottom: '3rem', padding: '0 60px' }}>
          {/* Left Arrow */}
          <button
            onClick={prevCategory}
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem',
              zIndex: 10
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

          {/* Right Arrow */}
          <button
            onClick={nextCategory}
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem',
              zIndex: 10
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

          {/* Cards Grid */}
          <Row className="g-4">
            {visibleCategories.map((category) => (
              <Col 
                key={category.id} 
                lg={3} 
                md={4} 
                sm={12}
                className="d-flex"
              >
                <Link 
                  to={`/find-talent?category=${category.slug}`}
                  style={{ 
                    textDecoration: 'none',
                    flex: 1,
                    display: 'block'
                  }}
                >
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = '#098a8b';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(9, 138, 139, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    {/* Image Container */}
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img 
                        src={category.image} 
                        alt={category.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      {/* Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(8, 44, 94, 0.6) 100%)',
                        opacity: 0.4
                      }} />
                      
                      {/* Count Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(9, 138, 139, 0.95)',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        backdropFilter: 'blur(5px)'
                      }}>
                        {category.count} tasks
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      background: '#ffffff'
                    }}>
                      <h5 style={{
                        color: '#098a8b',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {category.title}
                      </h5>
                      <div style={{
                        width: '40px',
                        height: '3px',
                        background: category.color,
                        margin: '10px auto 0',
                        borderRadius: '2px'
                      }} />
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {/* Dots Indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '10px',
            marginTop: '2.5rem'
          }}>
            {categories.map((_, index) => (
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
      </Container>
    </section>
  );
};

export default Categories;