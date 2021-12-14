import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout.js";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import './App.scss'
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";



export function setMainStorage(Obj) {
	const mainStorage = JSON.parse(localStorage.getItem("MainStorage") || "{}");
	const newState = { ...mainStorage, ...Obj };
	localStorage.setItem("MainStorage", JSON.stringify(newState));
	window.dispatchEvent(new Event("storage"));
}

function App() {
	const [ currentPageTitle ] = useState("WAVr~");
	require('dotenv').config();
	useEffect(() => {
		window.addEventListener("storage", () => {
			let mainStorage = JSON.parse(window.localStorage.getItem("MainStorage") || "{}");
			if (mainStorage.isMenuOn === undefined) {
				mainStorage.isMenuOn = false;
				setMainStorage({ isMenuOn: false })
			}
		})
		window.dispatchEvent(new Event("storage"))

		return () => console.log("Cleared")
	}, [ currentPageTitle ])

	return (
		<Router>
			<Switch>
				<Route path="/signin" exact component={LoginPage}/>
				<Layout currentPageTitle={currentPageTitle}>
					<Route path={["/home", "/"]} exact component={Home}/>
					<Route path="/discover" exact component={Discover}/>
				</Layout>
			</Switch>
			<Route component={NotFound}/>
		</Router>
	);
}

export default App;
