import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ServiceForm = ({ service, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    deliveryTime: '',
    revisions: '2',
  });

  const categories = [
    'Web Development', 'Mobile App Development', 'Graphic Design',
    'Content Writing', 'Digital Marketing', 'SEO', 'Social Media Management',
    'Video Editing', 'UI/UX Design', 'Data Entry', 'Virtual Assistant', 'E-commerce'
  ];

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        category: service.category || '',
        price: service.price || '',
        deliveryTime: service.deliveryTime || '',
        revisions: service.revisions || '2',
      });
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Service Title *</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="e.g., I will create a professional website for your business"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">
          Keep it short and clear (max 80 characters)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Category *</Form.Label>
        <Form.Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="description"
          placeholder="Describe your service in detail..."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price (PKR) *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="1500"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Delivery Time (days) *</Form.Label>
            <Form.Control
              type="number"
              name="deliveryTime"
              placeholder="7"
              value={formData.deliveryTime}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Number of Revisions</Form.Label>
        <Form.Select
          name="revisions"
          value={formData.revisions}
          onChange={handleChange}
        >
          <option value="1">1 Revision</option>
          <option value="2">2 Revisions</option>
          <option value="3">3 Revisions</option>
          <option value="unlimited">Unlimited Revisions</option>
        </Form.Select>
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        className="w-100 py-2"
        disabled={loading}
      >
        {loading ? 'Saving...' : service ? 'Update Service' : 'Create Service'}
      </Button>
    </Form>
  );
};

export default ServiceForm;