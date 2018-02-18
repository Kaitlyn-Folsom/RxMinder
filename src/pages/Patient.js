import React from 'react'
import ReminderForm from '../components/ReminderForm'
import PatientProfile from '../components/PatientProfile'
import {Row, Col} from "react-bootstrap"
import Home from './Home'
// import Header from '../components/Header/Header'
import "./Patient.css"
import Footer from "../components/Footer/Footer"

const Patient = props => {
	let user = props.user || 'no user';
	console.log('props: ', user._id);

	if (props.user) {
		return (
				<div className="patientContainer">
						<PatientProfile user = {user} />
					<Row className="reminderBody">
						<Col lg={12}>
							<ReminderForm user = {user}/>
						</Col>
					</Row>
					<Footer />
				</div>
		)
	} else {
		return (
				<Home />
		)
	}
}

export default Patient
