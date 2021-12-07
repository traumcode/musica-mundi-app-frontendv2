import React, { useEffect, useState } from 'react';
import Menu from "./Menu";


function Header(props) {
	const [ currentPageTitle, setCurrentPageTitle ] = useState("");


	useEffect(() => {
		window.location.pathname === "/home" ? setCurrentPageTitle("waver~") : setCurrentPageTitle(window.location.pathname.replace("/", ""))
		return () => console.log("aaa")
	}, [ window.location.pathname, currentPageTitle ])


	return (
		<div className="header-container">
			<div className="header-menu">
				<Menu/>
			</div>
			<div className="header-title-container">

				<div className="borderr radial-repeating"><h1 className="header-title-h">{!currentPageTitle ? props.currentPageTitle : currentPageTitle}</h1></div>
			</div>
		</div>
	);
}

export default Header;