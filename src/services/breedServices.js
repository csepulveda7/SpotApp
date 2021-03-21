import config from '../config';

export const getBreeds = () => new Promise((resolve) => {
	try {
		fetch(`${config.API_ADDR}/breeds/getBreeds`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				let dogArray = [];

				for (let i = 0; i < data.length; i++)
					dogArray.push({ breed: data[i].name, id: i + 1 });

				resolve(dogArray);
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const getBreedInfo = (id) => new Promise((resolve) => {
	try {
		fetch(`${config.API_ADDR}/breeds/getBreeds`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				let _id = id - 1;

				const info = {
					breed: data[_id].name,
					id: data[_id].id,
					bredFor: data[_id].bred_for,
					breedGroup: data[_id].breed_group,
					height: data[_id].height.imperial,
					lifeSpan: data[_id].life_span,
					temperament: data[_id].temperament,
					weight: data[_id].weight.imperial
				};

				resolve(info);
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const getBreedName = (id) => new Promise((resolve) => {
	try {
		fetch(`${config.API_ADDR}/breeds/getBreeds`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				let _id = id - 1;

				const info = {
					breed: data[_id].name,
					id: data[_id].id
				};

				resolve(info);
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const getBreedPhoto = (id) => new Promise((resolve) => {
	try {
		fetch(`${config.API_ADDR}/breeds/getBreeds`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				resolve(data[id - 1].image);
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const classifyBreed = (image) => new Promise((resolve, reject) => {
	try {
		const payload = new FormData();

		payload.append('image', image);

		fetch(`${config.API_ADDR}/breeds/classifyBreed`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'multipart/form-data'
			},
			body: payload
		})
			.then(res => res.json())
			.then(result => {
				result.success ? resolve(result.breedName) : reject();
			});
	}
	catch (e) {
		console.error(e);
	}
});