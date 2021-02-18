import config from '../config';

export const loginUser = (email, password) => {
	try {
		const user = { email: email, password: password };

		fetch(`${config.API_ADDR}/user/loginUser`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		});
	}
	catch (e) {
		console.error(e);
	}
};