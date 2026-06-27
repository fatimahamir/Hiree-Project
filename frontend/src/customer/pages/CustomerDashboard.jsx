import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, FaClock, FaBell, FaCheck, FaTimes,
  FaUser, FaPaperPlane, FaMoneyBillWave, FaStar, FaSyncAlt, FaTrash
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/useSocket';

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const socketRef = useSocket();

  useEffect(() => {
    if (!socketRef.current || !user) return;

    socketRef.current.emit("join", user._id);

    socketRef.current.on("serviceRequestStatusUpdated", (data) => {
      console.log("🔔 Service request status updated:", data);
      
      setMyRequests(prev => 
        prev.map(req => 
          req._id === data.requestId ? { ...req, status: data.status } : req
        )
      );

      if (data.status === 'accepted') {
        toast.success(`✅ ${data.freelancerName} accepted your request for "${data.serviceTitle}"!`);
      } else if (data.status === 'rejected') {
        toast.info(`❌ ${data.freelancerName} rejected your request for "${data.serviceTitle}".`);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("serviceRequestStatusUpdated");
      }
    };
  }, [user, socketRef]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [proposalsRes, myReqsRes, servicesRes] = await Promise.all([
        API.get("/job-applications?section=received-proposals"),
        API.get("/service-requests?section=my-requests"),
        API.get("/services")
      ]);

      setReceivedProposals(Array.isArray(proposalsRes.data) ? proposalsRes.data.slice(0, 6) : []);
      setMyRequests(Array.isArray(myReqsRes.data) ? myReqsRes.data.slice(0, 6) : []);
      setRecentServices(Array.isArray(servicesRes.data) ? servicesRes.data.slice(0, 4) : []);

    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAccept = async (proposalId) => {
    try {
      const res = await API.put(`/job-applications/${proposalId}/status`, { status: 'accepted' });
      
      setReceivedProposals(prev => 
        prev.map(item => item._id === proposalId ? { ...item, status: 'accepted' } : item)
      );
      
      toast.success('Proposal accepted successfully!');
    } catch (error) {
      console.error('Error accepting proposal:', error);
      toast.error(error.response?.data?.message || 'Failed to accept proposal');
    }
  };

  const handleReject = async (proposalId) => {
    try {
      const res = await API.put(`/job-applications/${proposalId}/status`, { status: 'rejected' });
      
      setReceivedProposals(prev => 
        prev.map(item => item._id === proposalId ? { ...item, status: 'rejected' } : item)
      );
      
      toast.success('Proposal declined successfully!');
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      toast.error(error.response?.data?.message || 'Failed to reject proposal');
    }
  };

  const handleDeleteProposal = async (id) => {
    try {
      await API.delete(`/job-applications/${id}`);
      setReceivedProposals(prev => prev.filter(item => item._id !== id));
      toast.success("Proposal removed");
    } catch (err) {
      toast.error("Unable to remove proposal");
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await API.delete(`/service-requests/${id}`);
      setMyRequests(prev => prev.filter(item => item._id !== id));
      toast.success("Request removed");
    } catch (err) {
      toast.error("Unable to remove request");
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
                      Received Proposals
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      From Freelancers
                    </small>
                  </div>
                </div>

                {receivedProposals.length === 0 ? (
                  <div className="text-center py-5">
                    <FaClock size={48} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h5 style={{ color: '#ffffff', opacity: 0.7 }}>No proposals yet</h5>
                    <p style={{ color: '#ffffff', opacity: 0.5 }}>Post a job to receive proposals from freelancers</p>
                    <Link to="/customer/post-job">
                      <Button style={{ 
                        background: '#098a8b', 
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 25px',
                        color: '#fff',
                        fontWeight: '600'
                      }}>
                        Post a Job
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {receivedProposals.map((proposal, index) => {
                      const isAccepted = proposal.status === 'accepted';
                      const isRejected = proposal.status === 'rejected';
                      const canTakeAction = proposal.status === "pending";
                      
                      return (
                        <Card 
                          key={proposal._id} 
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
                                    {proposal.freelancer?.name || 'Freelancer'}
                                  </h6>
                                  <small style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.8rem' }}>
                                    Applied for: {proposal.job?.title || 'Your Job'}
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
                                {proposal.status === "pending" && "Pending"}
                                {proposal.status === "accepted" && "✓ Hired"}
                                {proposal.status === "rejected" && "Declined"}
                              </Badge>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteProposal(proposal._id)}
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
                              {proposal.message?.substring(0, 100)}...
                            </p>

                            <div style={{ 
                              color: '#ffffff',
                              opacity: 0.7,
                              fontSize: '0.8rem',
                              marginBottom: '12px'
                            }}>
                              <FaClock className="me-1" style={{ color: '#098a8b' }} />
                              {new Date(proposal.createdAt).toLocaleDateString()}
                            </div>

                            {proposal.status === "pending" && canTakeAction && (
                              <div className="d-flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => handleAccept(proposal._id)}
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
                                  <FaCheck className="me-1" /> Hire
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleReject(proposal._id)}
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
                              <Link to={`/freelancer/profile/${proposal.freelancer?._id}`}>
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
                                  <FaUser className="me-2" /> View Freelancer Profile
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
                      Recent Services
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      Latest services from freelancers
                    </small>
                  </div>
                  <Link to="/find-talent" style={{ 
                    color: '#098a8b', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    View All
                  </Link>
                </div>

                {recentServices.length === 0 ? (
                  <div className="text-center py-4">
                    <FaBriefcase size={40} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h6 style={{ color: '#ffffff', opacity: 0.7 }}>No services posted yet</h6>
                    <p style={{ color: '#ffffff', opacity: 0.5, fontSize: '0.9rem' }}>Check back later for new services</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {recentServices.map((service) => (
                      <Card 
                        key={service._id}
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
                              {service.title}
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
                              {service.category}
                            </Badge>
                          </div>

                          <p style={{ 
                            color: '#ffffff',
                            opacity: 0.9, 
                            marginBottom: '10px',
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                          }}>
                            {service.description?.substring(0, 80)}...
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ 
                              color: '#f9d28d',
                              fontWeight: '700',
                              fontSize: '1.1rem'
                            }}>
                              <FaMoneyBillWave className="me-1" />
                              Rs. {service.price?.toLocaleString() || 0}
                            </div>
                            <div className="d-flex align-items-center" style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.85rem' }}>
                              <FaStar style={{ color: '#ffc107', marginRight: '5px' }} />
                              {service.provider?.averageRating || '0.0'}
                            </div>
                            <Link to={`/services/${service._id}`}>
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
                                View Details
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
                      My Requests
                    </h4>
                    <small style={{ color: '#ffffff', opacity: 0.7 }}>
                      Services you requested
                    </small>
                  </div>
                  <Link to="/find-talent" style={{ 
                    color: '#098a8b', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Find More
                  </Link>
                </div>

                {myRequests.length === 0 ? (
                  <div className="text-center py-4">
                    <FaPaperPlane size={40} style={{ color: '#098a8b', opacity: 0.5, marginBottom: '15px' }} />
                    <h6 style={{ color: '#ffffff', opacity: 0.7 }}>No requests sent yet</h6>
                    <p style={{ color: '#ffffff', opacity: 0.5, fontSize: '0.9rem' }}>Browse services and send requests to freelancers</p>
                    <Link to="/find-talent">
                      <Button size="sm" style={{ 
                        background: '#098a8b', 
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 20px',
                        fontWeight: '600',
                        color: '#fff'
                      }}>
                        Find Talent
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myRequests.map((request, index) => {
                      const isAccepted = request.status === 'accepted';
                      const isRejected = request.status === 'rejected';
                      
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
                              <div>
                                <h6 style={{ 
                                  color: '#ffffff',
                                  fontWeight: '600', 
                                  marginBottom: '5px',
                                  fontSize: '0.95rem'
                                }}>
                                  {request.service?.title || 'Service Request'}
                                </h6>
                                <small style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.8rem' }}>
                                  <FaUser className="me-1" style={{ color: '#098a8b' }} />
                                  To: {request.freelancer?.name || 'Freelancer'}
                                </small>
                              </div>
                              <Badge 
                                style={{ 
                                  borderRadius: '8px', 
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  background: isAccepted ? '#28a745' : isRejected ? '#dc3545' : '#f9d28d',
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
                              {request.message?.substring(0, 80)}...
                            </p>

                            <div style={{ 
                              color: '#ffffff',
                              opacity: 0.7,
                              fontSize: '0.8rem'
                            }}>
                              <FaClock className="me-1" style={{ color: '#098a8b' }} />
                              Sent: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
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

export default CustomerDashboard;