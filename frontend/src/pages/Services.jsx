import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/services');
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Explore Services</h2>
      
      <Form.Control 
        type="text" 
        placeholder="Search services by title or category..." 
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-center"><Spinner animation="border" variant="warning" /></div>
      ) : (
        <Row>
          {filteredServices.length > 0 ? filteredServices.map((service) => (
            <Col md={4} key={service._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-warning fw-bold">{service.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{service.category}</Card.Subtitle>
                  <Card.Text>{service.description.substring(0, 100)}...</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h5 className="text-success mb-0">Rs. {service.price}</h5>
                    <Link to={`/services/${service._id}`}>
                      <Button variant="outline-dark" size="sm">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <Col className="text-center">
              <p>No services found matching your search.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Services;