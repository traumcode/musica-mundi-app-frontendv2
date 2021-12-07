import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout.js";
import Home from "../pages/Home";
import './App.scss'
import LoginPage from "../pages/LoginPage";


export function setMainStorage(Obj) {
	const mainStorage = JSON.parse(localStorage.getItem("MainStorage") || "{}");
	const newState = { ...mainStorage, ...Obj };
	localStorage.setItem("MainStorage", JSON.stringify(newState));
	window.dispatchEvent(new Event("storage"));
}


function App() {
	const [currentPageTitle, setCurrentPageTitle] = useState("waver~");

	useEffect(() => {
		console.log(currentPageTitle);
	})

	return (
		<Router>
			<Switch>
				<Route exact path="/signin"><LoginPage/></Route>
				<Layout currentPageTitle={currentPageTitle}>
					<Route path="/home"><Home/></Route>
				</Layout>
			</Switch>
		</Router>
	);
}

export default App;
