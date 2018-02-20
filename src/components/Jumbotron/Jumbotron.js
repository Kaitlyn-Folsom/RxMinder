import React from 'react';
import "./Jumbotron.css";
import { Carousel, Image } from "react-bootstrap"

class Jumbotrons extends React.Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item className="background-images background-1">
        <div className="cellphone"></div>   
        <Image src="https://png.pngtree.com/element_pic/00/16/08/0457a339de55f93.jpg"/>    
          <Carousel.Caption className="caption header">
            <h1>Welcome to RxMinder!</h1>
          </Carousel.Caption>    
            <Carousel.Caption className="caption c-1">
            <p>Schedule Medication reminders for others.</p>
          </Carousel.Caption>   
          <Carousel.Caption className="caption c-2">
            <p>Designed to give you peace of mind while your loved ones maintian their independence</p>
          </Carousel.Caption>      
        </Carousel.Item>
        <Carousel.Item className="background-images background-2">
          <Carousel.Caption className="caption c-3">
            <p>Recieve reminders whether at home or on the go!</p>
          </Carousel.Caption>   
          <Carousel.Caption className="caption c-4">
            <p>Never forget to take your medication again</p>
          </Carousel.Caption>       
        </Carousel.Item>
        <Carousel.Item className="background-images background-3">
          <Carousel.Caption className="caption c-5">
          <p>Rest easy knowing you'll be notified of any missed medications</p>
          </Carousel.Caption>    
          <Carousel.Caption className="caption c-6">
          <p>Let's your loved ones excercise their independence</p>
          </Carousel.Caption>      
        </Carousel.Item>
      </Carousel>
		);
	}
}

export default Jumbotrons;
