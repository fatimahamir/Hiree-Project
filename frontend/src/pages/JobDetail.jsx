import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Badge, Alert } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaClock, FaDollarSign, FaUserCircle, FaPaperPlane, FaArrowLeft, FaCheckCircle, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [sending, setSending] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

 const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first to apply');
      navigate('/login');
      return;
    }
    
    if (user.role !== 'provider') {
      toast.error('Only freelancers can apply for jobs');
      return;
    }

    setSending(true);
    try {
      // ✅ FIX: Customer ka object resolve karein taake ID sahi jaye
      const customerData = job.customer || job.user || {}; 
      
      await API.post("/job-applications", {
        customer: customerData._id, // ✅ Sahi customer ID bhejein
        job: job._id,
        message: coverLetter,
      });
      
      toast.success('Application sent successfully! 🎉');
      setCoverLetter('');
      setApplied(true);
      setTimeout(() => setApplied(false), 3000);
    } catch (error) {
      console.error('Apply Error:', error);
      // ✅ Backend se jo message aaye wo show karein (e.g., "Already applied")
      toast.error(error.response?.data?.message || 'Failed to apply');
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

  if (!job) {
    return (
      <div style={{ minHeight: '100vh', background: colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card className="border-0 text-center p-5" style={{ background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.border}` }}>
          <h3 style={{ color: colors.brand }}>Job not found</h3>
          <Link to="/find-work" style={{ color: colors.accent }}>← Back to Jobs</Link>
        </Card>
      </div>
    );
  }

  const customer = job.customer || job.user || {};

  return (
    <div style={{ minHeight: '100vh', background: colors.pageBg, transition: 'all 0.3s ease', padding: '2rem 0' }}>
      <Container>
        
        {/* Back Button */}
        <Link to="/find-work" className="text-decoration-none mb-4 d-inline-flex align-items-center" style={{ color: colors.accent }}>
          <FaArrowLeft className="me-2" /> Back to Jobs
        </Link>

        <Row className="g-4 mt-2">
          
          {/* Left Column: Job Details */}
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
                  <FaBuilding className="me-2" /> {job.category}
                </Badge>
              </div>

              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h1 style={{ 
                    color: colors.brand, 
                    fontWeight: '700',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.2rem',
                    lineHeight: '1.3',
                    flex: 1
                  }}>
                    {job.title}
                  </h1>
                  <Badge 
                    bg={job.status === 'open' ? 'success' : 'secondary'}
                    style={{ borderRadius: '10px', padding: '8px 15px', fontSize: '0.85rem' }}
                  >
                    {job.status === 'open' ? 'Open' : job.status}
                  </Badge>
                </div>

                {/* Customer Info */}
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
                    {customer.profilePic ? (
                      <img src={customer.profilePic} alt={customer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaUserCircle size={35} style={{ color: '#fff' }} />
                    )}
                  </div>
                  <div>
                    <h6 style={{ color: colors.text, fontWeight: '700', marginBottom: '3px' }}>
                      {customer.name || 'Client'}
                    </h6>
                    <div style={{ fontSize: '0.85rem', color: colors.text, opacity: 0.7 }}>
                      {customer.company || 'Verified Client'}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>
                    Job Description
                  </h4>
                  <p style={{ 
                    color: colors.text, 
                    opacity: 0.9, 
                    lineHeight: '1.8', 
                    fontSize: '1.05rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {job.description}
                  </p>
                </div>

                {/* Job Highlights */}
                <Row className="g-3">
                  <Col md={4}>
                    <div className="text-center p-3" style={{ 
                      background: colors.inputBg, 
                      borderRadius: '12px',
                      border: `1px solid ${colors.border}`
                    }}>
                      <FaDollarSign style={{ color: colors.accent, fontSize: '1.5rem', marginBottom: '8px' }} />
                      <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem' }}>Budget</div>
                      <div style={{ color: colors.brand, fontWeight: '700', fontSize: '1.1rem' }}>
                        Rs. {job.budget?.toLocaleString() || 0}
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3" style={{ 
                      background: colors.inputBg, 
                      borderRadius: '12px',
                      border: `1px solid ${colors.border}`
                    }}>
                      <FaCalendarAlt style={{ color: colors.accent, fontSize: '1.5rem', marginBottom: '8px' }} />
                      <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem' }}>Deadline</div>
                      <div style={{ color: colors.brand, fontWeight: '700', fontSize: '1.1rem' }}>
                        {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3" style={{ 
                      background: colors.inputBg, 
                      borderRadius: '12px',
                      border: `1px solid ${colors.border}`
                    }}>
                      <FaClock style={{ color: colors.accent, fontSize: '1.5rem', marginBottom: '8px' }} />
                      <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem' }}>Posted</div>
                      <div style={{ color: colors.brand, fontWeight: '700', fontSize: '1.1rem' }}>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Apply Form */}
          <Col lg={4}>
            <Card className="border-0" style={{ 
              background: colors.cardBg, 
              borderRadius: '20px', 
              border: `1px solid ${colors.border}`,
              position: 'sticky',
              top: '100px'
            }}>
              <Card.Body className="p-4">
                
                {/* Budget Highlight */}
                <div className="text-center mb-4 pb-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Budget
                  </div>
                  <div style={{ color: colors.accent, fontWeight: '700', fontSize: '2.5rem' }}>
                    Rs. {job.budget?.toLocaleString() || 0}
                  </div>
                </div>

                {/* Application Form (Only for Freelancers) */}
                {user?.role === 'provider' && (
                  <>
                    <h5 style={{ color: colors.brand, fontWeight: '700', marginBottom: '15px' }}>
                      <FaPaperPlane className="me-2" /> Apply for this Job
                    </h5>

                    {applied && (
                      <Alert variant="success" style={{ borderRadius: '12px', border: 'none', background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}>
                        <FaCheckCircle className="me-2" /> Application sent successfully!
                      </Alert>
                    )}

                    <Form onSubmit={handleApply}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text, fontWeight: '600', fontSize: '0.9rem' }}>
                          Cover Letter *
                        </Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={6}
                          placeholder="Hi, I'm interested in this job. Here's why I'm the perfect fit..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
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

                      <div className="mb-3 p-3" style={{ 
                        background: colors.inputBg, 
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        color: colors.text,
                        opacity: 0.8
                      }}>
                        <FaCheckCircle className="me-2" style={{ color: colors.accent }} />
                        Your application will be sent directly to the client
                      </div>

                      <Button 
                        type="submit" 
                        disabled={sending || !coverLetter.trim()}
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
                          <><Spinner animation="border" size="sm" className="me-2" /> Submitting...</>
                        ) : (
                          <><FaPaperPlane className="me-2" /> Submit Application</>
                        )}
                      </Button>
                    </Form>
                  </>
                )}

                {/* If user is not logged in */}
                {!user && (
                  <div className="text-center">
                    <p style={{ color: colors.text, opacity: 0.7, marginBottom: '15px' }}>
                      Login to apply for this job
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

                {/* If user is a customer (can't apply) */}
                {user?.role === 'customer' && (
                  <div className="text-center p-3" style={{ background: colors.inputBg, borderRadius: '12px' }}>
                    <p style={{ color: colors.text, opacity: 0.7, marginBottom: 0, fontSize: '0.9rem' }}>
                      This is your job posting
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

export default JobDetail;