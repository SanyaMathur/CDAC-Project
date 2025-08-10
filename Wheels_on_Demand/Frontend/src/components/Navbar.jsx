import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="bi bi-car-front-fill me-2"></i>
            WheelsOnDemand
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cars">
              <Nav.Link>Browse Cars</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav>
            {isLoggedIn ? (
              <>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    size="sm"
                    style={{
                      fontWeight: '500',
                      fontSize: '0.9rem',
                      padding: '6px 12px',
                      borderRadius: '30px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f8f9fa',
                      color: '#333',
                    }}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {userEmail}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <LinkContainer to="/dashboard">
                      <Dropdown.Item>Dashboard</Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <Button className="btn-primary-custom" size="sm">
                      Sign Up
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
