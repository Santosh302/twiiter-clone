// Home.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../Components/NavBar'; 
import Posts from '../Components/Posts'; 
import '../Pages/Home.css'

const Home = () => {
  return (
    <Container fluid>
      <Row>
        
        {/* Navigation Column */}
        <Col xs={3} sm={3} md={3} lg={3} className="navigation-column">
          <NavBar />
        </Col>

        {/* Posts and Comments Column */}
        <Col xs={6} sm={6} md={6} lg={6} className="posts-column">
          <Posts />
        </Col>

          {/* Blank Column */}
          <Col xs={3} sm={3} md={3} lg={3}>
          </Col>
      </Row>
    </Container>
  );
};

export default Home;
