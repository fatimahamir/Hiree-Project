import { useState, useContext } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../api/axiosConfig';

const PostJob = () => {
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', budget: '', deadline: ''
  });

  const categories = [
    'Web Development', 'Mobile App Development', 'Graphic Design', 'Content Writing',
    'Digital Marketing', 'SEO', 'Social Media Management', 'Video Editing',
    'UI/UX Design', 'Data Entry', 'Virtual Assistant', 'E-commerce'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/posts', formData);
      toast.success('Job posted successfully! 🎉');
      navigate('/customer/my-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ minHeight: '100vh', background: colors.pageBg, transition: 'all 0.3s ease', padding: '3rem 0' }}>
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <Card className="border-0" style={{ background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.border}`, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 style={{ color: colors.brand, fontWeight: '700', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '0.5rem' }}>Post a New Job</h1>
                  <p style={{ color: colors.text, opacity: 0.8, fontSize: '1.1rem' }}>Describe your project and find the perfect freelancer</p>
                </div>

                {error && <Alert variant="danger" style={{ borderRadius: '12px', border: 'none', background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}>{error}</Alert>}

                {loading ? (
                  <div className="text-center py-5"><Spinner animation="border" style={{ color: colors.accent }} /></div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Job Title *</Form.Label>
                      <Form.Control type="text" name="title" required value={formData.title} onChange={handleChange} style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text, height: '48px' }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Category *</Form.Label>
                      <Form.Select name="category" required value={formData.category} onChange={handleChange} style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text, height: '48px' }}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Description *</Form.Label>
                      <Form.Control as="textarea" rows={4} name="description" required value={formData.description} onChange={handleChange} style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text }} />
                    </Form.Group>

                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Budget (PKR) *</Form.Label>
                          <Form.Control type="number" name="budget" required value={formData.budget} onChange={handleChange} style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text, height: '48px' }} />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label style={{ color: colors.text, fontWeight: '600' }}>Deadline</Form.Label>
                          <Form.Control type="date" name="deadline" value={formData.deadline} onChange={handleChange} style={{ borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.text, height: '48px' }} />
                        </Form.Group>
                      </div>
                    </div>

                    <Button type="submit" style={{ width: '100%', background: colors.accent, border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '600', fontSize: '1.1rem', color: '#fff' }}>
                      {loading ? 'Posting...' : 'Post Job'}
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostJob;