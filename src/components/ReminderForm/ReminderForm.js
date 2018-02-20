import React from 'react';
import { Button, Row, Col, ControlLabel, FormControl, Form, Checkbox, Panel } from "react-bootstrap"
import axios from 'axios';
import "./ReminderForm.css"
import MilitaryTime from '../../Utils/MilitaryTime.js';
import { Redirect } from 'react-router-dom';
import {WarningBanner} from "../Alerts"


class ReminderForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      reminders: [],
      reminderTitle: "",
      titleFlag: false,
      timeToComplete: "",
      timeFlag: false,
      timeToCompleteHour: "",
      timeToCompleteMin: "",
      timeToCompleteAmPm: "",
      medicationDosage: "",
      medicationRefillDate: "",
      reminderMessage: "",
      messageFlag: false,
      redirectTo: null,
      selected: [],
      dayFlag: false,
    }
}
  componentDidMount() {
    const id = this.props.user._id;
    const patientId = this.props.user.patients[0];

    console.log("patientId: " + patientId);

    axios.get('/auth/patients/' + id).then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        this.setState({
          _id: response.data[0]._id
        })
      } else {
        alert("Please add a patient before adding a patient profile.")
        this.setState({
          redirectTo: "/"
        })

      };
    });

    axios.get('/auth/reminders/' + patientId).then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          reminders: response.data
        })
      };
    });
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    let { name, value, checked } = event.target;

    console.log(event.target);

    if(event.target.name === "dayToComplete" && event.target.checked) {
      this.state.selected.push(event.target.value);
      console.log(this.state.selected);
    } else if(event.target.name === "dayToComplete" && !event.target.checked) {
      let currentValue = event.target.value;
      let index = this.state.selected.indexOf(currentValue);
      console.log(index);
      this.state.selected.splice(index, 1);
      console.log(this.state.selected);
    }


    this.setState({
      [name]: value,
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();

    const patientId = this.props.user.patients[0];
    console.log(this.state.reminderTitle);
    console.log(this.state.dayToComplete);
    console.log(this.state.timeToComplete);
    console.log(this.state.timeToCompleteHour);
    console.log(this.state.timeToCompleteMin);
    console.log(this.state.timeToCompleteAmPm);
    console.log(this.state.medicationDosage);
    console.log(this.state.medicationRefillDate);
    console.log(this.state.reminderMessage);
    console.log(this.state.checkboxSelected);

    let hours = this.state.timeToCompleteHour;
    let minutes = this.state.timeToCompleteMin;
    let amPm = this.state.timeToCompleteAmPm;

    let convertedTime = MilitaryTime.convertStandardToMilitaryTime(hours,minutes,amPm);

    let convertedTimeAdded = addTime(hours,minutes,amPm);

    function addTime(hours,minutes,amPm){

      let militaryTime = MilitaryTime.convertStandardToMilitaryTime(hours,minutes,amPm)
        hours = parseInt(militaryTime.split(":")[0])
        minutes = parseInt(militaryTime.split(":")[1])

      if (minutes === 0){
          minutes = minutes + 30
      } else {
          hours = hours + 1
          minutes = "00"

        if (hours === 24){
              hours = 0;
        }
      }
        return hours + ":" + minutes
    }

    if(this.state.reminderTitle){
      this.setState({
        titleFlag:false
      })
    }

    if (!this.state.reminderTitle){
      this.setState({
        titleFlag:true,
        redirectTo: ""
      })
    }

    if(this.state.reminderMessage){
      this.setState({
        messageFlag:false
      })
    }

    if (!this.state.reminderMessage){
      this.setState({
        messageFlag:true,
        reminderMessage:"",
        redirectTo: ""
      })
    }

    if(this.state.dayToComplete){
      this.setState({
        dayFlag: false
      })
    }

    if(!this.state.dayToComplete){
      this.setState({
        dayFlag: true,
        redirectTo:""
      })
    }

    axios
      .post('/auth/addReminder', {
        _id: this.state._id,
        reminderTitle: this.state.reminderTitle,
        dayToComplete: this.state.selected,
        timeToComplete: convertedTime,
        medicationDosage: this.state.medicationDosage,
        medicationRefillDate: this.state.medicationRefillDate,
        reminderMessage: this.state.reminderMessage,
        receiveResponseBy: convertedTimeAdded,
      })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('reminder was added')

          this.setState({
            reminderTitle: "",
            timeToComplete: "",
            timeToCompleteHour: "",
            timeToCompleteMin: "",
            timeToCompleteAmPm: "",
            medicationDosage: "",
            medicationRefillDate: "",
            reminderMessage: "",
            mondayCheckbox: "Monday",
            selected: [],
          });

      axios.get('/auth/reminders/' + patientId).then(response => {
        console.log("Getting new reminders...")
        console.log(response.data)
          if (response.data) {
            this.setState({
              reminders: response.data
            })
          };
      });

        } else {
          console.log('error');
        }
      })

  };

  // Deletes a reminder from the database with a given id, then reloads reminders from the db
  deleteReminder = id => {
    axios.delete('/auth/reminders/' + id).then(response => {
      console.log("Deleting a reminder...")
      console.log(response.data)
        if (response.data) {
          this.setState({
            reminders: response.data
          })
        };
    });
  };


  render() {
    if (this.state.redirectTo === "/") {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <Row className="content">
        <Col md={6}>
          <h3 className="currentReminders">Current Reminders</h3>

          {this.state.reminders.length ? (
            <div>
              <Panel className="wellDay">SUNDAY</Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Sunday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Sunday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Sunday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Sunday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Sunday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Sunday") ? "deleteBtn" : "hide"}>X</Button></Panel>
              ))}
              <Panel className="wellDay">MONDAY: </Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Monday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Monday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Monday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Monday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Monday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Monday") ? "deleteBtn" : "hide"}>X</Button></Panel>
              ))}

             <Panel className="wellDay">TUESDAY: </Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Tuesday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Tuesday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Tuesday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Tuesday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Tuesday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Tuesday") ? "deleteBtn" : "hide"}>X</Button></Panel>
              ))}

              <Panel className="wellDay">WEDNESDAY: </Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Wednesday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Wednesday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Wednesday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Wednesday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Wednesday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Wednesday") ? "deleteBtn" : "hide"}>X</Button></Panel>
              ))}

              <Panel className="wellDay">THURSDAY</Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Thursday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Thursday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Thursday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Thursday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Thursday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Thursday") ? "deleteBtn" : "hide"}>X</Button></Panel>
                ))}

              <Panel className="wellDay">FRIDAY: </Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Friday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Friday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Friday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Friday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Friday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Friday") ? "deleteBtn" : "hide"}>X</Button></Panel>
                ))}

              <Panel className="wellDay">SATURDAY: </Panel>
              {this.state.reminders.map(reminder => (
                !reminder.dayToComplete.includes("Saturday") ? null :
                <Panel key={reminder._id} id={reminder._id} className="reminders">
                <p className="reminderTitle">{reminder.dayToComplete.includes("Saturday") ? (reminder.timeToComplete + " " + reminder.reminderTitle) : ""}</p>
                <p>{reminder.dayToComplete.includes("Saturday") ? ("Message: " + reminder.reminderMessage ) : ""}</p>
                <p>{reminder.dayToComplete.includes("Saturday") && reminder.medicationDosage ? ("Dosage: " + reminder.medicationDosage) : ""}</p>
                <p>{reminder.dayToComplete.includes("Saturday") && reminder.medicationRefillDate ? ("Refill: " + reminder.medicationRefillDate) : ""}</p>
                <Button onClick={() => this.deleteReminder(reminder._id)} className= {reminder.dayToComplete.includes("Saturday") ? "deleteBtn" : "hide"}>X</Button></Panel>
                ))}
            </div>
          ) : (
              <p>No Reminders Scheduled</p>
            )}
          </Col>
          <Col md={6}>
            <h3 className="panelTitle">Add a New Reminder</h3>
            <Panel className="addMedsPanel">
              <Form className="medicationForm">
              <ControlLabel className="panelLabel">Reminder Title:</ControlLabel>
                <FormControl
                  name="reminderTitle"
                  className="reminderTitle"
                  type="text"
                  value={this.state.reminderTitle}
                  onChange={this.handleInputChange}
                  placeholder="Type i.e. Medication Reminder, Dr. Appt..."
                />
                <WarningBanner 
                  warn={this.state.titleFlag}
                />
              <br />
              <ControlLabel className="panelLabel">Day(s) in which medication must be taken:</ControlLabel>
                <br />
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Sunday"
                  onChange={this.handleInputChange}
                >
                  Sunday
                </Checkbox>
                <Checkbox inline 
                  className="panelLabel"
                  name="dayToComplete"
                  value="Monday"
                  onChange={this.handleInputChange}
                >
                  Monday
                </Checkbox>
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Tuesday"
                  onChange={this.handleInputChange}
                >
                  Tuesday
                </Checkbox>
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Wednesday"
                  onChange={this.handleInputChange}
                >
                  Wednesday
                </Checkbox>
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Thursday"
                  onChange={this.handleInputChange}
                >
                  Thursday
                </Checkbox>
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Friday"
                  onChange={this.handleInputChange}
                >
                  Friday
                </Checkbox>
                <Checkbox inline
                  className="panelLabel"
                  name="dayToComplete"
                  value="Saturday"
                  onChange={this.handleInputChange}
                >
                  Saturday
                </Checkbox>
            </Form>
              <WarningBanner 
                    warn={this.state.dayFlag}
                />
              <br />
            <Form inline className="medicationForm">
                <ControlLabel className="panelLabel">Hour:</ControlLabel>
                {' '}
                  <FormControl
                    className="dropdownFields"
                    name="timeToCompleteHour"
                    componentClass="select"
                    value={this.state.timeToCompleteHour}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select Hour</option>
                    <option value="1">01:</option>
                    <option value="2">02:</option>
                    <option value="3">03:</option>
                    <option value="4">04:</option>
                    <option value="5">05:</option>
                    <option value="6">06:</option>
                    <option value="7">07:</option>
                    <option value="8">08:</option>
                    <option value="9">09:</option>
                    <option value="10">10:</option>
                    <option value="11">11:</option>
                    <option value="12">12:</option>
                  </FormControl>
                <ControlLabel className="panelLabel">Min: </ControlLabel>
                  <FormControl
                    className="dropdownFields"
                    name="timeToCompleteMin"
                    componentClass="select"
                    value={this.state.timeToCompleteMin}
                    onChange={this.handleInputChange}
                    placeholder="Time"
                  >
                    <option value="">Select Min</option>
                    <option value="00">:00</option>
                    <option value="30">:30</option>
                  </FormControl>
                  <ControlLabel className="panelLabel">AM/PM</ControlLabel>
                  <FormControl
                    className="dropdownFields"
                    name="timeToCompleteAmPm"
                    componentClass="select"
                    value={this.state.timeToCompleteAmPm}
                    onChange={this.handleInputChange}
                    placeholder="Time"
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </FormControl>
              </Form>
              <WarningBanner 
                warn={this.state.timeFlag}
              />
              <br />
              <Form inline className="medicationForm">
                <ControlLabel className="panelLabel">Dosage:</ControlLabel>
                  <FormControl
                    className="Input"
                    name="medicationDosage"
                    value={this.state.medicationDosage}
                    onChange={this.handleInputChange}
                    placeholder="(if a med reminder)"
                  />
                <ControlLabel className="panelLabel dateLabel">Refill Date:</ControlLabel>
                  <FormControl
                    className="Input"
                    name="medicationRefillDate"
                    value={this.state.medicationRefillDate}
                    onChange={this.handleInputChange}
                    placeholder="if a med reminder"
                  />
                  <br />
              </Form>
              <br />
              <Form className="medicationForm">
               <ControlLabel className="panelLabel">Message:</ControlLabel>
                  <FormControl
                    name="reminderMessage"
                    className="messageInput"
                    componentClass="textarea"
                    value={this.state.reminderMessage}
                    onChange={this.handleInputChange}
                    placeholder="Message"
                  />
                <WarningBanner 
                  warn={this.state.messageFlag}
                />
                <br />
                <Button bsStyle="default"
                  onClick={this.handleFormSubmit}
                  type="success"
                  className="addReminderBtn"
                  
                >
                  Add Reminder
                </Button>
              </Form>
            </Panel>
        </Col>
      </Row>
    );
  }
}

export default ReminderForm;
