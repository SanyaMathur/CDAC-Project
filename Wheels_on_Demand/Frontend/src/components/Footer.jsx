import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5>
              <i className="bi bi-car-front-fill me-2"></i>
              WheelsOnDemand
            </h5>
            <p>
              Your trusted marketplace for buying and selling quality used cars. 
              Find your perfect car or sell your current one with ease.
            </p>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cars">Browse Cars</Link></li>
              <li><Link to="/add-car">Sell Your Car</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
          </Col>
        
          
          <Col lg={4} md={6} className="mb-4">
            <h5>Contact Info</h5>
            <div className="mb-2">
              <i className="bi bi-telephone me-2"></i>
              98XXXX6190
            </div>
            <div className="mb-2">
              <i className="bi bi-envelope me-2"></i>
              support@WheelsOnDemand.com
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2024 WheelsOnDemand. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;