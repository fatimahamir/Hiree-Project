import { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Welcome, <span className="text-warning">{user.name}</span>!</h2>
      <p className="text-muted">Role: <strong>{user.role.toUpperCase()}</strong></p>
      
      <Row className="mt-4">
        {user.role === 'customer' ? (
          <>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>0</h3>
                <p className="text-muted">Active Requests</p>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>0</h3>
                <p className="text-muted">Completed Projects</p>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>0</h3>
                <p className="text-muted">Messages</p>
              </Card>
            </Col>
          </>
        ) : (
          <>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>Rs. 0</h3>
                <p className="text-muted">Total Earnings</p>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>0</h3>
                <p className="text-muted">Active Projects</p>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3 text-center">
                <h3>0</h3>
                <p className="text-muted">Pending Requests</p>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <Card className="mt-4 p-4 shadow-sm">
        <h4>Profile Management</h4>
        <p>Update your skills, portfolio, and pricing from here.</p>
        <Button variant="outline-warning">Edit Profile</Button>
      </Card>
    </Container>
  );
};

export default Dashboard;