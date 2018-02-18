import React from 'react';
import { Image, Row, Col, Carousel } from 'react-bootstrap'
import "./Carousel.css";

class CarouselHome extends React.Component {
  render() {
    return (

      <Row>
        <Col md={12}>
          <Carousel>
            <Carousel.Item>
              <img 
              src="../../assets/park-landscape.jpg"
              className="park"
               />
            </Carousel.Item>
            <Carousel.Item className="living-room">
            </Carousel.Item>
            <Carousel.Item className="other">
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
  
    );
  }
} 


export default CarouselHome;
