import React from 'react';

function LoginPage(props) {
	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6">
					<div className="card login-card">
						<h1 className="login-title">waver~</h1>
						<form onSubmit={(e) => e.preventDefault()} className="box">
							<h1>log in</h1>
							<p className="text-muted">please enter your login and password</p>
							<input type="text" name="username" placeholder="Username"/>
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
						</form>
					</div>
				</div>

			</div>

		</div>
	);
}

export default LoginPage;