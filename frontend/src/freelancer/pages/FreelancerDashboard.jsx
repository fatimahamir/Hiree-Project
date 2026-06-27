import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, FaClock, FaBell, FaCheck, FaTimes,
  FaUser, FaPaperPlane, FaMoneyBillWave, FaSyncAlt, FaTrash
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { useSocket } from "../../hooks/useSocket";

const FreelancerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useSocket();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [incomingRes, applicationsRes, postsRes] = await Promise.all([
        API.get("/service-requests?section=incoming"),
        API.get("/job-applications?section=my-applications"),
        API.get("/posts")
      ]);

      setIncomingRequests(Array.isArray(incomingRes.data) ? incomingRes.data.slice(0, 6) : []);
      setMyApplications(Array.isArray(applicationsRes.data) ? applicationsRes.data : []);
      setRecentPosts(Array.isArray(postsRes.data) ? postsRes.data.slice(0, 4) : []);

    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!socketRef.current || !user) return;

    socketRef.current.emit("join", user._id);

    socketRef.current.on("applicationStatusUpdated", (data) => {
      console.log("🔔 Application status updated:", data);
      
      setMyApplications(prev => 
        prev.map(app => 
          app._id === data.applicationId 
            ? { ...app, status: data.status }
            : app
        )
      );

      if (data.status === 'accepted') {
        toast.success(`🎉 ${data.customerName} ne "${data.jobTitle}" ke liye aapki application ACCEPT kar li!`);
      } else if (data.status === 'rejected') {
        toast.info(`😔 ${data.customerName} ne "${data.jobTitle}" ke liye aapki application REJECT kar di.`);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("applicationStatusUpdated");
      }
    };
  }, [user, socketRef]);

  const handleAccept = async (requestId) => {
    try {
      await API.put(`/service-requests/${requestId}/status`, { status: 'accepted' });
      toast.success('Request accepted successfully!');
      
      setIncomingRequests(prev => 
        prev.map(item => item._id === requestId ? { ...item, status: 'accepted' } : item)
      );
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error(error.response?.data?.message || 'Failed to accept request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await API.put(`/service-requests/${requestId}/status`, { status: 'rejected' });
      toast.success('Request declined successfully!');
      
      setIncomingRequests(prev => 
        prev.map(item => item._id === requestId ? { ...item, status: 'rejected' } : item)
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error(error.response?.data?.message || 'Failed to reject request');
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await API.delete(`/service-requests/${id}`);
      setIncomingRequests(prev => prev.filter(item => item._id !== id));
      toast.success("Request removed");
    } catch (err) {
      toast.error("Unable to remove request");
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await API.delete(`/job-applications/${id}`);
      setMyApplications(prev => prev.filter(item => item._id !== id));
      toast.success("Application removed");
    } catch (err) {
      toast.error("Unable to remove application");
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
        <Spinner animation="border" style={{ color: colors.accent }} />
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
        
        <div className="d-flex justify-content-end mb-3">
          <Button 
            onClick={fetchDashboardData}
            style={{
              background: 'transparent',
              border: '1px solid #098a8b',
              color: '#098a8b',
              borderRadius: '8px',
              padding: '6px 15px',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            <FaSyncAlt className="me-2" /> Refresh Data
          </Button>
        </div>

        <Row className="g-4">
          
          <Col lg={7}>
            <Card className="border-1 h-100" style={{ 
              background: '#082c5e',
              borderRadius: '20px',
              border: '1px solid black',
              transition: 'all 0.3s'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4 style={{ 
                      color: '#ffffff',
                      fontWeight: '700', 
                      marginBottom: '5px',
                      fontSize: '1.3rem'
                    }}>
                      <FaBell className="me-2" style={{ color: '#098a8b' }} />
                      Incoming Requests
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      Client requests & Accepted projects
                    </small>
                  </div>
                </div>

                {incomingRequests.length === 0 ? (
                  <div className="text-center py-5">
                    <FaClock size={48} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h5 style={{ color: '#ffffff', opacity: 0.7 }}>No requests yet</h5>
                    <p style={{ color: '#ffffff', opacity: 0.5 }}>Client requests for your services will appear here</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {incomingRequests.map((request, index) => {
                      const isAccepted = request.status === "accepted";
                      const isRejected = request.status === "rejected";
                      const isFromClient = request.type === "service_request";
                      const canTakeAction = request.status === "pending";
                      
                      return (
                        <Card 
                          key={request._id} 
                          className="border-1 notification-card"
                          style={{
                            background: '#082c5e',
                            borderRadius: '12px',
                            border: `1px solid ${isAccepted ? '#098a8b' : isRejected ? '#dc3545' : 'black'}`,
                            borderLeft: `4px solid ${isAccepted ? '#098a8b' : isRejected ? '#dc3545' : '#098a8b'}`,
                            transition: 'all 0.3s ease',
                            animation: `slideIn 0.5s ease ${index * 0.1}s both`,
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(5px)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(9, 138, 139, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="d-flex align-items-center">
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  background: '#098a8b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginRight: '12px'
                                }}>
                                  <FaUser style={{ color: '#ffffff' }} />
                                </div>
                                <div>
                                  <h6 style={{ 
                                    color: '#ffffff',
                                    fontWeight: '600', 
                                    marginBottom: '2px',
                                    fontSize: '0.95rem'
                                  }}>
                                    {isFromClient 
                                      ? request.service?.title || 'Service Request'
                                      : request.job?.title || 'Accepted Project'
                                    }
                                  </h6>
                                  <small style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.8rem' }}>
                                    {isFromClient 
                                      ? `From: ${request.customer?.name || 'Client'}`
                                      : `Client: ${request.customer?.name || 'Client'}`
                                    }
                                  </small>
                                </div>
                              </div>
                              <Badge 
                                style={{ 
                                  borderRadius: '8px', 
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  background: isAccepted ? '#098a8b !important' : isRejected ? '#dc3545 !important' : '#f9d28d !important',
                                  color: isAccepted || isRejected ? '#fff' : '#000'
                                }}
                              >
                                {request.status === "pending" && "Pending"}
                                {request.status === "accepted" && "Accepted"}
                                {request.status === "rejected" && "Rejected"}
                              </Badge>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteRequest(request._id)}
                              >
                                <FaTrash />
                              </Button>
                            </div>

                            <p style={{ 
                              color: '#ffffff',
                              opacity: 0.9, 
                              marginBottom: '10px',
                              fontSize: '0.85rem',
                              lineHeight: '1.5'
                            }}>
                              {request.message?.substring(0, 100)}...
                            </p>

                            <div style={{ 
                              color: '#ffffff',
                              opacity: 0.7,
                              fontSize: '0.8rem',
                              marginBottom: '12px'
                            }}>
                              <FaClock className="me-1" style={{ color: '#098a8b' }} />
                              {isFromClient 
                                ? `Received: ${new Date(request.createdAt).toLocaleDateString()}`
                                : `Accepted: ${new Date(request.updatedAt).toLocaleDateString()}`
                              }
                            </div>

                            {request.status === "pending" && canTakeAction && (
                              <div className="d-flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => handleAccept(request._id)}
                                  style={{
                                    background: '#098a8b',
                                    border: 'none',
                                    borderRadius: '8px',
                                    flex: 1,
                                    padding: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                    color: '#fff'
                                  }}
                                >
                                  <FaCheck className="me-1" /> Accept
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleReject(request._id)}
                                  style={{ 
                                    background: 'transparent',
                                    border: '2px solid #ffffff',
                                    color: '#ffffff',
                                    borderRadius: '8px', 
                                    flex: 1,
                                    padding: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.85rem'
                                  }}
                                >
                                  <FaTimes /> Decline
                                </Button>
                              </div>
                            )}

                            {isAccepted && (
                              <Link to={`/customer/profile/${request.customer?._id}`}>
                                <Button 
                                  size="sm"
                                  style={{
                                    background: '#098a8b',
                                    border: 'none',
                                    borderRadius: '8px',
                                    width: '100%',
                                    padding: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                    color: '#fff'
                                  }}
                                >
                                  <FaUser className="me-2" /> View Customer Profile
                                </Button>
                              </Link>
                            )}
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            
            <Card className="border-1" style={{ 
              background: '#082c5e',
              borderRadius: '20px',
              border: '1px solid black',
              transition: 'all 0.3s'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4 style={{ 
                      color: '#ffffff',
                      fontWeight: '700', 
                      marginBottom: '5px',
                      fontSize: '1.3rem'
                    }}>
                      <FaBriefcase className="me-2" style={{ color: '#098a8b' }} />
                      Recent Jobs Posted
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      Latest opportunities from clients
                    </small>
                  </div>
                  <Link to="/find-work" style={{ 
                    color: '#098a8b', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    View All
                  </Link>
                </div>

                {recentPosts.length === 0 ? (
                  <div className="text-center py-4">
                    <FaBriefcase size={40} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h6 style={{ color: '#ffffff', opacity: 0.7 }}>No jobs posted yet</h6>
                    <p style={{ color: '#ffffff', opacity: 0.5, fontSize: '0.9rem' }}>Check back later for new opportunities</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {recentPosts.map((post) => (
                      <Card 
                        key={post._id}
                        className="border-0"
                        style={{
                          background: '#082c5e',
                          borderRadius: '12px',
                          border: 'none',
                          transition: 'all 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(9, 138, 139, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 style={{ 
                              color: '#ffffff',
                              fontWeight: '600', 
                              marginBottom: '5px',
                              fontSize: '0.95rem',
                              flex: 1
                            }}>
                              {post.title}
                            </h6>
                            <Badge 
                              style={{ 
                                background: '#098a8b',
                                color: '#fff',
                                borderRadius: '8px', 
                                padding: '5px 10px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              {post.category}
                            </Badge>
                          </div>

                          <p style={{ 
                            color: '#ffffff',
                            opacity: 0.9, 
                            marginBottom: '10px',
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                          }}>
                            {post.description?.substring(0, 80)}...
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ 
                              color: '#f9d28d',
                              fontWeight: '700',
                              fontSize: '1.1rem'
                            }}>
                              <FaMoneyBillWave className="me-1" />
                              Rs. {post.budget?.toLocaleString() || 0}
                            </div>
                            <Link to={`/jobs/${post._id}`}>
                              <Button 
                                size="sm"
                                style={{
                                  background: '#098a8b',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '6px 15px',
                                  fontSize: '0.85rem',
                                  fontWeight: '600',
                                  color: '#fff'
                                }}
                              >
                                Apply Now
                              </Button>
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="border-1 mt-4" style={{ 
              background: '#082c5e',
              borderRadius: '20px',
              border: '1px solid black',
              transition: 'all 0.3s'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4 style={{ 
                      color: '#ffffff',
                      fontWeight: '700', 
                      marginBottom: '5px',
                      fontSize: '1.3rem'
                    }}>
                      <FaPaperPlane className="me-2" style={{ color: '#098a8b' }} />
                      My Applications
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      Jobs you've applied for (Pending)
                    </small>
                  </div>
                  <Link to="/find-work" style={{ 
                    color: '#098a8b', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Find More
                  </Link>
                </div>

                {myApplications.length === 0 ? (
                  <div className="text-center py-4">
                    <FaPaperPlane size={40} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h6 style={{ color: '#ffffff', opacity: 0.7 }}>No applications yet</h6>
                    <p style={{ color: '#ffffff', opacity: 0.5, fontSize: '0.9rem' }}>Browse jobs and apply to start working</p>
                    <Link to="/find-work">
                      <Button size="sm" style={{ 
                        background: '#098a8b', 
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 20px',
                        fontWeight: '600',
                        color: '#fff'
                      }}>
                        Find Work
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myApplications.map((application, index) => (
                      <Card 
                        key={application._id} 
                        className="border-1 notification-card"
                        style={{
                          background: '#082c5e',
                          borderRadius: '12px',
                          border: `1px solid ${application.status === 'accepted' ? '#098a8b' : application.status === 'rejected' ? '#dc3545' : 'black'}`,
                          borderLeft: `4px solid ${application.status === 'accepted' ? '#098a8b' : application.status === 'rejected' ? '#dc3545' : '#098a8b'}`,
                          transition: 'all 0.3s ease',
                          animation: `slideIn 0.5s ease ${index * 0.1}s both`,
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(5px)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(9, 138, 139, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 style={{ 
                                color: '#ffffff',
                                fontWeight: '600', 
                                marginBottom: '5px',
                                fontSize: '0.95rem'
                              }}>
                                {application.job?.title || 'Job Application'}
                              </h6>
                              <small style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.8rem' }}>
                                <FaUser className="me-1" style={{ color: '#098a8b' }} />
                                To: {application.customer?.name || 'Client'}
                              </small>
                            </div>
                            <Badge
                              style={{ 
                                borderRadius: '8px', 
                                padding: '6px 12px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                background: application.status === 'accepted' ? '#28a745' : application.status === 'rejected' ? '#dc3545' : '#f9d28d',
                                color: application.status === 'accepted' || application.status === 'rejected' ? '#fff' : '#000'
                              }}
                            >
                              {application.status === "pending" && "Pending"}
                              {application.status === "accepted" && "Accepted"}
                              {application.status === "rejected" && "Rejected"}
                            </Badge>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteApplication(application._id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>

                          <p style={{ 
                            color: '#ffffff',
                            opacity: 0.9, 
                            marginBottom: '10px',
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                          }}>
                            {application.message?.substring(0, 80)}...
                          </p>

                          <div style={{ 
                            color: '#ffffff',
                            opacity: 0.7,
                            fontSize: '0.8rem'
                          }}>
                            <FaClock className="me-1" style={{ color: '#098a8b' }} />
                            Applied: {new Date(application.createdAt).toLocaleDateString()}
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FreelancerDashboard;