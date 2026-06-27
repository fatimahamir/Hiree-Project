import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import API from '../../api/axiosConfig';

const ActiveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects?provider=true');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (status) => {
    const progress = {
      'pending': 25,
      'accepted': 50,
      'in_progress': 75,
      'completed': 100,
    };
    return progress[status] || 0;
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': <Badge bg="warning">Pending</Badge>,
      'accepted': <Badge bg="info">Accepted</Badge>,
      'in_progress': <Badge bg="primary">In Progress</Badge>,
      'completed': <Badge bg="success">Completed</Badge>,
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Active Projects</h1>
          <p className="text-muted">Track your ongoing projects</p>
        </Col>
      </Row>

      {projects.length === 0 ? (
        <Card className="text-center p-5">
          <h4>No active projects</h4>
          <p className="text-muted">Accept a request to start working</p>
        </Card>
      ) : (
        <Row className="g-4">
          {projects.map((project) => (
            <Col md={6} key={project._id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{project.title}</h5>
                      <p className="text-muted small mb-0">
                        Client: {project.customer?.name}
                      </p>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <p className="mb-3">{project.description}</p>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Progress</small>
                      <small className="fw-bold">{getStatusProgress(project.status)}%</small>
                    </div>
                    <ProgressBar 
                      now={getStatusProgress(project.status)} 
                      variant={project.status === 'completed' ? 'success' : 'primary'}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted d-block">Budget</small>
                      <strong className="text-success">Rs. {project.budget}</strong>
                    </div>
                    <div>
                      <small className="text-muted d-block">Deadline</small>
                      <strong>
                        <FaClock className="me-1" />
                        {new Date(project.deadline).toLocaleDateString()}
                      </strong>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ActiveProjects;