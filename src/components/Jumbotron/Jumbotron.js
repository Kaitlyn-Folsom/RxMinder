import React from 'react';
import "./Jumbotron.css";
import CarouselHome from "../Carousel";
// import { Image } from "react-bootstrap";
import { Jumbotron, Row, Col, Carousel } from "react-bootstrap"

class Jumbotrons extends React.Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item className="park">
        <div className="cellphone"></div>       
          <Carousel.Caption className="caption header">
            <p>Welcome to RxMinder!</p>
          </Carousel.Caption>    
            <Carousel.Caption className="caption">
            <p>The app that tracks a persons medication schedule and gives peave of mind to their family members.</p>
          </Carousel.Caption>        
        </Carousel.Item>
        <Carousel.Item className="living-room">
          <div className="cellphone"></div>
          <Carousel.Caption className="caption">
            <p>Recieve med reminders at home!</p>
          </Carousel.Caption>         
        </Carousel.Item>
        <Carousel.Item className="other">
          {/* <div className="cellphone"></div> */}
          <Carousel.Caption className="caption">
          <p>Have peace of mind knowing you'll be notified of any missed medications.</p>
          </Carousel.Caption>    
          <Carousel.Caption className="caption">
          <p>Let's your loved ones excercise their independence</p>
          </Carousel.Caption>      
          <Carousel.Caption className="caption">
          <p>something about less stress.</p>
          </Carousel.Caption>  
        </Carousel.Item>
      </Carousel>

      // <Jumbotron>
      //   <div className="cellphone"></div>
      //     <Col lg={6} sm={6}>
      //       <p>The app that texts you medication reminders</p>
      //     </Col>
      //     <Col lg={6} sm={6}>
      //     </Col>
      // </Jumbotron>
		);
	}
}

export default Jumbotrons;
