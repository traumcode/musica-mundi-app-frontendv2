import React from 'react';
import Header from '../Header'
import Footer from '../Footer'

function Layout(props) {
	return (
		<div style={{ overflow: 'hidden' }}>
			<Header currentPageTitle={props.currentPageTitle}/>
			<section>
				<div className="container">
					<main>{props.children}</main>
				</div>
			</section>
			<Footer/>
		</div>
	);
}

export default Layout;