import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { getAllCars } from '../services/carService';

const CarListing = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    fuel: '',
    transmission: '',
    sortBy: 'price-asc'
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);
        setFilteredCars(allCars);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const brand = urlParams.get('brand') || '';
    const minPrice = urlParams.get('minPrice') || '';
    const maxPrice = urlParams.get('maxPrice') || '';
    const year = urlParams.get('year') || '';

    setFilters(prev => ({
      ...prev,
      brand,
      minPrice,
      maxPrice,
      year
    }));
  }, [location.search]);

  useEffect(() => {
    let filtered = cars.filter(car => {
      return (
        (!filters.brand || car.brand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters.minPrice || car.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || car.price <= parseInt(filters.maxPrice)) &&
        (!filters.year || car.year === parseInt(filters.year)) &&
        (!filters.fuel || car.fuel === filters.fuel) &&
        (!filters.transmission || car.transmission === filters.transmission)
      );
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  }, [cars, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      fuel: '',
      transmission: '',
      sortBy: 'price-asc'
    });
  };

  return (
    <div style={{ marginTop: '100px', minHeight: '100vh' }}>
      <Container>
        <Row>
          <Col lg={3} className="mb-4">
            <div className="filter-sidebar">
              <h5 className="mb-3">
                <i className="bi bi-funnel me-2"></i>
                Filters
              </h5>

              <Form>
                {/* Brand Filter */}
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    placeholder="Brand"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Min Price (Rs.)</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Max Price (Rs.)</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="100000"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    placeholder="Year"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fuel Type</Form.Label>
                  <Form.Select
                    name="fuel"
                    value={filters.fuel}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Fuel</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="Diesel">Diesel</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Transmission</Form.Label>
                  <Form.Select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="outline-secondary"
                  onClick={clearFilters}
                  className="w-100"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Clear Filters
                </Button>
              </Form>
            </div>
          </Col>

          {/* Car Listings */}
          <Col lg={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Cars for Sale ({filteredCars.length} found)</h2>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="me-2 mb-0">Sort by:</Form.Label>
                <Form.Select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  style={{ width: 'auto' }}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="year-asc">Year: Oldest First</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Row>
              {filteredCars.map(car => (
                <Col md={6} lg={4} key={car.id} className="mb-4">
                  <Card className="car-card h-100">
                    <Card.Img
                      variant="top"
                      src={car.imageUrls[0] || 'https://via.placeholder.com/400x250'}
                      className="car-card-img"
                    />
                    <Card.Body className="car-card-body d-flex flex-column">
                      <Card.Title className="car-title">{car.title}</Card.Title>
                      <div className="car-price">₹{car.price?.toLocaleString()}</div>
                      <div className="car-details">
                        <div><i className="bi bi-calendar me-1"></i>{car.year}</div>
                        <div><i className="bi bi-speedometer me-1"></i>{car.mileage || 'N/A'} mi</div>
                      </div>
                      <div className="car-details">
                        <div><i className="bi bi-fuel-pump me-1"></i>{car.fuel}</div>
                        <div><i className="bi bi-gear me-1"></i>{car.transmission}</div>
                      </div>
                      <div className="mb-3">
                        <i className="bi bi-geo-alt me-1"></i>
                        <small className="text-muted">{car.location || 'Unknown'}</small>
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

            {filteredCars.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                <h3 className="mt-3">No cars found</h3>
                <p className="text-muted">Try adjusting your filters to see more results.</p>
                <Button onClick={clearFilters} className="btn-primary-custom">
                  Clear All Filters
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarListing;
