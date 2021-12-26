import React, { useState } from 'react';
import { generateName } from "../apis/fetchNames";

function Profile(props) {
	const [nickname, setNickname] = useState();



	console.log(props)
	return (
		<div>
			<h1>sdsad</h1>
			<h1>sdsadf</h1>
			{props.match.params.username}

			<button onClick={() => generateName()}>CLICK HERE TO GENERATE NAME</button>

			<h1>{nickname}</h1>
		</div>
	);
}

export default Profile;