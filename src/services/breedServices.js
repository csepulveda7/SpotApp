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
					dogArray.push({ breed: data[i].name, id: data[i].id });

				resolve(dogArray);
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