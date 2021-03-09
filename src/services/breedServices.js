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
			.then(data => resolve(data));
	}
	catch (e) {
		console.error(e);
	}
});