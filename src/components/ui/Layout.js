import React from 'react';
import Header from '../Header'
import Footer from '../Footer'

function Layout(props) {
	return (
		<div>
			<div>
				<Header/>
				<main>{props.children}</main>
			</div>
			<Footer/>
		</div>
	);
}

export default Layout;