import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import "./Jumbotron.css";
import { Image } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"



class Jumbotrons extends React.Component {
  render() {
    return (
    <Jumbotron className="Jumbotron">
    <Image className="leftimage" src={require("../../assets/pill_capsule.png")}></Image>
    <h1 className="righttext">RxMinder</h1>
    <p id="text">Welcome to RxMinder! Designed to give you peace of mind while your loved one still maintains their independence. </p>
  
  </Jumbotron>
		);
	}
}

export default Jumbotrons;