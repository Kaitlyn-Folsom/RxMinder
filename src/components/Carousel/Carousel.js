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
              <Image id="carouselImage" alt="caregiver" src="http://18672-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2015/12/BoomerWomanHuggingMother_SA.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img id="carouselImage" alt="caregiver" src="https://www.bayshore.ca/wp-content/uploads/2014/06/iStock_000017530512Large.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img id="carouselImage" alt="caregiver" src="https://www.vhl.org/wp-content/uploads/2015/11/Caregiver-center.jpg" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
  
    );
  }
} 


export default CarouselHome;