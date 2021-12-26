import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout.js";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import './App.scss'
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import ArtistDetails from "../pages/ArtistDetails";
import RegisterPage from "../pages/RegisterPage";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Profile from "../pages/Profile";


export function setMainStorage(Obj) {
	const mainStorage = JSON.parse(localStorage.getItem("MainStorage") || "{}");
	const newState = { ...mainStorage, ...Obj };
	localStorage.setItem("MainStorage", JSON.stringify(newState));
	window.dispatchEvent(new Event("storage"));
}

function App() {
	const [ currentPageTitle ] = useState("WAVr~");
	require('dotenv')
		.config();

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
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/login" component={LoginPage}/>
					<Route exact path="/register" component={RegisterPage}/>
					<Layout currentPageTitle={currentPageTitle}>
						<Switch>
							<Route exact path={[ "/home", "/" ]} component={Home}/>
							<Route exact path="/discover" component={Discover}/>
							<Route exact path="/artist/:artistName" component={ArtistDetails}/>
							<Route exact path="/:username/profile/" component={Profile}/>

							<Route component={NotFound}/>
						</Switch>
					</Layout>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
