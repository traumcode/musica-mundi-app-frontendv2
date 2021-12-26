import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import classnames from "classnames";
import { GoogleLogin } from "../utils/setAuthGoogle";


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

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
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
		this.props.registerUser(newUser, this.props.history);
	}


	render() {
		const errors = this.state.errors;
		console.log(errors)
		return (
			<div className="container login-container">
				<div className="signInCard login-card">
					<h1 className="login-title"><i className="fab fa-napster"/></h1>
					<h2 className="login-message">welcome surfer</h2>
					<form noValidate onSubmit={this.onSubmit} className="box">
						<h1>register</h1>
						<p className="text-muted">please choose a name and a password</p>
						<div>
							<i className="bi bi-person-circle icon-register"/>
							<input
								onChange={this.onChange}
								value={this.state.username}
								error={errors.username}
								type="text"
								className={classnames("", { invalid: errors.name })}
								id='username'
								placeholder="Username"/>
							{
								errors.username
									? (<span
										onClick={() => this.setState({
											errors:

												{
													...errors,
													username: ""
												}
										})}
										className="error-text">{errors.username}</span>)
									: ("")
							}

						</div>
						<i className="bi bi-envelope icon-register"/>
						<input
							onChange={this.onChange}
							value={this.state.email}
							error={errors.email}
							type="email"
							id="email"
							className={classnames("", { invalid: errors.email })}
							placeholder="Email"/>
						{
							errors.email
								? (<span
									onClick={() => this.setState({
										errors:
											{
												username: this.state.errors.username,
												email: "",
												password: this.state.errors.password,
												password2: this.state.errors.password2
											}
									})}
									className="error-text">{errors.email}</span>)
								: ("")
						}
						<i className="bi bi-key icon-register-password"/>
						<input

							onChange={this.onChange}
							value={this.state.password}
							error={errors.password}
							type="password"
							id="password"
							className={classnames("", {
								invalid: errors.password
							})}
							placeholder="Password"/>
						{
							errors.password
								? (<span
									onClick={() => this.setState({
										errors:
											{
												username: this.state.errors.username,
												email: this.state.errors.email,
												password: "",
												password2: this.state.errors.password2
											}
									})}
									className="error-text">{errors.password}</span>)
								: ("")
						}

						<i className="bi bi-key icon-register-password-retype"/>
						<input
							onChange={this.onChange}
							value={this.state.password2}
							error={errors.password2}
							id="password2"
							type="password"
							className={classnames("", {
								invalid: errors.password2
							})}
							placeholder="Re-type password"/>
						{
							errors.password2
								? (<span
									onClick={() => this.setState({
										errors:
											{
												username: this.state.errors.username,
												email: this.state.errors.email,
												password: this.state.errors.password,
												password2: ""
											}
									})}
									className="error-text">{errors.password2}</span>)
								: ("")
						}
						<input type="submit" value="sign up"/>
						<div className="col-md-12">
							<ul className="social-network social-circle">
								<GoogleLogin />
								<li><a href="https://muie.com" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"/></a></li>
								<li><a href="https://muie.com" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"/></a></li>
							</ul>
						</div>
						<p className="text-muted" style={{margin: "15px"}}>already have an account ? please  <Link to='/login'>log in</Link></p>
					</form>

				</div>

			</div>
		);
	}
}

RegisterPage.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(RegisterPage));