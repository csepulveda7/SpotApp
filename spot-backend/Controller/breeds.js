const breedData = require('../Services/BreedData.json');

exports.getBreedData = function(request, response) {
	try {
		response.json(breedData);
	}
	catch (e) {
		console.error(e);
	}
};