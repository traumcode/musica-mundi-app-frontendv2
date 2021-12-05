import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import Layout from "../components/ui/Layout.js";
import Home from "../pages/Home";
import './App.scss'
import LoginPage from "../pages/LoginPage";
import LoginPagev2 from "../pages/LoginPagev2";

export function setMainStorage(Obj) {
	const mainStorage = JSON.parse(localStorage.getItem("MainStorage") || "{}");
	const newState = { ...mainStorage, ...Obj };
	localStorage.setItem("MainStorage", JSON.stringify(newState));
	window.dispatchEvent(new Event("storage"));
}


function App() {
	useEffect(() => {
		console.log("Starting app");
	})

	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/"><Home/></Route>
					<Route exact path="/signin"><LoginPage/></Route>
					<Route exact path="/signin2"><LoginPagev2/></Route>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
