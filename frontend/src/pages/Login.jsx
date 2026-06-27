import { useState, useContext } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import API from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      toast.success('Welcome back! Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      console.log("Error Response:", error.response);
      console.log("Error Data:", error.response?.data);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Google Login Handler (component ke ANDAR)
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      
      // Backend ko credential bhejo
      const res = await API.post('/auth/google', {
        token: credentialResponse.credential,
      });
      
      // Login context update karo
      login(res.data.user, res.data.token);
      
      toast.success('Google Login Successful! 🎉');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Google Login Error:', error);
      toast.error(error.response?.data?.message || 'Google Login Failed');
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
                      Welcome back! Please login to continue
                    </p>

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
                      Login to Hiree
                    </h2>
                    <p style={{ color: '#888', fontSize: '0.95rem' }}>
                      Enter your credentials to access your account
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit}>
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

                    <Form.Group className="mb-3">
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
                          placeholder="Enter your password"
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

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check type="checkbox" label="Remember me" />
                      <Link to="/forgot-password" style={{
                        color: '#098a8b',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}>Forgot Password?</Link>
                    </div>

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
                      {loading ? 'Logging in...' : 'Login'}
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

                  {/* ✅ FIXED: Google Login Button */}
                  <div style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        console.error('Google Login Failed');
                        toast.error('Google Login Failed');
                      }}
                      theme="outline"
                      size="large"
                      text="signin_with"
                      shape="rectangular"
                      // ❌ width="100%" HATA DIYA (Google accept nahi karta)
                      // ✅ use_onesheet_login use karo ya width mat do
                      ux_mode="popup"
                    />
                  </div>

                  <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: '#888',
                    fontSize: '0.9rem'
                  }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{
                      color: '#098a8b',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Sign up here
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

export default Login;