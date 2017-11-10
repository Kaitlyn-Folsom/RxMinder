import React from 'react';
import PatientForm from '../components/PatientForm';
import DisplayReminders from '../components/DisplayReminders';
import Clock from "../components/Clock";
import Carousel from "../components/Carousel";
import Jumbotrons from "../components/Jumbotron";
import Footer from "../components/Footer";
import GridHome from "../components/Grid";
import Header from '../components/Header/Header'
import { Row, Col } from "react-bootstrap"
import "./Home.css"

const Home = props => {
		let user = props.user || 'no user';
	// If a user exists and if that user has patients, display the patient's reminders
	if (props.user && props.user.patients.length > 0) {
		return (

				<div className="Home">
					<Row>
						<Col lg={5}>
							<Header user={user} />
						</Col>
						<Col lg={1}>
						</Col>
						<Col lg={6}>
							<Clock />
						</Col>
					</Row>
					<DisplayReminders user = {user}/>
					<Footer />
				</div>

		)
	} 
	// Display the add a patient form if the user doesn't have a saved patient
	else if (props.user && props.user.patients.length === 0) {
		return (
				<div className="Home">
							{console.log(props.user)}
					<PatientForm />
					<Footer />
				</div>
		)
	} 

	else if (!props.user) {
		return (
				<div className="Homediv">
					<Jumbotrons/>		
					<Carousel />
					<GridHome />
					<Footer />

				</div>
		)
	}
}

export default Home