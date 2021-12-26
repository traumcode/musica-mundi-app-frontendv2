const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export const generateShortName = () => {
	return uniqueNamesGenerator({
		dictionaries: [ adjectives, animals, colors ],
		length: 2
	});
}