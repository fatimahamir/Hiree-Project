import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase, FaPlus, 
  FaThLarge, FaList, FaCheck, FaTimes, FaDollarSign
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const FindWork = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showPostModal, setShowPostModal] = useState(false);
  
  const [postData, setPostData] = useState({
    title: '', description: '', category: '', budget: '', deadline: '',
  });

  const categories = [
    'Web Development', 'Mobile App Development', 'Graphic Design', 'Content Writing',
    'Digital Marketing', 'SEO', 'Social Media Management', 'Video Editing',
    'UI/UX Design', 'Data Entry', 'Virtual Assistant', 'E-commerce'
  ];

  // ✅ Theme Colors - SAME AS FINDTALENT
  const themeGreen = '#098a8b';
  const darkBlueBg = '#082C5E'; // ✅ Same blue as FindTalent
  const cardBg = '#ffffff'; // Hamesha white
  const titleColor = '#000000'; // Hamesha BLACK
  const textColor = '#333333';
  const subTextColor = '#666666';
  const inputBg = isDarkMode ? darkBlueBg : '#ffffff'; // ✅ FIXED - Same blue
  const inputText = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#2a3a4a' : '#dee2e6';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', { ...postData, budget: parseFloat(postData.budget) });
      toast.success('Job post created successfully!');
      setShowPostModal(false);
      setPostData({ title: '', description: '', category: '', budget: '', deadline: '' });
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    }
  };

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isDarkMode ? darkBlueBg : '#f8f9fa', // ✅ Same blue
      transition: 'all 0.3s ease', 
      padding: '2rem 0' 
    }}>
      <Container fluid className="px-4 px-lg-5">
        
        <Row className="mb-4 align-items-center">
          <Col lg={6} md={6}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{
                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                color: themeGreen, zIndex: 2
              }} />
              <Form.Control
                type="text"
                placeholder="Search job posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '45px', borderRadius: '12px',
                  border: `1px solid black`,
                  background: inputBg, color: inputText, height: '50px',
                  fontSize: '0.95rem'
                }}
              />
              <style>{`
                input::placeholder {
                  color: ${isDarkMode ? '#ffffff' : '#888888'} !important;
                  opacity: 1 !important;
                }
              `}</style>
            </div>
          </Col>
          
          <Col lg={3} md={3}>
            <Form.Select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                borderRadius: '12px',
                border: `1px solid black`,
                background: inputBg, color: inputText, height: '50px',
                fontSize: '0.95rem', paddingLeft: '15px'
              }}
            >
              <option value="" style={{ background: inputBg, color: inputText }}>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ background: inputBg, color: inputText }}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col lg={3} md={3} className="d-flex justify-content-end align-items-center gap-2">
            <div style={{ 
              display: 'flex', gap: '5px', 
              background: inputBg, padding: '5px', 
              borderRadius: '12px', border: `1px solid ${borderColor}` 
            }}>
              <Button 
                onClick={() => setViewMode('grid')} 
                style={{ 
                  borderRadius: '8px', 
                  background: viewMode === 'grid' ? themeGreen : 'transparent', 
                  border: 'none', 
                  color: viewMode === 'grid' ? '#fff' : inputText 
                }} 
                size="sm"
              >
                <FaThLarge />
              </Button>
              <Button 
                onClick={() => setViewMode('list')} 
                style={{ 
                  borderRadius: '8px', 
                  background: viewMode === 'list' ? themeGreen : 'transparent', 
                  border: 'none', 
                  color: viewMode === 'list' ? '#fff' : inputText 
                }} 
                size="sm"
              >
                <FaList />
              </Button>
            </div>

            {user?.role === 'customer' && (
              <Button 
                onClick={() => setShowPostModal(true)} 
                style={{ 
                  background: themeGreen, 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '12px 20px', 
                  fontWeight: '600', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#fff'
                }}
              >
                <FaPlus /> Post a Job
              </Button>
            )}
          </Col>
        </Row>

        {/* Results Info */}
        <Row className="mb-3">
          <Col>
            <p style={{ color: isDarkMode ? '#ffffff' : '#333333', opacity: 0.8, marginBottom: 0, fontSize: '0.9rem' }}>
              Showing <strong style={{ color: themeGreen }}>{filteredPosts.length}</strong> job posts 
              {selectedCategory && ` in "${selectedCategory}"`}
              {selectedCategory && (
                <Button 
                  onClick={clearFilters} 
                  size="sm" 
                  variant="link" 
                  style={{ color: '#dc3545', marginLeft: '10px', textDecoration: 'underline' }}
                >
                  Clear
                </Button>
              )}
            </p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: themeGreen }} />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-5">
            <FaBriefcase size={80} style={{ color: themeGreen, opacity: 0.3, marginBottom: '20px' }} />
            <h4 style={{ color: isDarkMode ? '#ffffff' : '#000000', opacity: 0.7, marginBottom: '10px' }}>No job posts found</h4>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666666' }}>Check back later for new opportunities</p>
          </div>
        ) : (
          <Row className={viewMode === 'grid' ? 'g-4' : 'g-3'}>
            {filteredPosts.map((post) => (
              <Col key={post._id} lg={viewMode === 'grid' ? 4 : 12} md={viewMode === 'grid' ? 6 : 12}>
                <Card 
                  className="h-100 border-0" 
                  style={{ 
                    background: cardBg, 
                    borderRadius: '20px', 
                    border: `1px solid ${borderColor}`, 
                    transition: 'all 0.3s', 
                    overflow: 'hidden' 
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-5px)'; 
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(9, 138, 139, 0.2)'; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = 'none'; 
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge 
                        style={{ 
                          background: themeGreen, 
                          color: '#fff', 
                          padding: '8px 14px', 
                          borderRadius: '8px', 
                          fontSize: '0.8rem', 
                          fontWeight: '600' 
                        }}
                      >
                        {post.category}
                      </Badge>
                      <div className="d-flex align-items-center" style={{ fontSize: '0.85rem', color: subTextColor }}>
                        <FaClock className="me-1" /> {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <h5 style={{ 
                      color: titleColor, 
                      fontWeight: '700', 
                      marginBottom: '10px', 
                      fontSize: '1.2rem' 
                    }}>
                      {post.title}
                    </h5>

                    <p style={{ 
                      color: textColor, 
                      fontSize: '0.95rem', 
                      lineHeight: '1.6', 
                      marginBottom: '15px' 
                    }}>
                      {post.description?.substring(0, 150)}...
                    </p>

                    {post.customer && (
                      <div className="d-flex align-items-center mb-3" style={{ fontSize: '0.9rem', color: subTextColor }}>
                        <FaMapMarkerAlt className="me-2" style={{ color: themeGreen }} /> 
                        Posted by {post.customer.name}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: `1px solid #eeeeee` }}>
                      <div>
                        <div style={{ color: subTextColor, fontSize: '0.85rem', marginBottom: '3px' }}>Budget</div>
                        <div style={{ color: themeGreen, fontWeight: '700', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaDollarSign /> Rs. {post.budget?.toLocaleString() || 0}
                        </div>
                      </div>
                      <div className="text-end">
                        {post.deadline && (
                          <div style={{ color: subTextColor, fontSize: '0.8rem', marginBottom: '8px' }}>
                            <FaClock className="me-1" /> Due: {new Date(post.deadline).toLocaleDateString()}
                          </div>
                        )}
                        <Link to={`/jobs/${post._id}`} className="text-decoration-none">
                          <Button 
                            size="sm" 
                            style={{ 
                              background: themeGreen, 
                              border: 'none', 
                              borderRadius: '10px', 
                              padding: '10px 22px', 
                              fontWeight: '600', 
                              color: '#fff',
                              fontSize: '0.9rem'
                            }}
                          >
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Post Job Modal */}
        <Modal show={showPostModal} onHide={() => setShowPostModal(false)} centered contentClassName="border-0 rounded-4" style={{ '--bs-modal-bg': cardBg, '--bs-modal-color': titleColor }}>
          <Modal.Header closeButton style={{ borderBottom: `1px solid ${borderColor}` }}>
            <Modal.Title style={{ color: titleColor, fontWeight: '700' }}>Post a New Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePostSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: titleColor, fontWeight: '600' }}>Job Title *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title" 
                  placeholder="e.g., Need a Logo Designer" 
                  value={postData.title} 
                  onChange={handleInputChange} 
                  required 
                  style={{ 
                    borderRadius: '10px', 
                    border: `1px solid ${borderColor}`, 
                    background: inputBg, 
                    color: inputText, 
                    height: '48px' 
                  }} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: titleColor, fontWeight: '600' }}>Category *</Form.Label>
                <Form.Select 
                  name="category" 
                  value={postData.category} 
                  onChange={handleInputChange} 
                  required 
                  style={{ 
                    borderRadius: '10px', 
                    border: `1px solid ${borderColor}`, 
                    background: inputBg, 
                    color: inputText, 
                    height: '48px' 
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: titleColor, fontWeight: '600' }}>Description *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  name="description" 
                  placeholder="Describe what you need..." 
                  value={postData.description} 
                  onChange={handleInputChange} 
                  required 
                  style={{ 
                    borderRadius: '10px', 
                    border: `1px solid ${borderColor}`, 
                    background: inputBg, 
                    color: inputText 
                  }} 
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: titleColor, fontWeight: '600' }}>Budget (PKR) *</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="budget" 
                      placeholder="5000" 
                      value={postData.budget} 
                      onChange={handleInputChange} 
                      required 
                      min="0" 
                      style={{ 
                        borderRadius: '10px', 
                        border: `1px solid ${borderColor}`, 
                        background: inputBg, 
                        color: inputText, 
                        height: '48px' 
                      }} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: titleColor, fontWeight: '600' }}>Deadline</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="deadline" 
                      value={postData.deadline} 
                      onChange={handleInputChange} 
                      style={{ 
                        borderRadius: '10px', 
                        border: `1px solid ${borderColor}`, 
                        background: inputBg, 
                        color: inputText, 
                        height: '48px' 
                      }} 
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2 mt-4">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowPostModal(false)} 
                  style={{ 
                    flex: 1, 
                    borderRadius: '10px', 
                    borderColor: borderColor, 
                    color: titleColor 
                  }}
                >
                  <FaTimes className="me-2" /> Cancel
                </Button>
                <Button 
                  type="submit" 
                  style={{ 
                    flex: 1, 
                    background: themeGreen, 
                    border: 'none', 
                    borderRadius: '10px', 
                    fontWeight: '600',
                    color: '#fff'
                  }}
                >
                  <FaCheck className="me-2" /> Post Job
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default FindWork;