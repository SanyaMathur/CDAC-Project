import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BuyCarModal = ({ show, onClose, car }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Simulate payment success
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
      navigate('/');
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buy This Car - ₹{car?.price}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && <Alert variant="success">Payment Successful!</Alert>}

        <Form onSubmit={handlePayment}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="XXXX-XXXX-XXXX-1234"
              name="cardNumber"
              required
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="19"
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between">
            <div style={{ width: '48%' }}>
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                name="expiry"
                required
                value={formData.expiry}
                onChange={handleChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                placeholder="***"
                name="cvv"
                required
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Make Payment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BuyCarModal;
