import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaCode, FaPaintBrush, FaPenNib, FaBullhorn, FaSearch } from 'react-icons/fa';
import WhyUs from '../components/WhyUs';  
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials'; 

const videos = [
  "/video/team.mp4",
  "/video/team1.mp4",
  "/video/team2.mp4",
];

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Category mapping for search
  const categoryMap = {
    'web': 'web-development',
    'web development': 'web-development',
    'website': 'web-development',
    'app': 'app-development',
    'app development': 'app-development',
    'mobile': 'app-development',
    'mobile app': 'app-development',
    'graphic': 'graphic-design',
    'graphic design': 'graphic-design',
    'design': 'graphic-design',
    'logo': 'graphic-design',
    'ui': 'ui-ux-design',
    'ui/ux': 'ui-ux-design',
    'ui ux': 'ui-ux-design',
    'ux': 'ui-ux-design',
    'interface': 'ui-ux-design',
    'marketing': 'digital-marketing',
    'digital marketing': 'digital-marketing',
    'seo': 'digital-marketing',
    'social media': 'digital-marketing',
    'video': 'video-editing',
    'video editing': 'video-editing',
    'editing': 'video-editing',
    'data': 'data-analytics',
    'analytics': 'data-analytics',
    'photo': 'photography',
    'photography': 'photography',
    'ai': 'ai-ml',
    'ml': 'ai-ml',
    'machine learning': 'ai-ml',
    'artificial intelligence': 'ai-ml',
    'cloud': 'cloud-computing',
    'cloud computing': 'cloud-computing',
    'security': 'cybersecurity',
    'cybersecurity': 'cybersecurity',
    'database': 'database-management',
    'dbms': 'database-management',
    'content': 'content-writing',
    'writing': 'content-writing',
    'blog': 'content-writing',
    'article': 'content-writing'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // If search is empty, just go to find talent page
      navigate('/find-talent');
      return;
    }

    // Convert search query to lowercase and trim
    const query = searchQuery.toLowerCase().trim();
    
    // Find matching category
    let categorySlug = null;
    
    // Check for exact match first
    if (categoryMap[query]) {
      categorySlug = categoryMap[query];
    } else {
      // Check for partial match
      for (const [key, value] of Object.entries(categoryMap)) {
        if (query.includes(key) || key.includes(query)) {
          categorySlug = value;
          break;
        }
      }
    }

    // Navigate to find talent page with category filter
    if (categorySlug) {
      navigate(`/find-talent?category=${categorySlug}`);
    } else {
      // If no category match, search by keyword
      navigate(`/find-talent?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { icon: <FaCode size={40} />, title: "Web Development", desc: "Build amazing websites" },
    { icon: <FaPaintBrush size={40} />, title: "Graphic Design", desc: "Creative logos & banners" },
    { icon: <FaPenNib size={40} />, title: "Content Writing", desc: "Engaging articles & blogs" },
    { icon: <FaBullhorn size={40} />, title: "Digital Marketing", desc: "Grow your business online" },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div style={{ position: "relative", height: "90vh", overflow: "hidden" }}>
        {/* BACKGROUND VIDEO */}
        <video
          key={index}
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0,
            transition: "opacity 1s ease-in-out"
          }}
        >
          <source src={videos[index]} type="video/mp4" />
        </video>

        {/* BLUE OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(8,44,94,0.52)",
            zIndex: 1
          }}
        />

        {/* CONTENT */}
        <Container
          className="h-100 d-flex flex-column justify-content-center align-items-center text-center"
          style={{ position: "relative", zIndex: 2, color: "white" }}
        >
          {/* HEADING */}
          <h1 className="fw-bold display-4">
            Find & Hire <span style={{ color: "#f1dcc1" }}>Expert Freelancers</span>
          </h1>

          {/* SUBHEADING */}
          <p className="lead mt-2 mb-4 text-light">
            Web Development, Design, Writing & Marketing — all in one place
          </p>

          {/* SEARCH BAR */}
          <div style={{ width: "100%", maxWidth: "520px" }}>
            <Form 
              onSubmit={handleSearch}
              className="d-flex bg-white rounded-pill overflow-hidden shadow-sm"
            >
              <Form.Control
                type="text"
                placeholder="Search services or talent…"
                className="border-0 px-3 py-2"
                style={{
                  fontSize: "15px",
                  height: "48px",
                  boxShadow: "none"
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                type="submit"
                style={{
                  backgroundColor: "#098a8b",
                  border: "none",
                  padding: "0 20px",
                  fontSize: "15px",
                  fontWeight: "600"
                }}
              >
                <FaSearch className="me-2" />
                Search
              </Button>
            </Form>

            {/* Quick Search Suggestions */}
            <div className="mt-3" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              
              {['Web Development', 'Graphic Design', 'Digital Marketing', 'UI/UX'].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    const query = suggestion.toLowerCase();
                    const slug = categoryMap[query];
                    if (slug) {
                      navigate(`/find-talent?category=${slug}`);
                    }
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#098a8b';
                    e.target.style.borderColor = '#098a8b';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-4">
            <Link to="/find-talent">
              <Button
                style={{ backgroundColor: "#098a8b", border: "none" }}
                size="lg"
                className="me-3"
              >
                Start Hiring
              </Button>
            </Link>

            <Link to="/find-work">
              <Button variant="outline-light" size="lg">
                Start Earning
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* ========== WHY US SECTION - Home ke neeche ========== */}
      <WhyUs />
      <Categories />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;