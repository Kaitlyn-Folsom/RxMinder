  import React from 'react';
// import ReactDOM from 'react-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import "./Grid.css";

class GridHome extends React.Component {
  render() {
    return (
    <Grid className="grid">
      <Row className="row rowGrid">
        <Col className="column" xs={6} md={3}>
          <h2>Dynamic Medication Scheduling</h2>
          <Image classNAme="home-image" height="200" width="200" alt="drug icon" src={require("../../assets/medicine.png")} rounded />
          <h4 className="grid-info"> Create your own personalized medication schedule</h4>
        </Col>
        <Col className="column" xs={6} md={3}>
          <h2>Text Notifications and Alerts</h2>
          <Image height="200" width="200" alt="ear icon" src={require("../../assets/ear-icon.png")} rounded />
          <h4 className="grid-info">Alerts sent directly to the patient's phone</h4>
        </Col>
        <Col className="column" xs={6} md={3}>
          <h2>Detailed Intake Notes</h2>
          <Image height="200" width="200" alt="stethoscope icon" src={require("../../assets/stethoscope-icon.png")} rounded />
          <h4 className="grid-info">Should the med be taken with food? water? etc.</h4>
        </Col>      
        <Col className="column" xs={6} md={3}>
          <h2>Keep Your Mind at Ease</h2>
          <Image height="200" width="200" alt="heart icon" src={require("../../assets/heart-icon.png")} rounded />
          <h4 className="grid-info">Follow along with your loved-ones schedule in real-time</h4>
        </Col>
        
      </Row>
    </Grid>
    );
  }
} 

export default GridHome;
