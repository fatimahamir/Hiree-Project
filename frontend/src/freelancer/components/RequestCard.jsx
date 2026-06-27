import { Card, Button, Badge } from 'react-bootstrap';
import { FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const RequestCard = ({ request, onAccept, onReject, showActions = true }) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: <Badge bg="warning">Pending</Badge>,
      accepted: <Badge bg="success">Accepted</Badge>,
      rejected: <Badge bg="danger">Rejected</Badge>,
      in_progress: <Badge bg="info">In Progress</Badge>,
      completed: <Badge bg="secondary">Completed</Badge>,
    };
    return badges[status] || badges.pending;
  };

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-1">{request.title}</h5>
            <p className="text-muted small mb-0">
              From: {request.customer?.name || 'Client'}
            </p>
          </div>
          {getStatusBadge(request.status)}
        </div>

        <Card.Text className="mb-3">
          {request.description || request.requirements}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className="text-muted d-block">Budget</small>
            <strong className="text-success">Rs. {request.budget}</strong>
          </div>
          <div>
            <small className="text-muted d-block">Deadline</small>
            <strong>
              <FaClock className="me-1" />
              {new Date(request.deadline).toLocaleDateString()}
            </strong>
          </div>
        </div>

        {showActions && request.status === 'pending' && (
          <div className="d-flex gap-2">
            <Button 
              variant="success" 
              className="flex-fill"
              onClick={() => onAccept(request._id)}
            >
              <FaCheck className="me-1" /> Accept
            </Button>
            <Button 
              variant="danger" 
              className="flex-fill"
              onClick={() => onReject(request._id)}
            >
              <FaTimes /> Decline
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RequestCard;