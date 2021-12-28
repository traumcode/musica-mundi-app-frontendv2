import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import classnames from "classnames";
import { GoogleLogin } from "../utils/setAuthGoogle";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			showPassword: false,
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push({
				pathname: `/${localStorage.getItem("username")}/profile/`,
			});
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleShowPassword = () => this.setState({ showPassword: !this.state.showPassword })

   handleOnChange = e => { this.setState({ [e.target.id]: e.target.value }) };

	handleOnSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData, this.props.history);
	};


	render() {
		const { errors } = this.state;
		return (
			<div className="container login-container">
				<div className="signInCard login-card">
					<h1 className="login-title"><i className="fab fa-napster"/></h1>
					<h2 className="login-message">welcome surfer</h2>
					<form noValidate onSubmit={this.handleOnSubmit} className="box">
						<h1>log in</h1>
						<p className="text-muted">please enter your login and password</p>
						<i className="bi bi-envelope icon-register"/>
						<input
							onChange={this.handleOnChange}
							value={this.state.email}
							error={errors.email}
							id="email"
							type="email"
							name="email"
							placeholder="email"
							pattern=".+@globex\.com"
							className={classnames("", {
								invalid: errors.email || errors.emailnotfound
							})}
						/>
						{
							errors.email || errors.emailnotfound
								? (<span
									onClick={() => this.setState({
										errors:
											{
												username: this.state.errors.username,
												email: "",
												password: this.state.errors.password,
											}
									})}
									className="error-text">{errors.email || errors.emailnotfound}</span>)
								: ("")
						}
						<i className="bi bi-key icon-register-password"/>

						<input
							onChange={this.handleOnChange}
							value={this.state.password}
							error={errors.password}
							id="password"
							type={this.state.showPassword ? "text" :  "password"}
							name="password"
							className={classnames("", {
								invalid: errors.password || errors.passwordincorrect
							})}
							placeholder="passssword"/>
						{this.state.showPassword ? (<i style={{bottom: '317px'}} onClick={() => {
							this.handleShowPassword()
						}} className="bi bi-eye eye-password"/>): (<i style={{bottom: '317px'}} onClick={() => {
							this.handleShowPassword()
						}} className="bi bi-eye-slash eye-password"/>)}
						{errors.password || errors.passwordincorrect
							? (
								<span
									onClick={() => this.setState({
										errors:
											{
												username: this.state.errors.username,
												email: this.state.errors.email,
												password: "",
											}
									})}
									className="error-text" style={{marginLeft:"-137px"}}>{errors.passwordincorrect}</span>
							) : ("")}
						<a className="forgot text-muted" href="https://muie.com">forgot password?</a>
						<input type="submit" value="login"/>
						<div className="col-md-12">
							<ul className="social-network social-circle">
								<GoogleLogin/>
								<li><a href="https://muie.com" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"/></a></li>
								<li><a href="https://muie.com" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"/></a></li>
							</ul>
						</div>
						<p className="text-muted">don't have account please <Link to='/register'>register</Link></p>
					</form>
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ loginUser }
)(LoginPage);