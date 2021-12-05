import React from 'react';
import Header from '../Header'
import Footer from '../Footer'
import RainbowLine from "../RainbowLine";

function Layout(props) {
	return (
		<div style={{ overflow: 'hidden' }}>
			<Header/>
			<section>
				<div className="container main-container">
					<main>{props.children}</main>
					<div style={{height: '20px'}}>
						<RainbowLine/>
					</div>
				</div>
			</section>
			<Footer/>
		</div>
	);
}

export default Layout;