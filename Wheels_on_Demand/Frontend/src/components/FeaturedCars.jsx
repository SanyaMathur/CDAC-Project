import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCars } from '../services/carService'; 

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await getAllCars();
        setCars(cars); // Show all cars
      } catch (error) {
        console.error('Failed to load cars', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Row>
      {cars.map(car => (
        <Col lg={3} md={6} key={car.id} className="mb-4">
          <Card className="car-card h-100">
            <div className="position-relative">
              <Card.Img 
                variant="top" 
                src={car.imageUrls?.[0] || 'https://via.placeholder.com/300'} 
                className="car-card-img"
              />
            </div>
            <Card.Body className="car-card-body d-flex flex-column">
              <Card.Title className="car-title">{car.title}</Card.Title>
              <div className="car-price">Rs. {car.price.toLocaleString()}</div>
              
              <div className="car-details">
                <div>
                  <i className="bi bi-calendar me-1"></i>
                  {car.year}
                </div>
                <div>
                  <i className="bi bi-speedometer me-1"></i>
                  {car.mileage} mi
                </div>
              </div>
              
              <div className="car-details">
                <div>
                  <i className="bi bi-fuel-pump me-1"></i>
                  {car.fuel}
                </div>
                <div>
                  <i className="bi bi-gear me-1"></i>
                  {car.transmission}
                </div>
              </div>
              
              <div className="mb-3">
                <i className="bi bi-geo-alt me-1"></i>
                <small className="text-muted">{car.location}</small>
              </div>
              
              <div className="mt-auto">
                <Link to={`/car/${car.id}`}>
                  <Button className="btn-primary-custom w-100">
                    View Details
                    <i className="bi bi-arrow-right ms-1"></i>
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FeaturedCars;
