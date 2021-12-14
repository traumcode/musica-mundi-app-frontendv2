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
					<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
						  width="50" height="50" viewBox="0 0 512.000000 512.000000"
						  preserveAspectRatio="xMidYMid meet">

						<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
							fill="#30daa8" stroke="none">
							<path d="M974 4306 c-17 -8 -43 -29 -57 -47 -13 -19 -142 -333 -285 -699
l-260 -665 -135 -5 c-147 -5 -165 -12 -211 -74 -33 -43 -29 -132 6 -178 47
-62 86 -70 304 -66 215 3 241 11 281 84 12 21 99 237 193 479 164 419 189 481
190 462 1 -27 573 -2668 584 -2697 43 -110 198 -132 269 -39 15 21 143 362
323 862 164 455 300 827 303 827 3 0 82 -143 175 -318 93 -174 180 -333 193
-352 64 -99 209 -97 268 2 9 16 149 310 310 654 161 344 295 622 298 617 2 -4
97 -305 211 -668 114 -363 215 -671 225 -685 64 -89 183 -94 253 -12 18 22 50
119 122 373 54 189 102 359 108 377 l10 32 166 0 c141 0 173 3 208 19 61 28
89 73 89 143 0 61 -17 94 -69 132 -26 20 -40 21 -300 21 l-273 0 -37 -28 c-45
-35 -47 -39 -106 -247 l-47 -165 -51 160 c-28 88 -114 363 -192 610 -78 248
-151 464 -163 482 -29 43 -70 65 -120 65 -53 0 -85 -13 -118 -46 -16 -16 -156
-302 -345 -706 -176 -374 -321 -680 -324 -680 -3 0 -90 160 -195 355 -112 210
-203 369 -222 387 -37 36 -112 49 -163 28 -67 -28 -73 -43 -350 -812 -146
-406 -267 -738 -270 -738 -3 0 -133 595 -289 1323 -156 727 -290 1336 -297
1354 -31 72 -137 112 -210 79z"/>
						</g>
					</svg>

					<h1 className="navbar-title">{currentPageTitle}</h1>
				</div>

				{user === "" ? (
					<ul className="navbar-nav-up">
						<Link className="navbar-link" to="/collections">
							<li className="nav-item">sign in</li>
						</Link>
						<Link className="navbar-link" to="/manifest">
							<li className="nav-item">about us</li>
						</Link>
					</ul>) : (
					<ul className="navbar-nav-up">
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
				<div className="title-container">
					<div className="title-effect1">
						<h1 className="current-page-title">WAVER</h1>
					</div>
					<div className="title-effect2">
						<h1 className="current-page-title2">WAVER</h1>
					</div>
				</div>
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