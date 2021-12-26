import { GoogleLogin as Login } from "react-google-login";
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import React from "react";

export const GoogleLogin = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogin = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({
				type: "AUTH",
				data: {
					result,
					token
				}
			});
			history.push('/discover')
		} catch (error) {
			console.log(error)
		}
	}

	const handleLoginFailure = (error) => {
		console.log('Houston we have an error')
		console.log(error)
	}

	return (
		<Login
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			render={(renderProps) => (
				<button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ all: "unset" }}>
					<li><a className="icoGoogle"
							 title="Google +"><i className="fab fa-google-plus"/></a></li>
				</button>)}
			buttonText="Log in with Google"
			onSuccess={handleLogin}
			onFailure={handleLoginFailure}
			cookiePolicy={'single_host_origin'}
		/>)
}

