import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Tab, Tabs, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';
import { getCarsBySellerId } from '../services/carService';
import { getContactRequestBySellerId } from '../services/contactService';
// import api from '../services/axiosConfig';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [userCars, setUserCars] = useState([]);
  const [user, setUser] = useState(null);
  const [buyerInquiries, setBuyerInquiries] = useState([]);

  const userId = localStorage.getItem('userId');

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch cars listed by user
useEffect(() => {
  const fetchUserCars = async () => {
    try {
      console.log("user id in fetch car by user id : ", userId);
      const cars = await getCarsBySellerId(userId);
      console.log("Fetched user cars:", cars);
      setUserCars(cars);
    } catch (error) {
      console.error("Failed to load user cars:", error);
    }
  };
  fetchUserCars();
}, [userId]);


  // Fetch buyer inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getContactRequestBySellerId(userId);
        setBuyerInquiries(data);
      } catch (error) {
        console.error("Failed to load buyer inquiries:", error);
      }
    };
    fetchInquiries();
  }, [userId]);

  return (
    <div style={{ marginTop: '100px', minHeight: '100vh' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </h1>
          <Link to="/add-car">
            <Button className="btn-primary-custom">
              <i className="bi bi-plus-circle me-2"></i>
              Add New Car
            </Button>
          </Link>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          {/* My Listings */}
<Tab eventKey="listings" title="My Listings">
  <Card>
    <Card.Header><h5 className="mb-0">Your Car Listings</h5></Card.Header>
    <Card.Body>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!userCars || userCars.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No cars listed yet.</td>
            </tr>
          ) : (
            userCars.map(car => (
              <tr key={car.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : 'https://via.placeholder.com/60'} 
                      alt={car.title}
                      style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div>
                      <div className="fw-bold">{car.title}</div>
                      <div className="text-muted small">{car.model} • {car.year}</div>
                    </div>
                  </div>
                </td>
                <td>₹{car.price?.toLocaleString()}</td>
                <td>
                  <Badge bg="success">Active</Badge> {/* You can conditionally show Sold, Inactive etc. */}
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <Button variant="outline-primary" size="sm" onClick={() => handleView(car.id)}>
                      <i className="bi bi-eye"></i>
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(car.id)}>
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(car.id)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
</Tab>


          {/* Buyer Inquiries */}
          <Tab eventKey="inquiries" title="Buyer Inquiries">
            <Card>
              <Card.Header><h5 className="mb-0">Messages from Buyers</h5></Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Car</th>
                      <th>Message</th>
                      <th>Contact</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!buyerInquiries || buyerInquiries.length === 0 ? (

                      <tr>
                        <td colSpan="5" className="text-center">No inquiries yet.</td>
                      </tr>
                    ) : (
                      buyerInquiries.map(req => (
                        <tr key={req.id}>
                          <td>{req.buyerFirstName} {req.buyerLastName}</td>
                          <td>{req.carTitle || 'Car not found'}</td>
                          <td>{req.message}</td>
                          <td>
                            <div>Email: {req.buyerEmail}<br/>Phone: {req.buyerPhone}</div>
                          </td>
                          <td>{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Profile */}
          {/* Profile */}
<Tab eventKey="profile" title="Profile">
  <Card>
    <Card.Header><h5 className="mb-0">Profile Information</h5></Card.Header>
    <Card.Body>
      {user ? (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await updateUser(user.id, user);
              alert("Profile updated successfully!");
            } catch (error) {
              alert("Failed to update profile.");
            }
          }}
        >
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="btn-primary-custom" type="submit">
            <i className="bi bi-check-circle me-2"></i>
            Update Profile
          </Button>
        </Form>
      ) : (
        <p>Loading profile...</p>
      )}
    </Card.Body>
  </Card>
</Tab>

        </Tabs>
      </Container>
    </div>
  );
};

export default Dashboard;
