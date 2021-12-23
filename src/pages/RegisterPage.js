import React, { Component } from "react";

class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}


	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	}

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		}


		console.log(newUser);

	}


	render() {
		const errors = this.state.errors;
		return (
			<div className="container login-container">
				<div className="signInCard login-card">
					<h1 className="login-title"><i className="fab fa-napster"/></h1>
					<h2 className="login-message">welcome surfer</h2>
					<form noValidate onSubmit={this.onSubmit} className="box">
						<h1>register</h1>
						<p className="text-muted">please choose a name and a password</p>
						<div>
							<i className="bi bi-person-circle icon-register"/><input onChange={this.onChange}
																										value={this.state.username}
																										error={errors.username}
																										type="text" id='username'
																										placeholder="Username"/>
						</div>
						<i className="bi bi-key icon-register-password"/><input onChange={this.onChange}
																								  value={this.state.password}
																								  error={errors.password}
																								  type="password"
																								  id="password"
																								  placeholder="Password"/>

						<i className="bi bi-key icon-register-password-retype"/><input onChange={this.onChange}
																											value={this.state.password2}
																											error={errors.password2}
																											id="password2"
																											type="password"
																											placeholder="Re-type password"/>

						<input type="submit" value="sign up" />
						<div className="col-md-12">
							<ul className="social-network social-circle">
								<li><a href="https://muie.com" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"/></a></li>
								<li><a href="https://muie.com" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"/></a></li>
								<li><a href="https://muie.com" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"/></a></li>
							</ul>
						</div>
						<p className="text-muted">already have an account ? please <a href='/login'>log in</a></p>
					</form>
				</div>

			</div>
		);
	}
}

export default RegisterPage;