import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { setMainStorage } from "../app/App";

function Menu(props) {
	const [checkBox, setCheckBox] = useState(document.querySelector('input[type=checkbox]'));

	useEffect(() => {
		setCheckBox(document.querySelector('input[type=checkbox]')) ;
	}, [])


	return (
		<nav role="navigation">
			<div id="menuToggle">
				<input onClick={() => {
					!checkBox.checked ? checkBox.checked = false : checkBox.checked = true;
					!checkBox.checked ? setMainStorage({isMenuOn:false}) : setMainStorage({isMenuOn:true});
				}} id="inputCheckBox" type="checkbox"/>
				<span/>
				<span/>
				<span/>
				<ul id="menu">
					<Link onClick={() => {
						checkBox.checked = false;
						setMainStorage({isMenuOn:false})
					}} to="/home">
						<li>home</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
						setMainStorage({isMenuOn:false})
					}} to="/discover">
						<li>discover</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
						setMainStorage({isMenuOn:false})
					}} to="/about">
						<li>about</li>
					</Link>
					<Link onClick={() => {
						checkBox.checked = false;
						setMainStorage({isMenuOn:false})
					}} to="/collections">
						<li>collections</li>
					</Link>
				</ul>
			</div>
		</nav>
	);
}

export default Menu;