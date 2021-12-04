import React, { useEffect } from "react";

import Layout from "../components/ui/Layout.js";
import './App.scss'
import Home from "../pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
