import { useState, useContext } from 'react';
import { Form, Button, Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaUser, FaCamera, FaBriefcase, FaGraduationCap, FaTools, 
  FaMapMarkerAlt, FaPhone, FaGlobe, FaPlus, FaTrash, FaCheck
} from 'react-icons/fa';
import API from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const AccountSetup = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    bio: '',
    phone: '',
    location: '',
    website: '',
    company: '',
    skills: '',
    hourlyRate: '',
    categories: [],
    experience: [],
    education: [],
  });

  const categories = [
    'Web Development', 'Mobile App Development', 'Graphic Design',
    'Content Writing', 'Digital Marketing', 'SEO', 'Social Media Management',
    'Video Editing', 'UI/UX Design', 'Data Entry', 'Virtual Assistant', 'E-commerce'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCategoryToggle = (category) => {
    const updated = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', duration: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', year: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload profile picture if selected (OPTIONAL - agar fail ho toh bhi chalega)
      if (profilePic) {
        try {
          const imageFormData = new FormData();
          imageFormData.append('profilePic', profilePic);
          await API.put('/users/profile/picture', imageFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          console.log('✅ Profile picture uploaded');
        } catch (imgError) {
          console.warn('⚠️ Profile picture upload failed, continuing without it:', imgError);
          // Picture upload fail ho toh bhi setup continue karega
        }
      }

      // 2. Complete account setup
      const setupData = {
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        company: formData.company,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        categories: formData.categories,
        experience: formData.experience,
        education: formData.education,
      };

      console.log('🔵 Sending setup data:', setupData);

      const res = await API.put('/users/complete-setup', setupData);
      console.log('✅ Setup response:', res.data);
      
      // Update user in context
      login(res.data.user, localStorage.getItem('token'));
      
      toast.success('Account setup completed successfully! 🎉');
      
      // Redirect based on role
      setTimeout(() => {
        if (user?.role === 'provider') {
          navigate('/freelancer/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }, 1000);
      
    } catch (error) {
      console.error('❌ Setup Error:', error);
      console.error('❌ Error Response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%)',
      padding: '40px 0'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
            {/* Header Card */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#082c5e' }}>
                      Complete Your Profile
                    </h2>
                    <p className="text-muted mb-0">
                      Step {step} of 4 - Let's set up your account
                    </p>
                  </div>
                  <div style={{ width: '200px' }}>
                    <ProgressBar 
                      now={progress} 
                      variant="success"
                      style={{ height: '8px', borderRadius: '10px' }}
                    />
                    <small className="text-muted d-block text-end mt-1">
                      {Math.round(progress)}% Complete
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Form Card */}
            <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  
                  {/* STEP 1: Basic Info + Profile Picture */}
                  {step === 1 && (
                    <>
                      <h4 className="fw-bold mb-4" style={{ color: '#082c5e' }}>
                        <FaUser className="me-2" /> Basic Information
                      </h4>

                      {/* Profile Picture */}
                      <div className="text-center mb-4">
                        <div 
                          style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: '#f8fafc',
                            border: '3px dashed #098a8b',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                          onClick={() => document.getElementById('profilePicInput').click()}
                        >
                          {preview ? (
                            <img 
                              src={preview} 
                              alt="Preview" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <FaCamera size={40} style={{ color: '#098a8b' }} />
                          )}
                        </div>
                        <input
                          id="profilePicInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                        <p className="text-muted small mt-2">Click to upload profile picture</p>
                      </div>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaPhone className="me-2 text-primary" /> Phone Number
                            </Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              placeholder="+92 300 1234567"
                              value={formData.phone}
                              onChange={handleChange}
                              style={{ borderRadius: '10px', height: '48px' }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaMapMarkerAlt className="me-2 text-primary" /> Location
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="location"
                              placeholder="City, Country"
                              value={formData.location}
                              onChange={handleChange}
                              style={{ borderRadius: '10px', height: '48px' }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {user?.role === 'customer' && (
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={handleChange}
                            style={{ borderRadius: '10px', height: '48px' }}
                          />
                        </Form.Group>
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <FaGlobe className="me-2 text-primary" /> Website (optional)
                        </Form.Label>
                        <Form.Control
                          type="url"
                          name="website"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={handleChange}
                          style={{ borderRadius: '10px', height: '48px' }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Bio / About You *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="bio"
                          placeholder={user?.role === 'provider' 
                            ? "Tell clients about your expertise, experience, and what makes you unique..."
                            : "Tell freelancers about your business and what you're looking for..."}
                          value={formData.bio}
                          onChange={handleChange}
                          required
                          style={{ borderRadius: '10px' }}
                        />
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="button"
                        className="w-100 py-2"
                        style={{ borderRadius: '10px', background: '#098a8b', border: 'none' }}
                        onClick={() => setStep(2)}
                        disabled={!formData.bio}
                      >
                        Next: Professional Details →
                      </Button>
                    </>
                  )}

                  {/* STEP 2: Skills & Categories (For Freelancers) */}
                  {step === 2 && user?.role === 'provider' && (
                    <>
                      <h4 className="fw-bold mb-4" style={{ color: '#082c5e' }}>
                        <FaTools className="me-2" /> Skills & Expertise
                      </h4>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Skills (comma separated) *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="skills"
                          placeholder="React, Node.js, MongoDB, UI/UX Design"
                          value={formData.skills}
                          onChange={handleChange}
                          required
                          style={{ borderRadius: '10px', height: '48px' }}
                        />
                        <Form.Text className="text-muted">
                          Add skills that describe your expertise
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          Hourly Rate (PKR)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="hourlyRate"
                          placeholder="1500"
                          value={formData.hourlyRate}
                          onChange={handleChange}
                          min="0"
                          style={{ borderRadius: '10px', height: '48px' }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold d-block mb-2">
                          Select Your Categories (Choose up to 3) *
                        </Form.Label>
                        <Row className="g-2">
                          {categories.map((category) => (
                            <Col xs={6} md={4} key={category}>
                              <div
                                onClick={() => handleCategoryToggle(category)}
                                style={{
                                  padding: '12px',
                                  borderRadius: '10px',
                                  border: `2px solid ${formData.categories.includes(category) ? '#098a8b' : '#e8edf2'}`,
                                  background: formData.categories.includes(category) ? 'rgba(9, 138, 139, 0.06)' : '#f8fafc',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s',
                                  textAlign: 'center',
                                  fontSize: '0.85rem',
                                  fontWeight: formData.categories.includes(category) ? '600' : '400',
                                  color: formData.categories.includes(category) ? '#098a8b' : '#555'
                                }}
                              >
                                {formData.categories.includes(category) && <FaCheck className="me-1" />}
                                {category}
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <small className="text-muted d-block mt-2">
                          Selected: {formData.categories.length}/3
                        </small>
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-secondary" 
                          className="flex-fill py-2"
                          onClick={() => setStep(1)}
                        >
                          ← Back
                        </Button>
                        <Button 
                          variant="primary" 
                          type="button"
                          className="flex-fill py-2"
                          style={{ background: '#098a8b', border: 'none' }}
                          onClick={() => setStep(3)}
                          disabled={formData.categories.length === 0}
                        >
                          Next: Experience →
                        </Button>
                      </div>
                    </>
                  )}

                  {/* STEP 2 (For Customers): Skip to Categories */}
                  {step === 2 && user?.role === 'customer' && (
                    <>
                      <h4 className="fw-bold mb-4" style={{ color: '#082c5e' }}>
                        What are you looking for?
                      </h4>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold d-block mb-2">
                          Select Categories of Interest
                        </Form.Label>
                        <Row className="g-2">
                          {categories.map((category) => (
                            <Col xs={6} md={4} key={category}>
                              <div
                                onClick={() => handleCategoryToggle(category)}
                                style={{
                                  padding: '12px',
                                  borderRadius: '10px',
                                  border: `2px solid ${formData.categories.includes(category) ? '#098a8b' : '#e8edf2'}`,
                                  background: formData.categories.includes(category) ? 'rgba(9, 138, 139, 0.06)' : '#f8fafc',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  fontSize: '0.85rem',
                                }}
                              >
                                {category}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" className="flex-fill" onClick={() => setStep(1)}>
                          ← Back
                        </Button>
                        <Button 
                          variant="primary" 
                          className="flex-fill"
                          style={{ background: '#098a8b', border: 'none' }}
                          onClick={() => setStep(4)}
                        >
                          Finish Setup →
                        </Button>
                      </div>
                    </>
                  )}

                  {/* STEP 3: Experience */}
                  {step === 3 && (
                    <>
                      <h4 className="fw-bold mb-4" style={{ color: '#082c5e' }}>
                        <FaBriefcase className="me-2" /> Work Experience
                      </h4>

                      {formData.experience.map((exp, index) => (
                        <Card key={index} className="mb-3 border" style={{ borderRadius: '12px' }}>
                          <Card.Body>
                            <div className="d-flex justify-content-between mb-3">
                              <h6 className="fw-bold mb-0">Experience #{index + 1}</h6>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => removeExperience(index)}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-2">
                                  <Form.Control
                                    type="text"
                                    placeholder="Job Title"
                                    value={exp.title}
                                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                    style={{ borderRadius: '8px' }}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-2">
                                  <Form.Control
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    style={{ borderRadius: '8px' }}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-2">
                                  <Form.Control
                                    type="text"
                                    placeholder="Duration (e.g., 2020-2022)"
                                    value={exp.duration}
                                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                    style={{ borderRadius: '8px' }}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Control
                                  as="textarea"
                                  rows={2}
                                  placeholder="Brief description"
                                  value={exp.description}
                                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                  style={{ borderRadius: '8px' }}
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}

                      <Button 
                        variant="outline-primary" 
                        className="mb-4 w-100"
                        onClick={addExperience}
                        style={{ borderRadius: '10px' }}
                      >
                        <FaPlus className="me-2" /> Add Experience
                      </Button>

                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" className="flex-fill" onClick={() => setStep(2)}>
                          ← Back
                        </Button>
                        <Button 
                          variant="primary" 
                          type="button"
                          className="flex-fill"
                          style={{ background: '#098a8b', border: 'none' }}
                          onClick={() => setStep(4)}
                        >
                          Next: Education →
                        </Button>
                      </div>
                    </>
                  )}

                  {/* STEP 4: Education + Final Submit */}
                  {step === 4 && (
                    <>
                      <h4 className="fw-bold mb-4" style={{ color: '#082c5e' }}>
                        <FaGraduationCap className="me-2" /> Education
                      </h4>

                      {formData.education.map((edu, index) => (
                        <Card key={index} className="mb-3 border" style={{ borderRadius: '12px' }}>
                          <Card.Body>
                            <div className="d-flex justify-content-between mb-3">
                              <h6 className="fw-bold mb-0">Education #{index + 1}</h6>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => removeEducation(index)}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                            <Row>
                              <Col md={4}>
                                <Form.Control
                                  type="text"
                                  placeholder="Degree"
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                  style={{ borderRadius: '8px' }}
                                />
                              </Col>
                              <Col md={4}>
                                <Form.Control
                                  type="text"
                                  placeholder="Institution"
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                  style={{ borderRadius: '8px' }}
                                />
                              </Col>
                              <Col md={4}>
                                <Form.Control
                                  type="text"
                                  placeholder="Year"
                                  value={edu.year}
                                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                  style={{ borderRadius: '8px' }}
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}

                      <Button 
                        variant="outline-primary" 
                        className="mb-4 w-100"
                        onClick={addEducation}
                        style={{ borderRadius: '10px' }}
                      >
                        <FaPlus className="me-2" /> Add Education
                      </Button>

                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" className="flex-fill" onClick={() => setStep(3)}>
                          ← Back
                        </Button>
                        <Button 
                          variant="primary" 
                          type="submit"
                          className="flex-fill"
                          style={{ background: '#098a8b', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? 'Completing Setup...' : '✓ Complete Setup'}
                        </Button>
                      </div>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountSetup;