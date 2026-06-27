import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  FaSearch, FaStar, FaClock, FaDollarSign, 
  FaBriefcase, FaThLarge, FaList, FaCheck, FaUserCircle
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import API from '../api/axiosConfig';

const FindTalent = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categorySlugMap = {
    'web-development': 'Web Development',
    'app-development': 'Mobile App Development',
    'graphic-design': 'Graphic Design',
    'ui-ux-design': 'UI/UX Design',
    'digital-marketing': 'Digital Marketing',
    'video-editing': 'Video Editing',
    'data-analytics': 'Data Analytics',
    'photography': 'Photography',
    'ai-ml': 'AI & ML',
    'cloud-computing': 'Cloud Computing',
    'cybersecurity': 'Cybersecurity',
    'database-management': 'Database Management',
    'content-writing': 'Content Writing',
    'seo': 'SEO',
    'social-media-management': 'Social Media Management',
    'data-entry': 'Data Entry',
    'virtual-assistant': 'Virtual Assistant',
    'e-commerce': 'E-commerce'
  };

  const categories = [
    'Web Development', 'Mobile App Development', 'Graphic Design', 'Content Writing',
    'Digital Marketing', 'SEO', 'Social Media Management', 'Video Editing',
    'UI/UX Design', 'Data Entry', 'Virtual Assistant', 'E-commerce'
  ];

  // ✅ Theme Colors
  const themeGreen = '#098a8b';
  const darkBlueBg = '#082C5E'; // ✅ Dark mode background
  const cardBg = '#ffffff'; // ✅ Cards always white
  const titleColor = '#000000'; // ✅ Black text on cards
  const textColor = '#333333';
  const subTextColor = '#666666';
  const inputBg = isDarkMode ? darkBlueBg : '#ffffff';
  const inputText = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#2a3a4a' : '#dee2e6';

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      const categoryName = categorySlugMap[categoryParam] || categoryParam;
      setSelectedCategory(categoryName);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      setServices(res.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = 
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || 
      service.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isDarkMode ? darkBlueBg : '#f8f9fa', // ✅ Dark blue in dark mode
      transition: 'all 0.3s ease',
      padding: '2rem 0'
    }}>
      <Container fluid className="px-4 px-lg-5">
        
        {/* ✅ HEADING REMOVED - Directly Search + Category */}
        <Row className="mb-4 align-items-center">
          <Col lg={6} md={6}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{
                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                color: themeGreen, zIndex: 2
              }} />
              <Form.Control
                type="text"
                placeholder="Search services..."
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

          <Col lg={3} md={3} className="d-flex justify-content-end align-items-center">
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
          </Col>
        </Row>

        {/* Results Count */}
        <Row className="mb-3">
          <Col>
            <p style={{ color: isDarkMode ? '#ffffff' : '#333333', opacity: 0.8, marginBottom: 0, fontSize: '0.9rem' }}>
              Showing <strong style={{ color: themeGreen }}>{filteredServices.length}</strong> services
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

        {/* Services Grid/List */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: themeGreen }} />
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-5">
            <FaBriefcase size={80} style={{ color: themeGreen, opacity: 0.3, marginBottom: '20px' }} />
            <h4 style={{ color: isDarkMode ? '#ffffff' : '#000000', opacity: 0.7, marginBottom: '10px' }}>No services found</h4>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666666' }}>Be the first to offer a service in this category!</p>
            <Button 
              onClick={clearFilters}
              style={{ 
                background: themeGreen, 
                border: 'none', 
                borderRadius: '8px',
                padding: '10px 25px',
                marginTop: '15px',
                color: '#fff'
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <Row className={viewMode === 'grid' ? 'g-4' : 'g-3'}>
            {filteredServices.map((service) => {
              const provider = service.provider || {};
              return (
                <Col key={service._id} lg={viewMode === 'grid' ? 4 : 12} md={viewMode === 'grid' ? 6 : 12}>
                  {/* ✅ CARD - WHITE BACKGROUND, NO IMAGE SECTION */}
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
                    <Card.Body className="p-4 d-flex flex-column">
                      
                      {/* ✅ BADGE - THEME GREEN */}
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
                          {service.category}
                        </Badge>
                        <div className="d-flex align-items-center" style={{ fontSize: '0.85rem', color: subTextColor }}>
                          <FaStar style={{ color: '#ffc107', marginRight: '3px' }} />
                          <strong>{provider.averageRating || '0.0'}</strong>
                        </div>
                      </div>

                      {/* Freelancer Info */}
                      <div className="d-flex align-items-center mb-3">
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginRight: '12px', overflow: 'hidden'
                        }}>
                          {provider.profilePic ? (
                            <img src={provider.profilePic} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <FaUserCircle size={25} style={{ color: themeGreen }} />
                          )}
                        </div>
                        <div>
                          <h6 style={{ color: titleColor, fontWeight: '600', marginBottom: '2px', fontSize: '0.95rem' }}>
                            {provider.name || 'Freelancer'}
                          </h6>
                          <div style={{ fontSize: '0.8rem', color: subTextColor }}>
                            Professional Freelancer
                          </div>
                        </div>
                      </div>

                      {/* ✅ TITLE - BLACK */}
                      <h5 style={{ color: titleColor, fontWeight: '700', marginBottom: '10px', fontSize: '1.1rem', lineHeight: '1.4' }}>
                        {service.title}
                      </h5>

                      {/* ✅ DESCRIPTION - DARK GRAY */}
                      <p style={{ color: textColor, fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
                        {service.description?.substring(0, 100)}...
                      </p>

                      {/* Footer: Price & Action */}
                      <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: `1px solid #eeeeee` }}>
                        <div>
                          <div style={{ color: subTextColor, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '3px' }}>Starting at</div>
                          <div style={{ color: themeGreen, fontWeight: '700', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaDollarSign /> Rs. {service.price?.toLocaleString() || 0}
                          </div>
                        </div>
                        
                        <Link to={`/services/${service._id}`} className="text-decoration-none">
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
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default FindTalent;