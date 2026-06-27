import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RequestCard from '../components/RequestCard';
import API from '../../api/axiosConfig';

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/requests?received=true');
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await API.put(`/requests/${requestId}/accept`);
      toast.success('Request accepted!');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to accept request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await API.put(`/requests/${requestId}/reject`);
      toast.success('Request rejected');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

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
          <h1 className="fw-bold">Received Requests</h1>
          <p className="text-muted">Manage client proposals</p>
        </Col>
      </Row>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All ({requests.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')}
          >
            Pending ({requests.filter(r => r.status === 'pending').length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={filter === 'accepted'} 
            onClick={() => setFilter('accepted')}
          >
            Accepted ({requests.filter(r => r.status === 'accepted').length})
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {filteredRequests.length === 0 ? (
        <Card className="text-center p-5">
          <h4>No requests found</h4>
          <p className="text-muted">
            {filter === 'all' ? "You haven't received any requests yet" : `No ${filter} requests`}
          </p>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            {filteredRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onAccept={handleAccept}
                onReject={handleReject}
                showActions={request.status === 'pending'}
              />
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ReceivedRequests;