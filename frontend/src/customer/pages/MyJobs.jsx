import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaClock, FaDollarSign, FaUsers, FaTrash, FaEdit } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';

const MyJobs = () => {
  const { colors } = useContext(ThemeContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/posts?customer=me');
      setJobs(res.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE JOB FUNCTION
  const handleDeleteJob = async (jobId, jobTitle) => {
    // Confirmation dialog
    const confirmed = window.confirm(`Are you sure you want to delete "${jobTitle}"? This action cannot be undone.`);
    
    if (!confirmed) return;

    try {
      await API.delete(`/posts/${jobId}`);
      toast.success('Job deleted successfully!');
      fetchJobs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.pageBg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
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
        
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col md={8}>
            <h1 style={{ 
              color: colors.brand, 
              fontWeight: '700', 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '2.5rem', 
              marginBottom: '0.5rem' 
            }}>
              My Posted Jobs
            </h1>
            <p style={{ color: colors.text, opacity: 0.8 }}>
              Manage your job postings and review proposals
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <Link to="/customer/post-job">
              <Button style={{ 
                background: colors.accent, 
                border: 'none', 
                borderRadius: '12px', 
                padding: '12px 25px', 
                fontWeight: '600', 
                color: '#fff' 
              }}>
                + Post New Job
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <Card className="text-center border-0" style={{ 
            background: colors.cardBg, 
            borderRadius: '20px', 
            border: `1px solid ${colors.border}`, 
            padding: '60px 20px' 
          }}>
            <FaBriefcase size={60} style={{ color: colors.text, opacity: 0.3, marginBottom: '20px' }} />
            <h3 style={{ color: colors.brand, fontWeight: '700' }}>No jobs posted yet</h3>
            <p style={{ color: colors.text, opacity: 0.7 }}>
              Post your first job to start receiving proposals from freelancers.
            </p>
            <Link to="/customer/post-job">
              <Button style={{ 
                background: colors.accent, 
                border: 'none', 
                borderRadius: '12px', 
                padding: '10px 25px', 
                color: '#fff' 
              }}>
                Post a Job
              </Button>
            </Link>
          </Card>
        ) : (
          <Row className="g-4">
            {jobs.map((job) => (
              <Col lg={6} key={job._id}>
                <Card 
                  className="h-100 border-0" 
                  style={{ 
                    background: colors.cardBg, 
                    borderRadius: '20px', 
                    border: `1px solid ${colors.border}`, 
                    transition: 'all 0.3s' 
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
                  <Card.Body className="p-4">
                    
                    {/* Category & Status */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge style={{ 
                        background: colors.accent, 
                        color: '#fff', 
                        padding: '6px 12px', 
                        borderRadius: '8px' 
                      }}>
                        {job.category}
                      </Badge>
                      <Badge bg="success" style={{ borderRadius: '8px' }}>
                        Active
                      </Badge>
                    </div>

                    {/* Job Title */}
                    <h5 style={{ 
                      color: colors.brand, 
                      fontWeight: '700', 
                      marginBottom: '10px' 
                    }}>
                      {job.title}
                    </h5>

                    {/* Description */}
                    <p style={{ 
                      color: colors.text, 
                      opacity: 0.8, 
                      marginBottom: '20px' 
                    }}>
                      {job.description?.substring(0, 120)}...
                    </p>
                    
                    {/* Budget & Proposals */}
                    <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                      <div>
                        <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem' }}>Budget</div>
                        <div style={{ color: colors.accent, fontWeight: '700' }}>
                          <FaDollarSign className="me-1" />Rs. {job.budget}
                        </div>
                      </div>
                      <div className="text-end">
                        <div style={{ color: colors.text, opacity: 0.6, fontSize: '0.8rem' }}>Proposals</div>
                        <div style={{ color: colors.text, fontWeight: '600' }}>
                          <FaUsers className="me-1" /> {job.proposalsCount || 0}
                        </div>
                      </div>
                    </div>

                    {/* ✅ ACTION BUTTONS - Edit & Delete */}
                    <div className="d-flex gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                      <Button 
                        size="sm"
                        style={{ 
                          background: colors.accent, 
                          border: 'none', 
                          borderRadius: '8px',
                          flex: 1,
                          padding: '8px',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          color: '#fff'
                        }}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleDeleteJob(job._id, job.title)}
                        style={{ 
                          background: 'transparent',
                          border: '2px solid #dc3545',
                          color: '#dc3545',
                          borderRadius: '8px',
                          flex: 1,
                          padding: '8px',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}
                      >
                        <FaTrash className="me-1" /> Delete
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

export default MyJobs;