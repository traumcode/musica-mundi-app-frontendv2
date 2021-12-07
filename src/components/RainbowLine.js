import React from 'react';
let settings;

const newSettings = () => {
	settings = new Array(4).fill().map(_ => new Array(3).fill().map(_ => Math.random()));
};
newSettings();

const pal = (
	t = 0,
	a = [0.5, 0.5, 0.5],
	b = [0.5, 0.5, 0.5],
	c = [1.0, 1.0, 1.0],
	d = [0.00, 0.10, 0.20]
) => c.map(
	(cc, i) =>
		Math.cos(
			cc * t + d[i] * 6.28318
		) * b[i] + a[i]
);
let t = 0;
let length = 40;

function draw() {
	t += .25;
	const c = new Array(length).fill().map((_,i) => `rgb(${pal(
		((i + t) / length) * (Math.PI * 2),
		settings[0], settings[1], settings[2], settings[3]
	).map(e => e * 255).join(',')})`).map((rgb,i) => `${rgb} ${i/length * 100}% ${(i+1)/length * 100}%`).join(',');
	if(document.getElementById('background')){

		document.getElementById('background').style.background = `linear-gradient(45deg, ${c})`;
	}
	requestAnimationFrame(draw)
}

draw();

window.addEventListener('click', newSettings);
function RainbowLine(props) {
	return (
		<div style={{
			width: '100%',
			height:"295px",
			top:"123px",
			position:"absolute",
			clipPath: "polygon(0% 0%, 100% 70%, 100% 100%, 0% 30%)"
		}} id="background">

		</div>
	);
}

export default RainbowLine;