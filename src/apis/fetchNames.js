import axios from "axios";

export const generateName = () => {
	const options = {
		method: 'GET',
		url: 'https://nickname-to-fullname.p.rapidapi.com/nickname/chris',
		headers: {
			'x-rapidapi-host': 'nickname-to-fullname.p.rapidapi.com',
			'x-rapidapi-key': '1d48b64081mshfa8eb2b0fef7034p1d4c45jsne8b01abcf5ef'
		}
	};

	axios.request(options)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
}