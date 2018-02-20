import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col, HelpBlock } from 'react-bootstrap';
import "./SignupForm.css";
import {WarningBanner, WarningBanner2, WarningBanner3, WarningBanner4} from "../Alerts"

class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: "",
			firstNameFlag: false,
			lastName: "",
			lastNameFlag: false,
			email: '',
			emailFlag: false,
			phone: '',
			phoneFlag: false,
			password: '',
			passwordFlag: false,
			lengthFlag: false,
			confirmPassword: '',
			passwordConfirmFlag: false,
			confirmFlag: false,
			userFlag:false,
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	};

	passwordLengthValidate = () => {
    const length = this.state.password.length;
	    if (length > 6) return 'success';
	    else if (length > 4) return 'warning';
	    else if (length > 0) return 'error';
	    return null;
  };

  confirmPasswordValidate = () => {
  	if (this.state.password === this.state.confirmPassword)
  		return "success";
  	else if (this.state.password !== this.state.confirmPassword)
  		return "error";
  	else return null;
  };

	handleChange = event => {
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit = event => {
		event.preventDefault()
		
		if(this.state.firstName){
			this.setState({
				firstNameFlag:false
			})
		} 
		//If no First Name is entered throw warning
		if(!this.state.firstName){

			this.setState({
				firstNameFlag: true,
				redirectTo: ""
			})
		}

		if (this.state.lastName){
			this.setState({
				lastNameFlag:false
			})
		} 

		if (!this.state.lastName){
			this.setState({
				lastNameFlag: true,
				redirectTo: ""
			})	
		}

		if (this.state.email){
			this.setState({
				emailFlag:false
			})
		} 

		if (!this.state.email){
			 this.setState({
			 	emailFlag: true,
      	email: "",
				redirectTo: ""
			})
		}

		if (!this.state.phone){
			this.setState({
				phoneFlag: true,
			})
		}

		if(!this.state.phone){
			this.setState({
				phoneFlag:true,
				redirectTo:""
			})
		}

		if(this.state.password){
			this.setState({
				passwordFlag: false,
			})
		}

		if (!this.state.password){
			 this.setState({
			 	passwordFlag: true,
      	password: "",
				redirectTo: "",
				confirmPassword: ""
			})
		} 

		if (this.state.password.length < 6){

			this.setState({
				lengthFlag:true,
				redirectTo: "",
				confirmPassword: ""
			})
		}

		if (this.state.password.length >= 6){
			this.setState({
				lengthFlag:false,
			})
		}

		if (this.state.confirmPasword){
			this.setState({
				passwordConfirmFlag: false
			})
		}

		if (!this.state.confirmPassword){
			 this.setState({
			 	passwordConfirmFlag: true,
      			password: "",
				redirectTo: "",
				confirmPassword: ""
			})
		} 

		if ((this.state.password) !== (this.state.confirmPassword)){

			this.setState({
				confirmFlag: true,
      			password: "",
				redirectTo: "",
				confirmPassword: ""
			})
    } 

    if (this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.phone && this.state.confirmPassword){

			axios
			.post('/auth/signup', {
				email: this.state.email,
				password: this.state.password,
				phone: this.state.phone,
				firstName: this.state.firstName,
				lastName: this.state.lastName
			})
			.then(response => {
				console.log(response)
				if (!response.data.error) {
					console.log(response.data.error);
					console.log("Signing you up...login to get started on your profile");
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log(response.data.error);
					this.setState({
						userFlag: true,
		      			password: "",
		      			email: "",
						redirectTo: "",
						confirmPassword: ""
					})
				}
			})
		}
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
				<div className="SignupForm">
					<Form horizontal className="form">
						<h1>Signup</h1>
						<FormGroup controlId="formHorzontalFirstName">
							<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>First Name:
      						</Col>
      						<Col sm={6} xs={7}>
								<FormControl
									type="text"
									name="firstName"
									value={this.state.firstName}
									onChange={this.handleChange}
									className="form-control"
								/>
								<WarningBanner 
									warn={this.state.firstNameFlag}
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorzontalEmail">
							<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>Last Name:
      						</Col>
      						<Col sm={6} xs={7}>
								<FormControl
									type="text"
									name="lastName"
									value={this.state.lastName}
									onChange={this.handleChange}
									className="form-control"
								/>
								<WarningBanner 
									warn={this.state.lastNameFlag}
								/>
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorzontalEmail">
							<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>Email:
      						</Col>
      						<Col sm={6} xs={7}>
								<FormControl
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									className="form-control"
									placeholder="example@example.com"
								/>
								<WarningBanner 
									warn={this.state.emailFlag}
								/>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>Phone Number:
      						</Col>
      						<Col sm={6} xs={7}>
								<FormControl
									type="tel"
									pattern="^\d{3}-\d{3}-\d{4}$" required
									name="phone"
									value={this.state.phone}
									onChange={this.handleChange}
									placeholder="000 000 0000"
									/>
								<WarningBanner 
									warn={this.state.phoneFlag}
								/>
              				</Col>	
            			</FormGroup>
						<FormGroup
							controlId="password"
	        				validationState={this.passwordLengthValidate()}
						>
	        				<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>Password:
    						</Col>
	        				<Col sm={6} xs={7}>
								<FormControl
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									className="form-control"
									minLength="6"
									maxLength="15"
								/>
								<HelpBlock>Password must contain more than 6 characters.</HelpBlock>
								 <WarningBanner 
									warn={this.state.passwordFlag}
									/>
									<WarningBanner2
										warn={this.state.lengthFlag}
									/>	
							</Col>		 
						</FormGroup>
						<FormGroup
							controlId="formBasicText"
	        				validationState={this.confirmPasswordValidate()}
	        			>
	        				<Col className="signupLabel" componentClass={ControlLabel} sm={3} xs={4}>Confirm Password:
    						</Col>
    						<Col sm={6} xs={7}>
								<FormControl
									type="password"
									name="confirmPassword"
									value={this.state.confirmPassword}
									onChange={this.handleChange}
									className="form-control"
									minLength="6"
									maxLength="15"
								/>
								<WarningBanner 
									warn={this.state.passwordConfirmFlag}
									/>
								<WarningBanner3
										warn={this.state.confirmFlag}
									/>	
							</Col>
						</FormGroup>
						<Button onClick={this.handleSubmit} className="btn-lg login-signup-btn">Sign up</Button>
						<WarningBanner4 
									warn={this.state.userFlag}
								/>
					</Form>
				</div>
		)
	}
}

export default SignupForm;
