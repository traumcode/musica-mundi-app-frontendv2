import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Menu(props) {
	const [checkBox, setCheckBox] = useState(document.querySelector('input[type=checkbox]'));

	useEffect(() => {
		console.log(document.querySelector('input[type=checkbox]'))
		setCheckBox(document.querySelector('input[type=checkbox]')) ;
	}, [])


	return (
		<nav role="navigation">
			<div id="menuToggle">
				<input onClick={() => {
					!checkBox.checked ? checkBox.checked = false : checkBox.checked = true;
					console.log(document.querySelector('input[type=checkbox]').checked);
				}} id="inputCheckBox" type="checkbox"/>
				<span/>
				<span/>
				<span/>
				<ul id="menu">
					<Link onClick={() => {
						checkBox.checked = false;
					}} to="/home">
						<li>home</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
					}} to="/discover">
						<li>discover</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
					}} to="/about">
						<li>about</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
					}} to="/collections">
						<li>collections</li>
					</Link>
				</ul>
			</div>
		</nav>
	);
}

export default Menu;