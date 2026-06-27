import { useState, useContext } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaBriefcase, 
  FaShoppingCart,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaRocket
} from 'react-icons/fa';
import API from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', formData);
      
      const token = res.data.token;
      const userData = res.data.user;
      
      if (token && userData) {
        login(userData, token);
        toast.success('Registration Successful! Welcome to Hiree! 🎉');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        toast.success('Registration Successful! Please Login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Google Signup Handler (component ke ANDAR)
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      setLoading(true);
      
      // Backend ko token bhejo
      const res = await API.post('/auth/google', {
        token: credentialResponse.credential,
      });
      
      // Login context update karo
      login(res.data.user, res.data.token);
      
      toast.success('Google Signup Successful! 🎉');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
      
    } catch (error) {
      console.error('Google Signup Error:', error);
      toast.error(error.response?.data?.message || 'Google Signup Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(8, 44, 94, 0.06)',
      padding: '40px 0',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={11} xl={10}>
            <Card style={{
              border: 'none',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(8, 44, 94, 0.15)',
              background: '#ffffff'
            }}>
              <Row className="g-0">
                {/* Left Side - Info Panel */}
                <Col md={5} style={{
                  background: 'linear-gradient(145deg, #082c5e 0%, #0a3a7a 100%)',
                  padding: '50px 40px',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div>
                    <h1 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '2.8rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.5rem'
                    }}>
                      Hiree<span style={{ color: '#098a8b' }}>.</span>
                    </h1>
                    <p style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '1rem',
                      marginBottom: '2rem'
                    }}>
                      Join thousands of businesses finding the perfect talent
                    </p>

                    <div style={{ marginBottom: '2.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(9, 138, 139, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#098a8b',
                          fontSize: '0.9rem'
                        }}>
                          <FaCheckCircle />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                          Connect with top freelancers worldwide
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(9, 138, 139, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#098a8b',
                          fontSize: '0.9rem'
                        }}>
                          <FaShieldAlt />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                          Secure & reliable platform
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(9, 138, 139, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#098a8b',
                          fontSize: '0.9rem'
                        }}>
                          <FaHeadset />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                          24/7 dedicated support
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(9, 138, 139, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#098a8b',
                          fontSize: '0.9rem'
                        }}>
                          <FaRocket />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                          Fast & efficient matching
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '30px',
                      paddingTop: '20px',
                      borderTop: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.8rem',
                          fontWeight: 700,
                          color: '#f9d28d',
                          marginBottom: '2px'
                        }}>
                          10K+
                        </h3>
                        <p style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '0.8rem',
                          margin: 0
                        }}>
                          Active Talents
                        </p>
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.8rem',
                          fontWeight: 700,
                          color: '#f9d28d',
                          marginBottom: '2px'
                        }}>
                          5K+
                        </h3>
                        <p style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '0.8rem',
                          margin: 0
                        }}>
                          Happy Clients
                        </p>
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.8rem',
                          fontWeight: 700,
                          color: '#f9d28d',
                          marginBottom: '2px'
                        }}>
                          4.9⭐
                        </h3>
                        <p style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '0.8rem',
                          margin: 0
                        }}>
                          Average Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right Side - Form */}
                <Col md={7} style={{ padding: '50px 45px' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      color: '#082c5e',
                      marginBottom: '0.3rem'
                    }}>
                      Create Account
                    </h2>
                    <p style={{ color: '#888', fontSize: '0.95rem' }}>
                      Fill in your details to get started
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        fontWeight: 600,
                        color: '#082c5e',
                        fontSize: '0.9rem'
                      }}>
                        Full Name
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '14px',
                          transform: 'translateY(-50%)',
                          color: '#098a8b',
                          fontSize: '1rem'
                        }}>
                          <FaUser />
                        </div>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          style={{
                            padding: '12px 16px 12px 46px',
                            borderRadius: '12px',
                            border: '2px solid #e8edf2',
                            fontSize: '0.95rem',
                            height: '52px',
                            background: '#f8fafc'
                          }}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        fontWeight: 600,
                        color: '#082c5e',
                        fontSize: '0.9rem'
                      }}>
                        Email Address
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '14px',
                          transform: 'translateY(-50%)',
                          color: '#098a8b',
                          fontSize: '1rem'
                        }}>
                          <FaEnvelope />
                        </div>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          style={{
                            padding: '12px 16px 12px 46px',
                            borderRadius: '12px',
                            border: '2px solid #e8edf2',
                            fontSize: '0.95rem',
                            height: '52px',
                            background: '#f8fafc'
                          }}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label style={{
                        fontWeight: 600,
                        color: '#082c5e',
                        fontSize: '0.9rem'
                      }}>
                        Password
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '14px',
                          transform: 'translateY(-50%)',
                          color: '#098a8b',
                          fontSize: '1rem'
                        }}>
                          <FaLock />
                        </div>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleChange}
                          style={{
                            padding: '12px 16px 12px 46px',
                            borderRadius: '12px',
                            border: '2px solid #e8edf2',
                            fontSize: '0.95rem',
                            height: '52px',
                            background: '#f8fafc'
                          }}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label style={{
                        fontWeight: 600,
                        color: '#082c5e',
                        fontSize: '0.9rem',
                        display: 'block',
                        marginBottom: '0.8rem'
                      }}>
                        I want to...
                      </Form.Label>
                      <Row className="g-3">
                        <Col xs={6}>
                          <div
                            onClick={() => handleRoleSelect('customer')}
                            style={{
                              padding: '18px 12px',
                              borderRadius: '14px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: `2px solid ${formData.role === 'customer' ? '#098a8b' : '#e8edf2'}`,
                              background: formData.role === 'customer' ? 'rgba(9, 138, 139, 0.06)' : '#f8fafc',
                              boxShadow: formData.role === 'customer' ? '0 0 0 4px rgba(9, 138, 139, 0.08)' : 'none'
                            }}
                          >
                            <div style={{
                              color: '#098a8b',
                              fontSize: '2rem',
                              marginBottom: '0.5rem'
                            }}>
                              <FaShoppingCart />
                            </div>
                            <h6 style={{
                              fontWeight: 600,
                              color: '#082c5e',
                              fontSize: '0.85rem',
                              marginBottom: '2px'
                            }}>
                              Hire Services
                            </h6>
                            <small style={{ color: '#888', fontSize: '0.7rem' }}>
                              Find freelancers
                            </small>
                            {formData.role === 'customer' && (
                              <div style={{
                                marginTop: '8px',
                                color: '#098a8b',
                                fontSize: '0.7rem'
                              }}>
                                <FaCheckCircle /> Selected
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div
                            onClick={() => handleRoleSelect('provider')}
                            style={{
                              padding: '18px 12px',
                              borderRadius: '14px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: `2px solid ${formData.role === 'provider' ? '#098a8b' : '#e8edf2'}`,
                              background: formData.role === 'provider' ? 'rgba(9, 138, 139, 0.06)' : '#f8fafc',
                              boxShadow: formData.role === 'provider' ? '0 0 0 4px rgba(9, 138, 139, 0.08)' : 'none'
                            }}
                          >
                            <div style={{
                              color: '#098a8b',
                              fontSize: '2rem',
                              marginBottom: '0.5rem'
                            }}>
                              <FaBriefcase />
                            </div>
                            <h6 style={{
                              fontWeight: 600,
                              color: '#082c5e',
                              fontSize: '0.85rem',
                              marginBottom: '2px'
                            }}>
                              Work as Freelancer
                            </h6>
                            <small style={{ color: '#888', fontSize: '0.7rem' }}>
                              Offer services
                            </small>
                            {formData.role === 'provider' && (
                              <div style={{
                                marginTop: '8px',
                                color: '#098a8b',
                                fontSize: '0.7rem'
                              }}>
                                <FaCheckCircle /> Selected
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        background: '#098a8b',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 600,
                        height: '52px'
                      }}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Form>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    margin: '20px 0'
                  }}>
                    <hr style={{ flex: 1, borderColor: '#e8edf2' }} />
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>OR</span>
                    <hr style={{ flex: 1, borderColor: '#e8edf2' }} />
                  </div>

                  {/* ✅ FIXED: Google Signup Button */}
                  <div style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSignup}
                      onError={() => {
                        console.error('Google Signup Failed');
                        toast.error('Google Signup Failed');
                      }}
                      theme="outline"
                      size="large"
                      text="signup_with"  // ✅ signup ke liye
                      shape="rectangular"
                      // ❌ width="100%" HATA DIYA
                      ux_mode="popup"
                    />
                  </div>

                  <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: '#888',
                    fontSize: '0.9rem'
                  }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{
                      color: '#098a8b',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Login here <FaArrowRight style={{ fontSize: '0.8rem' }} />
                    </Link>
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;