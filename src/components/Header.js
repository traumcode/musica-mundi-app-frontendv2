import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Header(props) {
	const [ currentPageTitle, setCurrentPageTitle ] = useState("");
	const [ user ] = useState("s");


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
	const primary_color = "#35e8aa"
	return (
		<header>
			<nav className="navbar">
				<div className="navbar-title-logo">
					<svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="50" height="50"
						  fill={primary_color}>
						<use id="Background" href="#img1" x="0" y="0"/>
						<path id="Shape 1" className="s0" style={{ fill: `${primary_color}` }} d="m246.05 787.03l2-120l138-409l15 65l-155 464z"/>
						<path id="Shape 2" className="s0" style={{ fill: `${primary_color}` }} d="m265.05 729.03l-23 75l-51-401l29.63-42.86l44.37 368.86z"/>
						<path id="Shape 3" className="s0" style={{ fill: `${primary_color}` }} d="m0 402.03l-7.95-41l229-1l-18 43l-203.05-1z"/>
						<path id="Shape 4" className="s0" style={{ fill: `${primary_color}` }}
								d="m363.81 321.21l22.2-66.4l117.67 505.54l-19.67 73l-120.21-512.14z"/>
						<path id="Shape 5" className="s0" style={{ fill: `${primary_color}` }}
								d="m484.21 839.21l-16.6-77.2l190.07-682.33l16 70.67l-189.47 688.86z"/>
						<path id="Shape 6" className="s0" style={{ fill: `${primary_color}` }}
								d="m638.51 150.26l19.5-72.5l136 548.75l-15.75 80.5l-139.75-556.75z"/>
						<path id="Shape 7" className="s1" style={{
							fill: `${primary_color}`,
							stroke: "#60e2b9",
							strokeWidth: '5'
						}} d="m778.01 709.51l-18.5-79l55-268l29 28.25l-65.5 318.75z"/>
						d="m500.5 992c-271.8 0-491.5-219.7-491.5-491.5c0-271.8 219.7-491.5 491.5-491.5c271.8 0 491.5 219.7 491.5 491.5c0 271.8-219.7
						491.5-491.5 491.5z"/>
						<path id="Shape 8" className="s0" d="m842.26 396.51l-28.25-34l186.25-0.25l-0.25 35l-157.75-0.75z"/>
					</svg>
					<h1 className="navbar-title">{currentPageTitle}</h1>
				</div>

				{user === "" ? (
					<ul className="navbar-nav-up" >
						<Link className="navbar-link" to="/collections">
							<li className="nav-item">sign in</li>
						</Link>
						<Link className="navbar-link" to="/manifest">
							<li className="nav-item">about us</li>
						</Link>
					</ul>) : (
					<ul className="navbar-nav-up" >
						<Link className="navbar-link" to={`/${user}/profile/`}>
							<li className="nav-item-s"><i className="bi bi-person-circle"/></li>
						</Link>
						<Link className="navbar-link" to={`/${user}/wishlist/`}>
							<li className="nav-item-s" style={{ fontSize: "calc(2.3rem + 0.4vw)" }}><i className="bi bi-soundwave"/></li>
						</Link>
						<Link className="navbar-link" to={`/${user}/cart/`}>
							<li className="nav-item-s"><i className="bi bi-bag"/></li>
						</Link>
						<Link className="navbar-link" to="/collections">
							<li className="nav-item-s" style={{ fontSize: "calc(2.3rem + 0.4vw)" }}><i className="bi bi-list"/></li>
						</Link>
					</ul>
				)}
			</nav>
			<div className="container-md">
				<h1 className="current-page-title">WAVER</h1>
				<ul className="header-menu navbar-nav">
					<Link className="header-link nav-item-s" to="/home">
						<li>home</li>
					</Link>
					<Link className="header-link nav-item-s " to="/discover">
						<li>discover</li>
					</Link>
					<Link className="header-link nav-item-s" to="/collections">
						<li>collections</li>
					</Link>
					<Link className="header-link nav-item-s" to="/manifest">
						<li>manifest</li>
					</Link>
				</ul>
			</div>
		</header>
	);
}

export default Header;