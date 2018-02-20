  import React from 'react';
// import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import "./Grid.css";

class GridHome extends React.Component {
  render() {
    return (
    <Grid className="grid">
      <Row className="row rowGrid">
        <Col className="column" xs={6} md={3}>
          <h2>Dynamic Medication Scheduling</h2>
          <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
              <div className="front" id="pill-icon">
              </div>
              <div className="back" id="pill-icon-fade">
                <h4 className="grid-info"> Create your own personalized medication schedule</h4>
              </div>
            </div>
          </div>
        </Col>
        <Col className="column" xs={6} md={3}>
          <h2>Text Notifications and Alerts</h2>
          <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
              <div className="front" id="ear-icon">
              </div>
              <div className="back" id="ear-icon-fade">
                <h4 className="grid-info">Alerts sent directly to the patient's phone</h4>
              </div>
            </div>
          </div>
        </Col>
        <Col className="column" xs={6} md={3}>
          <h2>Detailed Intake Notes</h2>
          <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
              <div className="front" id="survey-icon">
              </div>
              <div className="back" id="survey-icon-fade">
                <h4 className="grid-info">Should your the med be taken with food? water? etc.</h4>
              </div>
            </div>
          </div>

        </Col>      
        <Col className="column" xs={6} md={3}>
          <h2>Keep Your Mind at Ease</h2>
          <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
              <div className="front" id="heart-icon">
              </div>
              <div className="back" id="heart-icon-fade">
                <h4 className="grid-info">Follow loved-ones schedule in real-time</h4>
              </div>
            </div>
          </div>
        </Col>
        
      </Row>
    </Grid>
    );
  }
} 

export default GridHome;
