import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { addCar } from '../services/carService';

const AddCar = () => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel: '',
    transmission: '',
    color: '',
    engine: '',
    drivetrain: '',
    location: '',
    description: '',
    features: [],
    images: ['', '', '']
  });

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          features: [...prev.features, value]
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          features: prev.features.filter((feature) => feature !== value)
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userId = localStorage.getItem("userId");
    console.log("userid : ", userId);

    const allFeatures = [
      'Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation System',
      'Leather Seats', 'Heated Seats', 'Sunroof', 'Alloy Wheels',
      'Cruise Control', 'Power Windows', 'Power Steering', 'ABS',
      'Airbags', 'Keyless Entry'
    ];

    const featureIds = formData.features.map(f => allFeatures.indexOf(f) + 1);

    const payload = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      year: parseInt(formData.year),
      fuel: formData.fuel,
      transmission: formData.transmission,
      color: formData.color,
      mileage: parseInt(formData.mileage),
      brand: formData.brand,
      model: formData.model,
      engine: formData.engine,
      drivetrain: formData.drivetrain,
      userId: userId,
      imageUrls: formData.images.filter((url) => url.trim() !== ''),
      featureIds: featureIds
    };

    try {
      const response = await addCar(payload);
      console.log('Car added successfully:', response);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to add car: ' + err.response?.data?.message || err.message);
    }
  };

  const carFeatures = [
    'Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation System',
    'Leather Seats', 'Heated Seats', 'Sunroof', 'Alloy Wheels',
    'Cruise Control', 'Power Windows', 'Power Steering', 'ABS',
    'Airbags', 'Keyless Entry'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  return (
    <div style={{ marginTop: '100px', minHeight: '100vh' }}>
      <Container>
        <div className="mb-4">
          <h1><i className="bi bi-plus-circle me-2"></i>Add Your Car for Sale</h1>
          <p className="text-muted">Fill in the details below to list your car</p>
        </div>

        {showAlert && (
          <Alert variant="success">
            <i className="bi bi-check-circle me-2"></i>
            Car listing created successfully!
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8}>
              {/* Basic Info */}
              <Card className="mb-4">
                <Card.Header><h5><i className="bi bi-info-circle me-2"></i>Basic Information</h5></Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Car Title *</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., 2021 Toyota Camry Hybrid LE" required />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Brand *</Form.Label>
                        <Form.Control
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          placeholder="Enter car brand"
                          required
                        />
                      </Form.Group>

                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Model *</Form.Label>
                        <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Camry" required />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Year *</Form.Label>
                        <Form.Select name="year" value={formData.year} onChange={handleChange} required>
                          <option value="">Select Year</option>
                          {years.map((year) => <option key={year} value={year}>{year}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Vehicle Details */}
              <Card className="mb-4">
                <Card.Header><h5><i className="bi bi-car-front me-2"></i>Vehicle Details</h5></Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Price ($) *</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Mileage *</Form.Label>
                        <Form.Control type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Fuel Type *</Form.Label>
                        <Form.Select name="fuel" value={formData.fuel} onChange={handleChange} required>
                          <option value="">Select Fuel Type</option>
                          {['Gasoline', 'Hybrid', 'Electric', 'Diesel'].map(f => <option key={f} value={f}>{f}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Transmission *</Form.Label>
                        <Form.Select name="transmission" value={formData.transmission} onChange={handleChange} required>
                          <option value="">Select Transmission</option>
                          {['Automatic', 'Manual', 'CVT'].map(t => <option key={t} value={t}>{t}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Engine</Form.Label>
                        <Form.Control type="text" name="engine" value={formData.engine} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Drivetrain</Form.Label>
                        <Form.Select name="drivetrain" value={formData.drivetrain} onChange={handleChange}>
                          <option value="">Select Drivetrain</option>
                          {['Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive', '4-Wheel Drive'].map(d => <option key={d} value={d}>{d}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Location *</Form.Label>
                        <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Features */}
              <Card className="mb-4">
                <Card.Header><h5><i className="bi bi-gear me-2"></i>Features & Equipment</h5></Card.Header>
                <Card.Body>
                  <Row>
                    {carFeatures.map((feature, index) => (
                      <Col md={6} lg={4} key={index} className="mb-2">
                        <Form.Check
                          type="checkbox"
                          label={feature}
                          value={feature}
                          onChange={handleChange}
                          checked={formData.features.includes(feature)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>

              {/* Description */}
              <Card className="mb-4">
                <Card.Header><h5><i className="bi bi-chat-text me-2"></i>Description</h5></Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Car Description</Form.Label>
                    <Form.Control as="textarea" rows={5} name="description" value={formData.description} onChange={handleChange} />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column: Upload Image URLs */}
            <Col lg={4}>
              <Card className="mb-4">
                <Card.Header><h5><i className="bi bi-images me-2"></i>Photos</h5></Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Image URLs</Form.Label>
                    {[0, 1, 2].map((index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        placeholder={`Upload Image ${index + 1}`}
                        className="mb-2"
                        value={formData.images[index]}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                      />
                    ))}
                    <Form.Text className="text-muted">
                      Paste URLs of up to 3 images.
                    </Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>

              <div className="d-grid gap-2">
                <Button type="submit" className="btn-primary-custom" size="lg">
                  <i className="bi bi-check-circle me-2"></i>List My Car
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddCar;
