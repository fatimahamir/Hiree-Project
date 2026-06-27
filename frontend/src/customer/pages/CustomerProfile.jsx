import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaBriefcase, FaBuilding, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';

const CustomerProfile = () => {
  const { id } = useParams(); // ✅ URL se ID lega
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  
  const [profile, setProfile] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // ✅ Agar ID hai toh public profile, warna apni profile
      const endpoint = id ? `/users/${id}` : '/users/profile';
      const res = await API.get(endpoint);
      setProfile(res.data);
      
      // Is customer ki posted jobs fetch karein
      const userId = res.data._id || res.data.user?._id;
      const jobsRes = await API.get(`/posts?customer=${userId}`).catch(() => ({ data: [] }));
      setPostedJobs(jobsRes.data || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
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
          <h3 style={{ color: colors.brand }}>Customer not found</h3>
          <Link to="/" style={{ color: colors.accent }}>← Go Back</Link>
        </Card>
      </div>
    );
  }

  const isOwner = user?._id === profile?._id;

  return (
    <div style={{ minHeight: '100vh', background: colors.pageBg, transition: 'all 0.3s ease', paddingBottom: '4rem' }}>
      <Container fluid className="px-4 px-lg-5 pt-4">
        
        {/* Back Button */}
        <Link to="/" className="text-decoration-none mb-3 d-inline-flex align-items-center" style={{ color: colors.accent }}>
          <FaArrowLeft className="me-2" /> Back
        </Link>

        {/* Profile Header */}
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
                  {profile?.profilePic ? (
                    <img src={profile.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '4rem', color: colors.accent, fontWeight: 'bold' }}>
                      {(profile?.name || 'U')[0]}
                    </span>
                  )}
                </div>
              </Col>
              <Col md={9} className="text-center text-md-start mt-3 mt-md-0">
                <h2 style={{ color: colors.brand, fontWeight: '700', fontFamily: "'Playfair Display', serif", fontSize: '2.2rem' }}>
                  {profile?.name}
                </h2>
                <p style={{ color: colors.text, opacity: 0.8, fontSize: '1.1rem', marginBottom: '15px' }}>
                  <FaBuilding className="me-2" style={{ color: colors.accent }} /> {profile?.company || 'Verified Client'}
                </p>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 mb-4" style={{ color: colors.text, opacity: 0.7, fontSize: '0.95rem' }}>
                  {profile?.location && <span><FaMapMarkerAlt className="me-1" style={{ color: colors.accent }} /> {profile.location}</span>}
                  {profile?.email && <span><FaEnvelope className="me-1" style={{ color: colors.accent }} /> {profile.email}</span>}
                  {profile?.phone && <span><FaPhone className="me-1" style={{ color: colors.accent }} /> {profile.phone}</span>}
                </div>
                
                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                  {isOwner ? (
                    <Link to="/account-setup">
                      <Button style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', color: '#fff' }}>
                        <FaEdit className="me-2" /> Edit Profile
                      </Button>
                    </Link>
                  ) : (
                    <a href={`mailto:${profile?.email}`} style={{ textDecoration: 'none' }}>
                      <Button style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: '600', color: '#fff' }}>
                        <FaEnvelope className="me-2" /> Contact via Email
                      </Button>
                    </a>
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
                <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>About</h4>
                <p style={{ color: colors.text, opacity: 0.9, lineHeight: '1.8' }}>
                  {profile?.bio || "No bio added yet."}
                </p>
              </Card.Body>
            </Card>

            {/* Posted Jobs */}
            <Card className="border-0" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}` }}>
              <Card.Body className="p-4">
                <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '20px' }}>
                  <FaBriefcase className="me-2" style={{ color: colors.accent }} /> Posted Jobs
                </h4>
                {postedJobs.length === 0 ? (
                  <p style={{ color: colors.text, opacity: 0.7 }}>No jobs posted yet.</p>
                ) : (
                  <Row className="g-3">
                    {postedJobs.map((job) => (
                      <Col md={6} key={job._id}>
                        <div style={{ background: colors.inputBg, padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                          <h6 style={{ color: colors.text, fontWeight: '700', marginBottom: '10px' }}>{job.title}</h6>
                          <p style={{ color: colors.text, opacity: 0.7, fontSize: '0.85rem', marginBottom: '15px' }}>
                            {job.description?.substring(0, 60)}...
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge style={{ background: colors.accent, color: '#fff', borderRadius: '8px' }}>{job.category}</Badge>
                            <span style={{ color: colors.accent, fontWeight: '700' }}>Rs. {job.budget}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0" style={{ background: colors.cardBg, borderRadius: '15px', border: `1px solid ${colors.border}`, position: 'sticky', top: '100px' }}>
              <Card.Body className="p-4">
                <h5 style={{ color: colors.brand, fontWeight: '700', marginBottom: '20px' }}>Profile Overview</h5>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.text, opacity: 0.8 }}>Member Since</span>
                  <strong style={{ color: colors.text }}>{new Date(profile?.createdAt).toLocaleDateString()}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.text, opacity: 0.8 }}>Jobs Posted</span>
                  <strong style={{ color: colors.text }}>{postedJobs.length}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ color: colors.text, opacity: 0.8 }}>Status</span>
                  <Badge bg="success" style={{ borderRadius: '8px', padding: '5px 10px' }}>Active</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerProfile;