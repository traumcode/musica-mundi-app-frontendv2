import axios from "axios";

export const generateName = () => {
	let options = {
		method: 'GET',
		url: 'https://inclusiverandomgenerator.p.rapidapi.com/Person/Name',
		headers: {
			'x-rapidapi-host': 'inclusiverandomgenerator.p.rapidapi.com',
			'x-rapidapi-key': '1d48b64081mshfa8eb2b0fef7034p1d4c45jsne8b01abcf5ef'
		}
	};

	axios.request(options).then(function (response) {
		console.log(response.data[0]);
	}).catch(function (error) {
		console.error(error);
	});
}