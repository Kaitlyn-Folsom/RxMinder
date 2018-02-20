import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import {WarningBanner} from "../Alerts"
import "./LoginForm.css"

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			emailFlag: false,
			password: '',
			passwordFlag: false,
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	};

	handleChange = event => {
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit = event => {
		event.preventDefault()
		console.log(event)

		if (this.state.email){

      this.setState({
      	emailFlag: false,
			})
		}

		if (!this.state.email){
      this.setState({
      	emailFlag: true,
      	email: "",
				redirectTo: ""
			})
		}

		if (this.state.password){
      this.setState({
      	passwordFlag: false,
			})
		}

		if (!this.state.password){

      this.setState({
      	passwordFlag: true,
      	password: "",
				redirectTo: ""
			})
		}

		if(this.state.email && this.state.password) {
			console.log(`Trying to login`);
			axios.get("/auth/user", {
				email: this.state.email,
				password: this.state.password
			}).then(response =>{
				console.log(response);
				this.props._login(this.state.email, this.state.password)
					this.setState({
						redirectTo: '/'
					})
			})
		}
	};

	render() {
		if (this.state.redirectTo) {
			console.log(`Redirecting to: ${this.state.redirectTo}`);
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Row>
					<Col lg={12} className="loginCol">
					<div className="LoginForm">
						<Form horizontal className="form">
							<h1>Login</h1>
						  <FormGroup controlId="formHorzontalEmail">
								<Col className="loginLabel" componentClass={ControlLabel} sm={4} xs={4}>Email:
	      				</Col>
	      				<Col sm={4} xs={7}>
									<FormControl
										type="email"
										name="email"
										required
										value={this.state.email}
										onChange={this.handleChange}
										className="form-control"
										placeholder="email"
									/>
									<WarningBanner 
										warn={this.state.emailFlag}
									/>
								</Col>
							</FormGroup>
							
							<FormGroup controlId="formHorzontalEmail"
      				>
								<Col className="loginLabel" componentClass={ControlLabel} sm={4} xs={4}>Password:
		      			</Col>
		      			<Col sm={4} xs={7}>
									<FormControl
										type="password"
										name="password"
										required
										value={this.state.password}
										onChange={this.handleChange}
										className="form-control"
										minLength="6"
										maxLength="15" 
										placeholder="password"
									/>
									<WarningBanner 
										warn={this.state.passwordFlag}
									/>
								</Col>
							</FormGroup>
							<Button onClick={this.handleSubmit} className="btn-lg login-signup-btn">Login</Button>
						</Form>
						<h4 className="signupRoute">Need an account? <Link to="/signup" className="login-link">Sign up</Link></h4>
					</div>
					</Col>
				</Row>

			)
		}
	}
}

export default LoginForm;
