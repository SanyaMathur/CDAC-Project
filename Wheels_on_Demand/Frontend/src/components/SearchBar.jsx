import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    location: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to cars page with search params
    const searchParams = new URLSearchParams(searchData);
    navigate(`/cars?${searchParams.toString()}`);
  };

  const carBrands = ['Toyota', 'Honda', 'Ford', 'M', 'Audi', 'Hyundai', 'Kia'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 25}, (_, i) => currentYear - i);

  return (
    <div className="search-container">
      <h3 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>
        <i className="bi bi-search me-2"></i>
        Find Your Dream Car
      </h3>
      <Form onSubmit={handleSearch} className="search-form">
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Select 
                name="brand" 
                value={searchData.brand} 
                onChange={handleInputChange}
              >
                <option value="">All Brands</option>
                {carBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Enter model"
                value={searchData.model}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Select 
                name="year" 
                value={searchData.year} 
                onChange={handleInputChange}
              >
                <option value="">Any Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label>Min Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={searchData.minPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label>Max Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                placeholder="Max price"
                value={searchData.maxPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter city or state"
                value={searchData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="mb-3 d-flex align-items-end">
            <Button type="submit" className="btn-primary-custom w-100">
              <i className="bi bi-search me-1"></i>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;