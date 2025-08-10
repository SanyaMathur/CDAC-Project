import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Badge,
  Button,
  Form,
} from 'react-bootstrap';
import { getCarById } from '../services/carService';
import ContactSellerModal from '../components/ContactSellerModal';
import BuyCarModal from '../components/BuyCarModal';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        carId,
        sellerId,
        userId,
      };
      await sendContactRequest(payload);
      setSuccess('Message sent successfully!');
      setError('');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (err) {
      setError('Failed to send message.');
      setSuccess('');
    }
  };


  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center mt-5">Car not found.</div>;
  }

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            {car.imageUrls && car.imageUrls.length > 0 && (
              <Carousel>
                {car.imageUrls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Car Image ${index + 1}`}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <Card.Body>
              <Card.Title>
                {car.title}{' '}
                <Badge bg="success" className="ms-2">
                  ₹{car.price}
                </Badge>
              </Card.Title>
              <Card.Text>{car.description}</Card.Text>
              <Row className="mb-2">
                <Col><strong>Location:</strong> {car.location}</Col>
                <Col><strong>Year:</strong> {car.year}</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Fuel:</strong> {car.fuel}</Col>
                <Col><strong>Transmission:</strong> {car.transmission}</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Color:</strong> {car.color}</Col>
                <Col><strong>Mileage:</strong> {car.mileage} km</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Brand:</strong> {car.brand}</Col>
                <Col><strong>Model:</strong> {car.model}</Col>
              </Row>
              <Row className="mb-2">
                <Col><strong>Engine:</strong> {car.engine}</Col>
                <Col><strong>Drivetrain:</strong> {car.drivetrain}</Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Features */}
          <Card className="mb-4">
            <Card.Header>Features</Card.Header>
            <Card.Body>
              <Row>
                {(car.features || []).map((feature, index) => (
                  <Col md={6} key={index} className="mb-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {feature}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Seller Info */}
        <Col md={4}>
          {car.user && (
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">
                      {car.user.firstName} {car.user.lastName}
                    </h5>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    className="btn-primary-custom"
                    onClick={() => setShowContactForm(true)}
                  >
                    <i className="bi bi-envelope me-2"></i>
                    Contact Seller
                  </Button>

                  <Button
                    variant="outline-success"
                    className="mt-2"
                    onClick={() => setShowBuyModal(true)}
                  >
                    <i className="bi bi-cash-stack me-2"></i>
                    Buy This Car
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {showContactForm && (
            <ContactSellerModal
              carId={car.id}
              sellerId={car.user?.id}
              userId={userId}
              onClose={() => setShowContactForm(false)}
            />
          )}

          {
            showBuyModal && (
              <BuyCarModal
                show={showBuyModal}
                onClose={() => setShowBuyModal(false)}
                car={car}
              />

            )
          }


        </Col>

      </Row>
    </Container>
  );
};

export default CarDetail;
