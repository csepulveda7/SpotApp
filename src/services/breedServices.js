import config from '../config';

export const getBreeds = () => new Promise((resolve) => {
	let data = [];

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

				for (let i = 0; i < data.length; i++) {
					dogArray.push({ breed: data[i].name, id: data[i].id });
				}
				resolve(dogArray);
			});
	}
	catch (e) {
		console.error(e);
	}
});