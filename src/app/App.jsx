import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout.js";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import './App.scss'
import LoginPage from "../pages/LoginPage";


export function setMainStorage(Obj) {
	const mainStorage = JSON.parse(localStorage.getItem("MainStorage") || "{}");
	const newState = { ...mainStorage, ...Obj };
	localStorage.setItem("MainStorage", JSON.stringify(newState));
	window.dispatchEvent(new Event("storage"));
}


function App() {
	const [ currentPageTitle ] = useState("WAVr~");

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
				<Route exact path="/signin"><LoginPage/></Route>
				<Layout currentPageTitle={currentPageTitle}>
					<Route path="/home"><Home/></Route>
					<Route path="/discover"><Discover/></Route>
				</Layout>
			</Switch>
		</Router>
	);
}

export default App;
