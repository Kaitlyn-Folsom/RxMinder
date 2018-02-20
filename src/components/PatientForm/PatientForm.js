import React from 'react';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl} from "react-bootstrap"
import axios from 'axios';
import {WarningBanner} from "../Alerts"
import { Redirect } from 'react-router-dom';
// import MilitaryTime from '../../Utils/MilitaryTime.js';
import "./PatientForm.css"

class PatientForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      patientName: "",
      nameFlag: false,
      patientPhone: "",
      phoneFlag: false,
      patientStreet: "",
      streetFlag: false, 
      patientCity: "",
      cityFlag: false,
      patientState: "",
      patientZip: "",
      zipFlag: false,
      redirectTo: null
    }
}
  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        this.setState({
          _id: response.data.user._id
        })
      };
    });
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    console.log(event.target);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`Name: ${this.state.patientName}`);
    console.log(`Phone: ${this.state.patientPhone}`);
    console.log(`Address: ${this.state.patientStreet}, ${this.state.patientCity}, ${this.state.patientState} ${this.state.patientZip}`);

    if (this.state.patientName){
      this.setState({
        nameFlag: false,
      })
    }

    if (!this.state.patientName){
      this.setState({
        nameFlag: true,
        redirectTo:""
      })
    }

    if (this.state.patientPhone){
      this.setState({
        phoneFlag: false,
      })
    }

    if (!this.state.patientPhone){
      this.setState({
        phoneFlag: true,
        redirectTo: ""
      })
    }

    if (this.state.patientStreet){
      this.setState({
        streetFlag: false,
      })
    }

    if (!this.state.patientStreet){
      this.setState({
        streetFlag: true,
        redirectTo: ""
      })
    }

    if (this.state.patientCity){
      this.setState({
        cityFlag: false,
      })
    }

    if (!this.state.patientCity){
      this.setState({
        cityFlag: true,
        redirectTo: ""
      })
    }

    if (this.state.patientState){
      this.setState({
        stateFlag: false,
      })
    }

    if (!this.state.patientState){
      this.setState({
        stateFlag: true,
        redirectTo: ""
      })
    }

    if (this.state.patientZip){
      this.setState({
        zipFlag: false,
      })
    }

    if (!this.state.patientZip){
      this.setState({
        zipFlag: true,
        redirectTo: ""
      })
    }

    if (this.state.patientName && this.state.patientPhone && this.state.patientStreet && this.state.patientCity && this.state.patientState && this.state.patientZip) {
		axios
			.post('/auth/addPatient', {
        _id: this.state._id,
        patientName: this.state.patientName,
        patientPhone: this.state.patientPhone,
        patientStreet: this.state.patientStreet,
        patientCity: this.state.patientCity,
        patientState: this.state.patientState,
        patientZip: this.state.patientZip
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('new patient was added')
          this.setState({
            patientName: "",
            patientPhone: "",
            patientStreet: "",
            patientCity: "",
            patientState: "",
            patientZip: "",
            redirectTo: '/patient'
          })
				} else {
					console.log('error')
				}
			})
    }
  };

  render() {
    if (this.state.redirectTo === "/patient") {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
        <div className ='add-patient-page'>
              <Form horizontal className="addPatientForm">
                <h2 className="form-title">Add a patient to get started</h2>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={4} xs={3}>Name: </Col>
                      <Col sm={4} xs={7}>
                        <FormControl
                          name="patientName"
                          value={this.state.patientName}
                          onChange={this.handleInputChange}
                          placeholder="Patient's Name"
                        />
                        <WarningBanner
                          warn={this.state.nameFlag}
                         /> 
                       </Col> 
                    </FormGroup>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={3} xs={3}>Phone: </Col>
                      <Col sm={6} xs={7}>  
                        <FormControl
                          name="patientPhone"
                          value={this.state.patientPhone}
                          onChange={this.handleInputChange}
                          placeholder="000 000 0000"
                        />
                        <WarningBanner
                          warn={this.state.phoneFlag}
                         /> 
                      </Col>  
                    </FormGroup>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={3} xs={3}>Street: </Col>
                      <Col sm={6} xs={7}>  
                        <FormControl
                          name="patientStreet"
                          value={this.state.patientStreet}
                          onChange={this.handleInputChange}
                          placeholder="Street"
                        />
                        <WarningBanner
                          warn={this.state.streetFlag}
                         /> 
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={3} xs={3}>City: </Col>
                      <Col sm={6} xs={7}>  
                        <FormControl
                          name="patientCity"
                          value={this.state.patientCity}
                          onChange={this.handleInputChange}
                          placeholder="City"
                        />
                        <WarningBanner
                          warn={this.state.cityFlag}
                         /> 
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={3} xs={3}>State: </Col>
                      <Col sm={6} xs={7}>  
                        <FormControl
                          name="patientState"
                          componentClass="select"
                          value={this.state.patientState}
                          onChange={this.handleInputChange}
                          placeholder="State"
                        >

                        <option value="">Select State</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Washington, DC">District Of Columbia</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Lousisana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hamsphire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>

                      </FormControl>
                        <WarningBanner
                          warn={this.state.stateFlag}
                        />
                      </Col> 
                    </FormGroup>
                    <FormGroup>
                      <Col className="patient-form-label" componentClass={ControlLabel} sm={3} xs={3}>Zipcode: </Col>
                      <Col sm={6} xs={7}>  
                        <FormControl
                          name="patientZip"
                          value={this.state.patientZip}
                          onChange={this.handleInputChange}
                          placeholder="Zipcode"
                          maxLength="5"
                        />
                        <WarningBanner
                          warn={this.state.zipFlag}
                        />
                      </Col>
                    </FormGroup>
                      <Button bsStyle="default"
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg add-patient-btn"
                      >
                        Add Patient
                      </Button>
              </Form>
            </div>
    );
  }
}

export default PatientForm;
