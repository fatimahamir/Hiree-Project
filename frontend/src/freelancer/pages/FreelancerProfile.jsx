import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { 
  FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone, 
  FaEdit, FaCommentDots, FaStar, FaClock, FaCheckCircle, FaArrowLeft, FaUserCircle
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';

const FreelancerProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgData, setMsgData] = useState({ subject: '', message: '' });

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const endpoint = id ? `/users/${id}` : '/users/profile';
      const res = await API.get(endpoint);
      setProfile(res.data);

      const userId = res.data._id;
      const servicesRes = await API.get(`/services?provider=${userId}`).catch(() => ({ data: [] }));
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await API.post('/messages', { receiverId: profile._id || profile.user?._id, ...msgData });
      toast.success('Message sent successfully! 📩');
      setShowMsgModal(false);
      setMsgData({ subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner animation="border" style={{ color: colors.brand }} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', background: colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card className="border-0 text-center p-5" style={{ background: colors.cardBg, borderRadius: '20px' }}>
          <h3 style={{ color: colors.brand }}>Freelancer not found</h3>
          <Link to="/" style={{ color: colors.accent }}>← Go Back</Link>
        </Card>
      </div>
    );
  }

  const isOwner = user?._id === profile?._id || user?._id === profile?.user?._id;
  const isCustomer = user?.role === 'customer';

  return (
    <div style={{ minHeight: '100vh', background: colors.pageBg, transition: 'all 0.3s ease', paddingBottom: '4rem' }}>
      <Container fluid className="px-4 px-lg-5 pt-4">
        
        {/* Back Button */}
        <Link to="/" className="text-decoration-none mb-3 d-inline-flex align-items-center" style={{ color: colors.accent }}>
          <FaArrowLeft className="me-2" /> Back
        </Link>

        {/* Profile Header Card */}
        <Card className="border-0 mb-4" style={{ borderRadius: '20px', overflow: 'hidden', background: colors.cardBg, border: `1px solid ${colors.border}` }}>
          <div style={{ height: '180px', background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.accent} 100%)` }}></div>
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-end" style={{ marginTop: '-90px' }}>
              <Col md={3} className="text-center text-md-start">
                <div style={{ 
                  width: '160px', height: '160px', borderRadius: '50%', 
                  border: `6px solid ${colors.cardBg}`, background: colors.inputBg, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  overflow: 'hidden', margin: '0 auto' 
                }}>
                  {profile?.profilePic || profile?.user?.profilePic ? (
                    <img src={profile?.profilePic || profile?.user?.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FaUserCircle size={80} style={{ color: colors.accent }} />
                  )}
                </div>
              </Col>
              <Col md={9} className="text-center text-md-start mt-3 mt-md-0">
                <h2 style={{ color: colors.brand, fontWeight: '700', fontFamily: "'Playfair Display', serif", fontSize: '2.2rem' }}>
                  {profile?.name || profile?.user?.name}
                </h2>
                <p style={{ color: colors.text, opacity: 0.8, fontSize: '1.1rem', marginBottom: '15px' }}>
                  <FaBriefcase className="me-2" style={{ color: colors.accent }} /> Professional Freelancer • {profile?.categories?.[0] || 'Expert'}
                </p>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 mb-4" style={{ color: colors.text, opacity: 0.7, fontSize: '0.95rem' }}>
                  {profile?.location && <span><FaMapMarkerAlt className="me-1" style={{ color: colors.accent }} /> {profile.location}</span>}
                  {profile?.email && <span><FaEnvelope className="me-1" style={{ color: colors.accent }} /> {profile.email}</span>}
                  {profile?.phone && <span><FaPhone className="me-1" style={{ color: colors.accent }} /> {profile.phone}</span>}
                </div>
                
                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                  {isOwner && (
                    <Link to="/account-setup">
                      <Button style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', color: '#fff' }}>
                        <FaEdit className="me-2" /> Edit Profile
                      </Button>
                    </Link>
                  )}
                  
                  {isCustomer && !isOwner && (
                    <>
                      <Button onClick={() => setShowMsgModal(true)} style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', color: '#fff' }}>
                        <FaCommentDots className="me-2" /> Send Message
                      </Button>
                      <a href={`mailto:${profile?.email || profile?.user?.email}`} style={{ textDecoration: 'none' }}>
                        <Button style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', color: '#fff' }}>
                          <FaEnvelope className="me-2" /> Contact via Email
                        </Button>
                      </a>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          <Col lg={8}>
            {/* About Me */}
            <Card className="border-0 mb-4" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}` }}>
              <Card.Body className="p-4">
                <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>About Me</h4>
                <p style={{ color: colors.text, opacity: 0.9, lineHeight: '1.8' }}>
                  {profile?.bio || "No bio added yet."}
                </p>
              </Card.Body>
            </Card>

            {/* Skills */}
            {profile?.skills && profile.skills.length > 0 && (
              <Card className="border-0 mb-4" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}` }}>
                <Card.Body className="p-4">
                  <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>Skills & Expertise</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} style={{ 
                        background: colors.accent, color: '#fff', 
                        padding: '8px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500'
                      }}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Services Posted by Freelancer */}
            {services.length > 0 && (
              <Card className="border-0" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}` }}>
                <Card.Body className="p-4">
                  <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '20px' }}>
                    <FaBriefcase className="me-2" style={{ color: colors.accent }} /> Services Offered
                  </h4>
                  <Row className="g-3">
                    {services.map((service) => (
                      <Col md={6} key={service._id}>
                        <div style={{ background: colors.inputBg, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                          <h6 style={{ color: colors.text, fontWeight: '700', marginBottom: '10px' }}>{service.title}</h6>
                          <p style={{ color: colors.text, opacity: 0.7, fontSize: '0.85rem', marginBottom: '15px' }}>
                            {service.description?.substring(0, 60)}...
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge style={{ background: colors.accent, color: '#fff', borderRadius: '8px' }}>{service.category}</Badge>
                            <span style={{ color: colors.accent, fontWeight: '700' }}>Rs. {service.price}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col lg={4}>
            <Card className="border-0" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}`, position: 'sticky', top: '100px' }}>
              <Card.Body className="p-4">
                <h5 style={{ color: colors.brand, fontWeight: '700', marginBottom: '20px' }}>Profile Overview</h5>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.text, opacity: 0.8 }}>Hourly Rate</span>
                  <strong style={{ color: colors.text }}>Rs. {profile?.hourlyRate || 0}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.text, opacity: 0.8 }}>Rating</span>
                  <strong style={{ color: colors.text, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaStar style={{ color: '#ffc107' }} /> {profile?.averageRating || '0.0'}
                  </strong>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.text, opacity: 0.8 }}>Status</span>
                  <Badge bg="success" style={{ borderRadius: '8px', padding: '5px 10px' }}>
                    <FaCheckCircle className="me-1" /> Available
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ color: colors.text, opacity: 0.8 }}>Categories</span>
                  <strong style={{ color: colors.text }}>{profile?.categories?.length || 0}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Chat Modal */}
      <Modal show={showMsgModal} onHide={() => setShowMsgModal(false)} centered contentClassName="border-0 rounded-4" style={{ '--bs-modal-bg': colors.cardBg, '--bs-modal-color': colors.text }}>
        <Modal.Header closeButton style={{ borderBottom: `1px solid ${colors.border}` }}>
          <Modal.Title style={{ color: colors.brand, fontWeight: '700' }}>
            <FaCommentDots className="me-2" /> Send Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Subject</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={msgData.subject} 
                onChange={(e) => setMsgData({...msgData, subject: e.target.value})}
                style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                required 
                value={msgData.message} 
                onChange={(e) => setMsgData({...msgData, message: e.target.value})}
                style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text }}
              />
            </Form.Group>
            <Button type="submit" style={{ width: '100%', background: colors.accent, border: 'none', borderRadius: '10px', padding: '12px', fontWeight: '600' }}>
              Send Message
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FreelancerProfile;