import { combineReducers } from "redux";
import authReducer from "./authReducers";
import authGReducer from "./authGReducers";
import errorReducer from "./errorReducers";
export default combineReducers({
	auth: authReducer,
	google: authGReducer,
	errors: errorReducer
});