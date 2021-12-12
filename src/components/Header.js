import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Header(props) {
	const [ currentPageTitle, setCurrentPageTitle ] = useState("");


	useEffect(() => {
		console.log(window.location.pathname)
		window.location.pathname === "/home" ? setCurrentPageTitle("waver~") : setCurrentPageTitle(window.location.pathname.replace("/", ""))
		return () => console.log("Cleared")
	}, [ window.location.pathname, currentPageTitle ])

	const currentToLogo = (currentPageTitle) => {
		const logos = {
			"waver~": <i className="bi bi-house-door"/>,
			"discover": <i className="fab fa-searchengin"/>,
			"collections": <i className="bi bi-collection"/>,
			"manifest": <i className="bi bi-chat-left-text"/>
		}
		return logos[`${currentPageTitle}`]
	}

	return (
		<nav className="navbar">
			<h1 className="navbar-title">WAVER</h1>
			<ul className="navbar-nav">
				<Link className="navbar-link" to="/">
					<li className="nav-item">Home</li>
				</Link>
				<Link className="navbar-link" to="/discover">
					<li className="nav-item">Discover</li>
				</Link>
				<Link className="navbar-link" to="/collections">
					<li className="nav-item">Collections</li>
				</Link>
				<Link className="navbar-link" to="/manifest">
					<li className="nav-item">Manifest</li>
				</Link>

			</ul>
		</nav>
	);
}

export default Header;