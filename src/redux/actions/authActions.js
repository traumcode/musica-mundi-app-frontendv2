import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";


export const registerUser = (userData, history) => dispatch => {
   axios
	  .post("http://localhost:5000/users/register", userData)
	  .then(res => history.push("/login"))
	  .catch(err =>
		 dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		 })
	  );
};

export const loginUser = userData => dispatch => {
   axios
	  .post("http://localhost:5000/users/login", userData)
	  .then(res => {
		 const { token } = res.data;
		 localStorage.setItem("profile", JSON.stringify({ 'token': token }));
		 localStorage.setItem("profile", JSON.stringify({
			...JSON.parse(localStorage.getItem("profile")),
			'result': {
			   username: res.data.username,
			   email: userData.email,
			}
		 }));
		 localStorage.setItem("username", res.data.username);
		 setAuthToken(token);
		 const decoded = jwt_decode(token);
		 dispatch(setCurrentUser(decoded));
	  })
	  .catch(err =>
		 dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		 })
	  );
};

export const setCurrentUser = decoded => {
   return {
	  type: SET_CURRENT_USER,
	  payload: decoded
   }
}

export const setUserLoading = () => {
   return {
	  type: USER_LOADING
   };
};
export const logoutUser = () => dispatch => {
   localStorage.removeItem("profile");
   setAuthToken(false);
   dispatch(setCurrentUser({}));
};