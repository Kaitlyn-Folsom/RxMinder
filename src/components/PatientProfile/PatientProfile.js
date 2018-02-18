import React from 'react';
import axios from 'axios';
import {Jumbotron} from "react-bootstrap";
import "./PatientProfile.css"


class PatientProfile extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      patientName: "",
      patientPhone: "",
      patientAddress: ""
    }
}
  componentDidMount() {
    const id = this.props.user._id;

    axios.get('/auth/patients/' + id).then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        this.setState({
          _id: response.data[0]._id,
          patientName: response.data[0].patientName,
          patientPhone: response.data[0].patientPhone,
          patientStreet: response.data[0].patientStreet,
          patientCity: response.data[0].patientCity,
          patientState: response.data[0].patientState,
          patientZip: response.data[0].patientZip
        })
      } 
    });
  }

  render() {
    return (
        <Jumbotron className="patientProfile">
          <h1 className="profileText">{this.state.patientName}</h1>
          <h3 className="profileText">{this.state.patientPhone}</h3>
          <h3 className="profileText">{this.state.patientStreet}, {this.state.patientCity}, {this.state.patientState} {this.state.patientZip}</h3>
        </Jumbotron>

    );
  }
}

export default PatientProfile;
