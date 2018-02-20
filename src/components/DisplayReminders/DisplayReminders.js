import React from 'react';
import axios from 'axios';
import {Well, Row, Col} from "react-bootstrap";
import "./DisplayReminders.css";
import MilitaryTime from '../../Utils/MilitaryTime.js';

class DisplayReminders extends React.Component {
constructor() {
  super()
  this.state = {
      reminders: [],
      reminderTitle: "",
      dayToComplete: "",
      timeToComplete: "",
      medicationDosage: "",
      medicationRefillDate: "",
      reminderMessage: "",
      numberToText: ""
    }
}
  componentDidMount() {
    let day;
    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
    }

    const patientId = this.props.user.patients[0];

    // Get all reminders based on what day it is to display on the screen
    axios.get('/auth/reminders/' + patientId + "/" + day).then(response => {
      console.log(response.data);
      console.log(day);
      if (response.data) {
        this.setState({
          reminders: response.data
        })
      };
    });

     const queryDb = () => {
      // Get all reminders based on what day it is to display on the screen
      axios.get('/auth/reminders/' + patientId + "/" + day).then(response => {
        if (response.data) {
          this.setState({
            reminders: response.data
          })
        };
      });
    }

    // Run the queryDb function every 3 seconds
    setInterval(queryDb, 3000);
  }

  render() {
    return (
      <Row className="reminders-page">
        <Col lg={1}>
        </Col>
        <Col lg={10} className="todaysReminders">
          <h1 className="remindersh1">Today's Reminders:</h1>
            
              <div>
                {this.state.reminders.map(reminder => (
                      <Well key={reminder._id} id={reminder._id} className={"remindersWell " + (reminder.responseReceived ? " greenBG" : "") + (reminder.responseLate ? " redBG" : "")}>
                        <Row className="mainRow">
                          <Col sm={2}>
                            <h2 className="timeToComplete">{MilitaryTime.convertMilitaryToStandardTime(reminder.timeToComplete)}</h2>
                          </Col>
                          <Col sm={8}>
                            <h1 className="toDo">{reminder.reminderTitle}</h1>
                          </Col>
                          <Col sm={2}>
                          </Col>
                        </Row>
                        <Row className="infoRow">
                          <Col sm={4}>
                            <h3>Dosage: {reminder.medicationDosage }</h3>
                          </Col>
                          <Col sm={4}> 
                            <h3>Refill Date:</h3>
                            <h4 className="info">{reminder.medicationRefillDate}</h4>
                          </Col>
                          <Col sm={4}>
                            <h3>Message:</h3>
                            <h4>{reminder.reminderMessage}</h4>
                          </Col>
                        </Row>
                      </Well>
                ))}
              </div>
            </Col>
            <Col lg={1}>
            </Col>
          </Row>
    );
  }
}
export default DisplayReminders;
