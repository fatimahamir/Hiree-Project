import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaClock, FaTag } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';

const MyServices = () => {
  const { colors } = useContext(ThemeContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services?provider=me');
      setServices(res.data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await API.delete(`/services/${id}`);
        setServices(services.filter(s => s._id !== id));
      } catch (err) {
        alert('Failed to delete service');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.pageBg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        <Spinner animation="border" style={{ color: colors.brand }} />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.pageBg, 
      transition: 'all 0.3s ease',
      padding: '2rem 0'
    }}>
      <Container fluid className="px-4 px-lg-5">
        
        {/* Header Section */}
        <Row className="mb-4 align-items-center">
          <Col md={8}>
            <h1 style={{ 
              color: colors.brand, 
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              My Services
            </h1>
            <p style={{ color: colors.text, opacity: 0.8, fontSize: '1.1rem' }}>
              Manage your service listings and track performance
            </p>
          </Col>
          <Col md={4} className="text-md-end mt-3 mt-md-0">
            <Link to="/freelancer/create-service" className="text-decoration-none">
              <Button 
                style={{
                  background: colors.accent,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 25px',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <FaPlus /> Create New Service
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            color: '#dc3545',
            padding: '15px 20px',
            borderRadius: '12px',
            border: '1px solid #dc3545',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {/* Empty State */}
        {services.length === 0 ? (
          <Card 
            className="text-center border-0"
            style={{
              background: colors.cardBg,
              borderRadius: '20px',
              border: `1px solid ${colors.border}`,
              padding: '60px 20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Card.Body>
              <FaBoxOpen size={60} style={{ color: colors.text, opacity: 0.3, marginBottom: '20px' }} />
              <h3 style={{ color: colors.brand, fontWeight: '700', marginBottom: '10px' }}>No services yet</h3>
              <p style={{ color: colors.text, opacity: 0.7, maxWidth: '500px', margin: '0 auto 30px' }}>
                Create your first service to start getting clients and grow your freelance business.
              </p>
              <Link to="/freelancer/create-service" className="text-decoration-none">
                <Button 
                  style={{
                    background: colors.accent,
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 30px',
                    fontWeight: '600',
                    color: '#fff'
                  }}
                >
                  <FaPlus className="me-2" /> Create Service
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {services.map((service) => (
              <Col lg={4} md={6} key={service._id}>
                <Card 
                  className="h-100 border-0"
                  style={{
                    background: colors.cardBg,
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`,
                    transition: 'all 0.3s',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Card.Body className="p-4 d-flex flex-column">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span style={{
                        background: colors.inputBg,
                        color: colors.accent,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <FaTag size={10} /> {service.category || 'General'}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 style={{ 
                      color: colors.brand, 
                      fontWeight: '700', 
                      marginBottom: '10px',
                      fontSize: '1.2rem',
                      lineHeight: '1.4'
                    }}>
                      {service.title}
                    </h5>

                    {/* Description */}
                    <p style={{ 
                      color: colors.text, 
                      opacity: 0.8, 
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      flex: 1
                    }}>
                      {service.description ? service.description.substring(0, 100) + '...' : 'No description provided.'}
                    </p>
                    
                    {/* Price & Delivery Time */}
                    <div className="d-flex justify-content-between align-items-center mb-4" style={{ 
                      padding: '15px', 
                      background: colors.inputBg, 
                      borderRadius: '12px' 
                    }}>
                      <div>
                        <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem', marginBottom: '2px' }}>Price</div>
                        <div style={{ color: colors.accent, fontWeight: '700', fontSize: '1.3rem' }}>
                          Rs. {service.price?.toLocaleString() || 0}
                        </div>
                      </div>
                      <div className="text-end">
                        <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem', marginBottom: '2px' }}>Delivery</div>
                        <div style={{ color: colors.text, fontWeight: '600', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
                          <FaClock size={12} /> {service.deliveryTime || 0} days
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-auto">
                      <Link to={`/freelancer/edit-service/${service._id}`} className="flex-fill text-decoration-none">
                        <Button 
                          className="w-100 d-flex align-items-center justify-content-center"
                          style={{
                            background: 'transparent',
                            border: `1px solid ${colors.accent}`,
                            color: colors.accent,
                            borderRadius: '10px',
                            padding: '10px',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.accent;
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = colors.accent;
                          }}
                        >
                          <FaEdit className="me-2" /> Edit
                        </Button>
                      </Link>
                      <Button 
                        className="flex-fill d-flex align-items-center justify-content-center"
                        onClick={() => handleDelete(service._id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid #dc3545',
                          color: '#dc3545',
                          borderRadius: '10px',
                          padding: '10px',
                          fontWeight: '600',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#dc3545';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#dc3545';
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyServices;