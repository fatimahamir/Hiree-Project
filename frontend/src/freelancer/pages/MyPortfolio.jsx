import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PortfolioItem from '../components/PortfolioItem';
import API from '../../api/axiosConfig';

const MyPortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: null,
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await API.get('/providers/me');
      setPortfolio(res.data.portfolio || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleShowModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        link: item.link,
        image: null,
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', link: '', image: null });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('link', formData.link);
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      if (editingItem) {
        // Update existing
        await API.put(`/providers/portfolio/${editingItem._id}`, submitData);
        toast.success('Portfolio item updated!');
      } else {
        // Create new
        await API.post('/providers/portfolio', submitData);
        toast.success('Portfolio item added!');
      }

      handleCloseModal();
      fetchPortfolio();
    } catch (error) {
      toast.error('Failed to save portfolio item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this portfolio item?')) {
      try {
        await API.delete(`/providers/portfolio/${id}`);
        setPortfolio(portfolio.filter(item => item._id !== id));
        toast.success('Portfolio item deleted');
      } catch (error) {
        toast.error('Failed to delete portfolio item');
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">My Portfolio</h1>
          <p className="text-muted">Showcase your best work</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Portfolio Item
          </Button>
        </Col>
      </Row>

      {portfolio.length === 0 ? (
        <Card className="text-center p-5">
          <h4>No portfolio items yet</h4>
          <p className="text-muted">Add your first project to showcase your work</p>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Portfolio Item
          </Button>
        </Card>
      ) : (
        <Row className="g-4">
          {portfolio.map((item) => (
            <Col md={4} key={item._id}>
              <PortfolioItem 
                item={item} 
                onEdit={handleShowModal}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Link (optional)</Form.Label>
              <Form.Control
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default MyPortfolio;