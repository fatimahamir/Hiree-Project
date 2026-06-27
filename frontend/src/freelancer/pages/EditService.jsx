import { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ServiceForm from '../components/ServiceForm';
import API from '../../api/axiosConfig';

const EditService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await API.get(`/services/${id}`);
      setService(res.data);
    } catch (err) {
      setError('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');

    try {
      await API.put(`/services/${id}`, formData);
      toast.success('Service updated successfully!');
      navigate('/freelancer/my-services');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update service');
    } finally {
      setSaving(false);
    }
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <h1 className="fw-bold mb-2">Edit Service</h1>
              <p className="text-muted mb-4">Update your service details</p>

              {error && <Alert variant="danger">{error}</Alert>}

              <ServiceForm 
                service={service} 
                onSubmit={handleSubmit} 
                loading={saving} 
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default EditService;