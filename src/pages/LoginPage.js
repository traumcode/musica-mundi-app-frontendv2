import React, { Component } from "react";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		console.log(userData);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="container login-container">
				<div className="signInCard login-card">
					<h1 className="login-title"><i className="fab fa-napster"/></h1>
					<h2 className="login-message">welcome surfer</h2>
					<form noValidate onSubmit={this.onSubmit} className="box">
						<h1>log in</h1>
						<p className="text-muted">please enter your login and password</p>
						<input onChange={this.onChange} value={this.state.email}  type="email" name="username" placeholder="Username"/>
						<input type="password" name="password" placeholder="Password"/>
						<a className="forgot text-muted" href="https://muie.com">forgot password?</a>
						<input type="submit" name="" value="login" href="localhost:3000"/>
						<div className="col-md-12">
							<ul className="social-network social-circle">
								<li><a href="https://muie.com" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"/></a></li>
								<li><a href="https://muie.com" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"/></a></li>
								<li><a href="https://muie.com" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"/></a></li>
							</ul>
						</div>
						<p className="text-muted">don't have account please <a href='/register'>register</a></p>
					</form>
				</div>

			</div>
		);
	}
}

export default LoginPage;