const breedData = require('../Services/BreedData.json');
const { petConfig } = require('../config');
const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: petConfig.apiKey, secret: petConfig.secret });

exports.getBreedData = function(request, response) {
	try {
		response.json(breedData);
	}
	catch (e) {
		console.error(e);
	}
};

exports.findBreed = function(request, response) {
	const { searchBreed, searchLocation } = request.body;
	let result = [];

	const showAnimals = async (breed, location) => {
		let apiResult = await client.animal.search({
			breed,
			location,
			type: 'Dog',
			sort: 'distance',
			limit: 12
		});

		result = apiResult.data.animals.map(animal =>
			({ id: animal.id, name: animal.name, breed: animal.breeds.primary, age: animal.age,
				gender: animal.gender, size: animal.size, distance: animal.distance,
				photo: animal.photos[0].medium, url: animal.url }));

		return result;
	};

	showAnimals(searchBreed, searchLocation)
		.then(data => { data.length > 0 ? response.json(data) : response.json({ 'error': 'No Dogs Found' }) })
		.catch(() => response.json({ 'error': 'No Dogs Found' }));
};