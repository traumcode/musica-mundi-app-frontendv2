import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Menu from "./Menu";

function Header(props) {
	const [ currentPageTitle, setCurrentPageTitle ] = useState("");


	useEffect(() => {
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
		<div className="main-header-container">
			<div className="header-container">
				<div className="header-menu">
					<div className="logo-and-title">
						<i className="bi bi-soundwave soundwave-logo"/>
						<h1 className="header-title-h">{!currentPageTitle
							? props.currentPageTitle
							: currentPageTitle}</h1>
					</div>
					<div>
						<h1 className="current-page-logo">{currentToLogo(currentPageTitle)}</h1>
					</div>
					<div className="header-menu-buttons">
						<ul className="menu-buttons">
							<Link className="menu-link" to="/home">
								<li className="link link-effect">waver</li>
							</Link>
							<Link className="menu-link" to="/discover">
								<li className="link link-effect">discover</li>
							</Link>
							<Link className="menu-link" to="/collections">
								<li className="link link-effect">collections</li>
							</Link>
							<Link className="menu-link" to="/manifest">
								<li className="link link-effect">manifest</li>
							</Link>
						</ul>
					</div>
				</div>
				<Menu/>
			</div>
			<div className="header-title-container">

			</div>
		</div>
	);
}

export default Header;