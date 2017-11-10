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
          <Image height="250" width="250" alt="drug icon" src={require("../../assets/medicine.png")} rounded />
          <h4> Choose the time increments of your personal medication schedule</h4>
        </Col>
        <Col className="column" xs={6} md={3}>
        <h2>Text Notifications and Alerts</h2>
          <Image height="250" width="250" alt="ear icon" src={require("../../assets/ear-icon.png")} rounded />
          <h4> Get texts letting you know when your loved one has missed a scheduled reminder </h4>
        </Col>
        <Col className="column" xs={6} md={3}>
        <h2>Keep Up-To-Date on Medication</h2>
          <Image height="250" width="250" alt="stethoscope icon" src={require("../../assets/stethoscope-icon.png")} rounded />
          <h4>No need for confussion, enter your medication name and recieve a picture of that pill </h4>
        </Col>
        <h2>Always Keep Your Mind at Ease</h2>
        <Col className="column" xs={6} md={3}>
          <Image height="250" width="250" alt="heart icon" src={require("../../assets/heart-icon.png")} rounded />
          <h4>Follow along with your loved-ones schedule in real-time to monitor their medications</h4>
        </Col>
        
      </Row>
    </Grid>
    );
  }
} 

export default GridHome;