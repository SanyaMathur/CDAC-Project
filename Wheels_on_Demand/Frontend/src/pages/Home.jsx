import React from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeaturedCars from '../components/FeaturedCars';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="hero-content fade-in">
              <h1 className="hero-title">Find Your Perfect Car</h1>
              <p className="hero-subtitle">
                Discover thousands of quality used cars from trusted dealers and private sellers. 
                Your dream car is just a click away.
              </p>
              <div className="d-flex gap-3">
                <Link to="/cars">
                  <Button className="btn-primary-custom" size="lg">
                    <i className="bi bi-search me-2"></i>
                    Browse Cars
                  </Button>
                </Link>
                <Link to="/add-car">
                  <Button variant="outline-light" size="lg">
                    <i className="bi bi-plus-circle me-2"></i>
                    Sell Your Car
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="src\Images\baleno.jpg" 
                alt="Car showcase" 
                className="img-fluid rounded-3"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
          
          {/* <SearchBar /> */}
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="section-title">Why Choose WheelsOnDemand?</h2>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="bi bi-shield-check" style={{ fontSize: '3rem', color: 'var(--secondary-color)' }}></i>
              </div>
              <h4>Verified Sellers</h4>
              <p>All our sellers are verified to ensure safe and secure transactions.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="bi bi-car-front" style={{ fontSize: '3rem', color: 'var(--secondary-color)' }}></i>
              </div>
              <h4>Quality Cars</h4>
              <p>Every car is inspected to meet our high-quality standards.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-icon mb-3">
                <i className="bi bi-credit-card" style={{ fontSize: '3rem', color: 'var(--secondary-color)' }}></i>
              </div>
              <h4>Best Prices</h4>
              <p>Competitive pricing with transparent costs and no hidden fees.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Cars */}
      <section className="py-5">
        <Container>
          <h2 className="section-title">Featured Cars</h2>
          <FeaturedCars />
          <div className="text-center mt-4">
            <Link to="/cars">
              <Button className="btn-outline-primary-custom" size="lg">
                View All Cars
                <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-3">
              <h2 className="display-4 fw-bold text-warning">50+</h2>
              <p>Cars Available</p>
            </Col>
            <Col md={3} className="mb-3">
              <h2 className="display-4 fw-bold text-warning">25+</h2>
              <p>Happy Customers</p>
            </Col>
            <Col md={3} className="mb-3">
              <h2 className="display-4 fw-bold text-warning">10+</h2>
              <p>Verified Dealers</p>
            </Col>
            <Col md={3} className="mb-3">
              <h2 className="display-4 fw-bold text-warning">24/7</h2>
              <p>Customer Support</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;