import { Card, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const PortfolioItem = ({ item, onEdit, onDelete }) => {
  return (
    <Card className="h-100 shadow-sm">
      {item.image && (
        <Card.Img 
          variant="top" 
          src={item.image} 
          alt={item.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title className="fw-bold">{item.title}</Card.Title>
        <Card.Text className="text-muted small">
          {item.description}
        </Card.Text>
        
        {item.link && (
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary text-decoration-none"
          >
            View Project →
          </a>
        )}

        <div className="d-flex gap-2 mt-3">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="flex-fill"
            onClick={() => onEdit(item)}
          >
            <FaEdit className="me-1" /> Edit
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="flex-fill"
            onClick={() => onDelete(item._id)}
          >
            <FaTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PortfolioItem;