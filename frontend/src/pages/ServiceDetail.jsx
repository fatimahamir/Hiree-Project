import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Badge, Alert } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaClock, FaDollarSign, FaUserCircle, FaPaperPlane, FaArrowLeft, FaCheckCircle, FaBriefcase } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const ServiceDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first to send a request');
      navigate('/login');
      return;
    }
    
    if (user.role !== 'customer') {
      toast.error('Only customers can send service requests');
      return;
    }

    setSending(true);
    try {
      // ✅ FIXED ENDPOINT
      await API.post('/service-requests', {
        type: 'service_request',               // Type zaroori hai backend ke liye
        freelancer: service.provider?._id,     // Freelancer ki ID
        service: service._id,                  // Service ki ID
        message                                // Cover letter / message
      });
      
      toast.success('Request sent successfully! 🎉');
      setMessage('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error('Send Request Error:', error);
      toast.error(error.response?.data?.message || 'Failed to send request');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner animation="border" style={{ color: colors.brand }} />
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card className="border-0 text-center p-5" style={{ background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.border}` }}>
          <h3 style={{ color: colors.brand }}>Service not found</h3>
          <Link to="/find-talent" style={{ color: colors.accent }}>← Back to Services</Link>
        </Card>
      </div>
    );
  }

  const provider = service.provider || {};

  return (
    <div style={{ minHeight: '100vh', background: colors.pageBg, transition: 'all 0.3s ease', padding: '2rem 0' }}>
      <Container>
        
        {/* Back Button */}
        <Link to="/find-talent" className="text-decoration-none mb-4 d-inline-flex align-items-center" style={{ color: colors.accent }}>
          <FaArrowLeft className="me-2" /> Back to Services
        </Link>

        <Row className="g-4 mt-2">
          
          {/* Left Column: Service Details */}
          <Col lg={8}>
            <Card className="border-0 mb-4" style={{ background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
              {/* Banner */}
              <div style={{ 
                height: '180px', 
                background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.accent} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Badge style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: '#fff', 
                  padding: '10px 20px', 
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}>
                  <FaBriefcase className="me-2" /> {service.category}
                </Badge>
              </div>

              <Card.Body className="p-4 p-md-5">
                <h1 style={{ 
                  color: colors.brand, 
                  fontWeight: '700',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.2rem',
                  marginBottom: '20px',
                  lineHeight: '1.3'
                }}>
                  {service.title}
                </h1>

                {/* Provider Info */}
                <div className="d-flex align-items-center mb-4 p-3" style={{ 
                  background: colors.inputBg, 
                  borderRadius: '15px',
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    overflow: 'hidden'
                  }}>
                    {provider.profilePic ? (
                      <img src={provider.profilePic} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaUserCircle size={35} style={{ color: '#fff' }} />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h6 style={{ color: colors.text, fontWeight: '700', marginBottom: '3px' }}>
                      {provider.name || 'Freelancer'}
                    </h6>
                    <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.85rem', color: colors.text, opacity: 0.7 }}>
                      <span className="d-flex align-items-center">
                        <FaStar style={{ color: '#ffc107', marginRight: '4px' }} /> 
                        {provider.averageRating || '0.0'}
                      </span>
                      <span>• Professional Freelancer</span>
                    </div>
                  </div>
                  <Link to={`/freelancer/profile/${provider._id}`} style={{ color: colors.accent, textDecoration: 'none', fontSize: '0.9rem' }}>
                    View Profile →
                  </Link>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>
                    Service Description
                  </h4>
                  <p style={{ 
                    color: colors.text, 
                    opacity: 0.9, 
                    lineHeight: '1.8', 
                    fontSize: '1.05rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Features/Highlights */}
                <div className="d-flex flex-wrap gap-3">
                  <div className="d-flex align-items-center" style={{ color: colors.text, opacity: 0.8 }}>
                    <FaCheckCircle className="me-2" style={{ color: colors.accent }} />
                    High Quality Work
                  </div>
                  <div className="d-flex align-items-center" style={{ color: colors.text, opacity: 0.8 }}>
                    <FaCheckCircle className="me-2" style={{ color: colors.accent }} />
                    On Time Delivery
                  </div>
                  <div className="d-flex align-items-center" style={{ color: colors.text, opacity: 0.8 }}>
                    <FaCheckCircle className="me-2" style={{ color: colors.accent }} />
                    Unlimited Revisions
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Price & Action */}
          <Col lg={4}>
            {/* Price Card */}
            <Card className="border-0 mb-4" style={{ 
              background: colors.cardBg, 
              borderRadius: '20px', 
              border: `1px solid ${colors.border}`,
              position: 'sticky',
              top: '100px'
            }}>
              <Card.Body className="p-4">
                {/* Price */}
                <div className="text-center mb-4 pb-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Starting at
                  </div>
                  <div style={{ color: colors.accent, fontWeight: '700', fontSize: '2.5rem' }}>
                    Rs. {service.price?.toLocaleString() || 0}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <FaClock style={{ color: colors.accent, marginRight: '10px', fontSize: '1.2rem' }} />
                    <span style={{ color: colors.text, opacity: 0.8 }}>Delivery Time</span>
                  </div>
                  <strong style={{ color: colors.text, fontSize: '1.1rem' }}>
                    {service.deliveryTime || 7} Days
                  </strong>
                </div>

                {/* Request Form (Only for Customers) */}
                {user?.role === 'customer' && (
                  <>
                    <h5 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>
                      <FaPaperPlane className="me-2" /> Send a Request
                    </h5>

                    {sent && (
                      <Alert variant="success" style={{ borderRadius: '12px', border: 'none', background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}>
                        <FaCheckCircle className="me-2" /> Request sent successfully!
                      </Alert>
                    )}

                    <Form onSubmit={handleSendRequest}>
                      <Form.Group className="mb-3">
                        <Form.Control 
                          as="textarea" 
                          rows={5}
                          placeholder="Hi, I'm interested in your service. Please tell me more about..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            border: `1px solid ${colors.border}`, 
                            background: colors.inputBg, 
                            color: colors.text,
                            resize: 'none'
                          }}
                        />
                      </Form.Group>
                      <Button 
                        type="submit" 
                        disabled={sending || !message.trim()}
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ 
                          background: colors.accent, 
                          border: 'none', 
                          borderRadius: '12px', 
                          padding: '14px',
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: '#fff',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => !sending && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {sending ? (
                          <><Spinner animation="border" size="sm" className="me-2" /> Sending...</>
                        ) : (
                          <><FaPaperPlane className="me-2" /> Send Request</>
                        )}
                      </Button>
                    </Form>
                  </>
                )}

                {/* If user is not logged in */}
                {!user && (
                  <div className="text-center">
                    <p style={{ color: colors.text, opacity: 0.7, marginBottom: '15px' }}>
                      Login to send a request
                    </p>
                    <Link to="/login">
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
                        Login Now
                      </Button>
                    </Link>
                  </div>
                )}

                {/* If user is a freelancer (can't send request) */}
                {user?.role === 'provider' && (
                  <div className="text-center p-3" style={{ background: colors.inputBg, borderRadius: '12px' }}>
                    <p style={{ color: colors.text, opacity: 0.7, marginBottom: 0, fontSize: '0.9rem' }}>
                      This is your service listing
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceDetail;