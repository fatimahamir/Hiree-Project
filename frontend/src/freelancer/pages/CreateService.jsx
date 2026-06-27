import { useState, useContext } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';
import ServiceForm from '../components/ServiceForm';
import API from '../../api/axiosConfig';

const CreateService = () => {
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Backend ko data bhejo. Yeh automatically My Services aur Find Work mein aa jayega
      // agar backend route sahi set hai.
      await API.post('/services', formData);
      toast.success('Service created successfully! 🎉');
      navigate('/freelancer/my-services');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create service');
      toast.error('Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.pageBg, 
      transition: 'all 0.3s ease',
      padding: '3rem 0'
    }}>
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <Card 
              className="border-0"
              style={{
                background: colors.cardBg,
                borderRadius: '20px',
                border: `1px solid ${colors.border}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 style={{ 
                    color: colors.brand, 
                    fontWeight: '700',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    Create New Service
                  </h1>
                  <p style={{ color: colors.text, opacity: 0.8, fontSize: '1.1rem' }}>
                    Fill in the details to showcase your skills to clients
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" style={{ borderRadius: '12px', border: 'none', background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}>
                    {error}
                  </Alert>
                )}

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" style={{ color: colors.accent }} />
                    <p className="mt-3" style={{ color: colors.text, opacity: 0.7 }}>Creating your service...</p>
                  </div>
                ) : (
                  <ServiceForm onSubmit={handleSubmit} loading={loading} />
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateService;