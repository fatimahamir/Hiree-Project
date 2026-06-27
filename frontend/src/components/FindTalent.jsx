// components/FindTalent.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaCode, 
  FaPaintBrush, 
  FaPenFancy, 
  FaBullhorn, 
  FaMobileAlt,
  FaVideo,
  FaChartLine,
  FaCamera,
  FaRobot,
  FaCloud,
  FaShieldAlt,
  FaDatabase,
  FaUserTie,
  FaArrowRight
} from 'react-icons/fa';

const FindTalent = () => {
  const [showAll, setShowAll] = useState(false);

  const talents = [
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Full Stack Developer',
      category: 'Web Development',
      rating: 4.9,
      reviews: 127,
      rate: '$45/hr',
      avatar: '👨‍💻',
      skills: ['React', 'Node.js', 'MongoDB'],
      icon: <FaCode />
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'UI/UX Designer',
      category: 'UI/UX Designing',
      rating: 4.8,
      reviews: 98,
      rate: '$40/hr',
      avatar: '👩‍🎨',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      icon: <FaPenFancy />
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      title: 'Digital Marketing Expert',
      category: 'Digital Marketing',
      rating: 4.7,
      reviews: 85,
      rate: '$35/hr',
      avatar: '👨‍💼',
      skills: ['SEO', 'Google Ads', 'Analytics'],
      icon: <FaBullhorn />
    },
    {
      id: 4,
      name: 'Emily Watson',
      title: 'Graphic Designer',
      category: 'Graphic Design',
      rating: 4.9,
      reviews: 112,
      rate: '$38/hr',
      avatar: '👩‍🎨',
      skills: ['Photoshop', 'Illustrator', 'Canva'],
      icon: <FaPaintBrush />
    },
    {
      id: 5,
      name: 'David Park',
      title: 'App Developer',
      category: 'App Development',
      rating: 4.6,
      reviews: 73,
      rate: '$50/hr',
      avatar: '👨‍💻',
      skills: ['React Native', 'Flutter', 'Swift'],
      icon: <FaMobileAlt />
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      title: 'Video Editor',
      category: 'Video Editing',
      rating: 4.8,
      reviews: 91,
      rate: '$42/hr',
      avatar: '👩‍🎬',
      skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
      icon: <FaVideo />
    }
  ];

  // Generate 40+ talents for the full page
  const generateAllTalents = () => {
    const allTalents = [...talents];
    const moreTalents = [
      {
        id: 7,
        name: 'James Wilson',
        title: 'Data Analyst',
        category: 'Data Analytics',
        rating: 4.7,
        reviews: 64,
        rate: '$48/hr',
        avatar: '👨‍📊',
        skills: ['Python', 'SQL', 'Power BI'],
        icon: <FaChartLine />
      },
      {
        id: 8,
        name: 'Maria Garcia',
        title: 'Photographer',
        category: 'Photography',
        rating: 4.9,
        reviews: 134,
        rate: '$55/hr',
        avatar: '👩‍📷',
        skills: ['Photography', 'Lightroom', 'Photoshop'],
        icon: <FaCamera />
      },
      {
        id: 9,
        name: 'Tom Harris',
        title: 'AI/ML Engineer',
        category: 'AI & ML',
        rating: 4.8,
        reviews: 56,
        rate: '$65/hr',
        avatar: '👨‍🤖',
        skills: ['TensorFlow', 'PyTorch', 'Python'],
        icon: <FaRobot />
      },
      {
        id: 10,
        name: 'Rachel Kim',
        title: 'Cloud Architect',
        category: 'Cloud Computing',
        rating: 4.9,
        reviews: 78,
        rate: '$60/hr',
        avatar: '👩‍☁️',
        skills: ['AWS', 'Azure', 'GCP'],
        icon: <FaCloud />
      },
      {
        id: 11,
        name: 'Mark Anderson',
        title: 'Cybersecurity Specialist',
        category: 'Cybersecurity',
        rating: 4.7,
        reviews: 62,
        rate: '$58/hr',
        avatar: '👨‍🔒',
        skills: ['Penetration Testing', 'Firewalls', 'SIEM'],
        icon: <FaShieldAlt />
      },
      {
        id: 12,
        name: 'Priya Patel',
        title: 'Database Administrator',
        category: 'Database Management',
        rating: 4.6,
        reviews: 49,
        rate: '$44/hr',
        avatar: '👩‍💻',
        skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
        icon: <FaDatabase />
      },
      {
        id: 13,
        name: 'Chris Lee',
        title: 'Full Stack Developer',
        category: 'Web Development',
        rating: 4.9,
        reviews: 156,
        rate: '$52/hr',
        avatar: '👨‍💻',
        skills: ['Vue.js', 'Django', 'PostgreSQL'],
        icon: <FaCode />
      },
      {
        id: 14,
        name: 'Amanda Foster',
        title: 'UI/UX Designer',
        category: 'UI/UX Designing',
        rating: 4.8,
        reviews: 104,
        rate: '$42/hr',
        avatar: '👩‍🎨',
        skills: ['Figma', 'InVision', 'Prototyping'],
        icon: <FaPenFancy />
      },
      {
        id: 15,
        name: 'Steve Martin',
        title: 'Digital Marketing Specialist',
        category: 'Digital Marketing',
        rating: 4.6,
        reviews: 77,
        rate: '$38/hr',
        avatar: '👨‍💼',
        skills: ['Social Media', 'Content Marketing', 'Email'],
        icon: <FaBullhorn />
      },
      {
        id: 16,
        name: 'Jessica Brown',
        title: 'Graphic Designer',
        category: 'Graphic Design',
        rating: 4.7,
        reviews: 93,
        rate: '$36/hr',
        avatar: '👩‍🎨',
        skills: ['Branding', 'Typography', 'Illustration'],
        icon: <FaPaintBrush />
      },
      {
        id: 17,
        name: 'Ryan Adams',
        title: 'App Developer',
        category: 'App Development',
        rating: 4.8,
        reviews: 82,
        rate: '$55/hr',
        avatar: '👨‍💻',
        skills: ['Kotlin', 'Android', 'iOS'],
        icon: <FaMobileAlt />
      },
      {
        id: 18,
        name: 'Laura Bennett',
        title: 'Video Editor',
        category: 'Video Editing',
        rating: 4.9,
        reviews: 118,
        rate: '$45/hr',
        avatar: '👩‍🎬',
        skills: ['Final Cut', 'Motion Graphics', 'Color Grading'],
        icon: <FaVideo />
      },
      {
        id: 19,
        name: 'Kevin O\'Brien',
        title: 'Data Scientist',
        category: 'Data Analytics',
        rating: 4.7,
        reviews: 68,
        rate: '$58/hr',
        avatar: '👨‍📊',
        skills: ['R', 'Machine Learning', 'Statistics'],
        icon: <FaChartLine />
      },
      {
        id: 20,
        name: 'Nina Martinez',
        title: 'Photographer',
        category: 'Photography',
        rating: 4.8,
        reviews: 97,
        rate: '$48/hr',
        avatar: '👩‍📷',
        skills: ['Portrait', 'Wedding', 'Commercial'],
        icon: <FaCamera />
      },
      {
        id: 21,
        name: 'Robert Chen',
        title: 'AI Engineer',
        category: 'AI & ML',
        rating: 4.9,
        reviews: 74,
        rate: '$68/hr',
        avatar: '👨‍🤖',
        skills: ['Deep Learning', 'NLP', 'Computer Vision'],
        icon: <FaRobot />
      },
      {
        id: 22,
        name: 'Sophia Williams',
        title: 'Cloud Engineer',
        category: 'Cloud Computing',
        rating: 4.6,
        reviews: 55,
        rate: '$56/hr',
        avatar: '👩‍☁️',
        skills: ['Docker', 'Kubernetes', 'Terraform'],
        icon: <FaCloud />
      },
      {
        id: 23,
        name: 'Daniel Kim',
        title: 'Cybersecurity Analyst',
        category: 'Cybersecurity',
        rating: 4.8,
        reviews: 71,
        rate: '$54/hr',
        avatar: '👨‍🔒',
        skills: ['Incident Response', 'Risk Assessment', 'Compliance'],
        icon: <FaShieldAlt />
      },
      {
        id: 24,
        name: 'Emma Davis',
        title: 'Database Developer',
        category: 'Database Management',
        rating: 4.5,
        reviews: 42,
        rate: '$40/hr',
        avatar: '👩‍💻',
        skills: ['Oracle', 'SQL Server', 'NoSQL'],
        icon: <FaDatabase />
      },
      {
        id: 25,
        name: 'Michael Park',
        title: 'Full Stack Developer',
        category: 'Web Development',
        rating: 4.9,
        reviews: 143,
        rate: '$50/hr',
        avatar: '👨‍💻',
        skills: ['Angular', 'Spring Boot', 'MySQL'],
        icon: <FaCode />
      },
      {
        id: 26,
        name: 'Rachel Green',
        title: 'UX Designer',
        category: 'UI/UX Designing',
        rating: 4.7,
        reviews: 89,
        rate: '$39/hr',
        avatar: '👩‍🎨',
        skills: ['User Research', 'Wireframing', 'Prototyping'],
        icon: <FaPenFancy />
      },
      {
        id: 27,
        name: 'David Miller',
        title: 'SEO Specialist',
        category: 'Digital Marketing',
        rating: 4.6,
        reviews: 63,
        rate: '$34/hr',
        avatar: '👨‍💼',
        skills: ['Keyword Research', 'Link Building', 'Analytics'],
        icon: <FaBullhorn />
      },
      {
        id: 28,
        name: 'Olivia Martinez',
        title: 'Brand Designer',
        category: 'Graphic Design',
        rating: 4.9,
        reviews: 108,
        rate: '$41/hr',
        avatar: '👩‍🎨',
        skills: ['Logo Design', 'Brand Strategy', 'Packaging'],
        icon: <FaPaintBrush />
      },
      {
        id: 29,
        name: 'William Johnson',
        title: 'Mobile Developer',
        category: 'App Development',
        rating: 4.7,
        reviews: 79,
        rate: '$52/hr',
        avatar: '👨‍💻',
        skills: ['Xamarin', 'Cordova', 'React Native'],
        icon: <FaMobileAlt />
      },
      {
        id: 30,
        name: 'Mia Thompson',
        title: 'Motion Designer',
        category: 'Video Editing',
        rating: 4.8,
        reviews: 94,
        rate: '$46/hr',
        avatar: '👩‍🎬',
        skills: ['After Effects', 'Cinema 4D', 'Blender'],
        icon: <FaVideo />
      },
      {
        id: 31,
        name: 'James Anderson',
        title: 'Business Analyst',
        category: 'Data Analytics',
        rating: 4.5,
        reviews: 58,
        rate: '$43/hr',
        avatar: '👨‍📊',
        skills: ['Excel', 'Tableau', 'SQL'],
        icon: <FaChartLine />
      },
      {
        id: 32,
        name: 'Sophie Turner',
        title: 'Wedding Photographer',
        category: 'Photography',
        rating: 4.9,
        reviews: 125,
        rate: '$60/hr',
        avatar: '👩‍📷',
        skills: ['Wedding', 'Portrait', 'Event'],
        icon: <FaCamera />
      },
      {
        id: 33,
        name: 'Lucas Silva',
        title: 'ML Engineer',
        category: 'AI & ML',
        rating: 4.8,
        reviews: 67,
        rate: '$70/hr',
        avatar: '👨‍🤖',
        skills: ['Scikit-learn', 'Keras', 'OpenCV'],
        icon: <FaRobot />
      },
      {
        id: 34,
        name: 'Emma Wilson',
        title: 'DevOps Engineer',
        category: 'Cloud Computing',
        rating: 4.7,
        reviews: 61,
        rate: '$62/hr',
        avatar: '👩‍☁️',
        skills: ['CI/CD', 'Jenkins', 'Ansible'],
        icon: <FaCloud />
      },
      {
        id: 35,
        name: 'Tom Chen',
        title: 'Security Engineer',
        category: 'Cybersecurity',
        rating: 4.9,
        reviews: 83,
        rate: '$64/hr',
        avatar: '👨‍🔒',
        skills: ['Ethical Hacking', 'Network Security', 'Cryptography'],
        icon: <FaShieldAlt />
      },
      {
        id: 36,
        name: 'Lily Roberts',
        title: 'Data Engineer',
        category: 'Database Management',
        rating: 4.6,
        reviews: 47,
        rate: '$46/hr',
        avatar: '👩‍💻',
        skills: ['ETL', 'Data Warehousing', 'Big Data'],
        icon: <FaDatabase />
      },
      {
        id: 37,
        name: 'Chris Evans',
        title: 'Web Developer',
        category: 'Web Development',
        rating: 4.7,
        reviews: 92,
        rate: '$44/hr',
        avatar: '👨‍💻',
        skills: ['PHP', 'Laravel', 'JavaScript'],
        icon: <FaCode />
      },
      {
        id: 38,
        name: 'Zara Khan',
        title: 'UI Designer',
        category: 'UI/UX Designing',
        rating: 4.8,
        reviews: 76,
        rate: '$38/hr',
        avatar: '👩‍🎨',
        skills: ['UI Design', 'Design Systems', 'Webflow'],
        icon: <FaPenFancy />
      },
      {
        id: 39,
        name: 'Mark Davis',
        title: 'Content Marketer',
        category: 'Digital Marketing',
        rating: 4.5,
        reviews: 54,
        rate: '$32/hr',
        avatar: '👨‍💼',
        skills: ['Content Strategy', 'Blogging', 'Copywriting'],
        icon: <FaBullhorn />
      },
      {
        id: 40,
        name: 'Anna Kowalski',
        title: 'Illustrator',
        category: 'Graphic Design',
        rating: 4.9,
        reviews: 143,
        rate: '$44/hr',
        avatar: '👩‍🎨',
        skills: ['Digital Illustration', 'Character Design', 'Procreate'],
        icon: <FaPaintBrush />
      },
      {
        id: 41,
        name: 'Peter Pan',
        title: 'Android Developer',
        category: 'App Development',
        rating: 4.6,
        reviews: 66,
        rate: '$48/hr',
        avatar: '👨‍💻',
        skills: ['Java', 'Kotlin', 'Android SDK'],
        icon: <FaMobileAlt />
      },
      {
        id: 42,
        name: 'Sam Taylor',
        title: 'Video Producer',
        category: 'Video Editing',
        rating: 4.7,
        reviews: 72,
        rate: '$43/hr',
        avatar: '👨‍🎬',
        skills: ['Production', 'Editing', 'Sound Design'],
        icon: <FaVideo />
      }
    ];

    return [...allTalents, ...moreTalents];
  };

  const allTalents = generateAllTalents();
  const displayedTalents = showAll ? allTalents : allTalents.slice(0, 6);

  // Star Rating Component
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          style={{ 
            color: i <= fullStars ? '#f9d28d' : 'rgba(255,255,255,0.2)',
            fontSize: '0.85rem',
            marginRight: '1px'
          }} 
        />
      );
    }
    return stars;
  };

  return (
    <section style={{
      background: 'rgba(8, 44, 94, 0.95)',
      padding: '80px 0 100px',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 70% 20%, rgba(9, 138, 139, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(249, 210, 141, 0.06) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            color: '#f9d28d',
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            Find Talent
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.8rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Top <span style={{ color: '#f1dcc1' }}>Freelancers</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Connect with skilled professionals ready to bring your ideas to life
          </p>
          <div style={{
            width: '60px',
            height: '3px',
            background: '#098a8b',
            margin: '1.5rem auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Talent Cards Grid */}
        <Row className="g-4">
          {displayedTalents.map((talent) => (
            <Col key={talent.id} lg={2} md={3} sm={4} xs={6}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(9, 138, 139, 0.12)';
                e.currentTarget.style.borderColor = '#098a8b';
                e.currentTarget.style.boxShadow = '0 8px 35px rgba(9, 138, 139, 0.2)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Card.Body style={{ padding: '20px 15px', textAlign: 'center' }}>
                  {/* Avatar */}
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {talent.avatar}
                  </div>

                  {/* Name */}
                  <h6 style={{
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '2px',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {talent.name}
                  </h6>

                  {/* Title */}
                  <small style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {talent.title}
                  </small>

                  {/* Category Badge */}
                  <Badge style={{
                    background: 'rgba(9, 138, 139, 0.2)',
                    color: '#098a8b',
                    fontSize: '0.6rem',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    marginBottom: '0.5rem'
                  }}>
                    {talent.category}
                  </Badge>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '0.3rem'
                  }}>
                    {renderStars(talent.rating)}
                    <span style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.7rem',
                      marginLeft: '2px'
                    }}>
                      ({talent.reviews})
                    </span>
                  </div>

                  {/* Rate */}
                  <div style={{
                    color: '#f9d28d',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    {talent.rate}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Browse All Button - Opens New Page */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/find-talent">
            <Button
              style={{
                background: '#098a8b',
                border: 'none',
                padding: '14px 45px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                boxShadow: '0 4px 20px rgba(9, 138, 139, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f9d28d';
                e.target.style.color = '#082c5e';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 35px rgba(249, 210, 141, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#098a8b';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(9, 138, 139, 0.3)';
              }}
            >
              Browse All Talent
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </Container>

      <style jsx>{`
        @media (max-width: 1200px) {
          .col-lg-2 {
            flex: 0 0 20%;
            max-width: 20%;
          }
        }
        
        @media (max-width: 992px) {
          .col-md-3 {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
        
        @media (max-width: 768px) {
          .col-sm-4 {
            flex: 0 0 33.333%;
            max-width: 33.333%;
          }
        }
        
        @media (max-width: 576px) {
          .col-xs-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default FindTalent;