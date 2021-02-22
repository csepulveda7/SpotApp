import config from '../config';

export const getDevs = () => {
	try {
		fetch(`${config.API_ADDR}/user/getDevs`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json());
	}
	catch (e) {
		console.error(e);
	}
};

export const createUser = (username, email, password) => {
	try {
		const user = { name: username, email: email, password: password };

		fetch(`${config.API_ADDR}/user/createUser`, {
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

export const logoutUser = () => {
	try {
		fetch(`${config.API_ADDR}/user/logoutUser`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		});
	}
	catch (e) {
		console.error(e);
	}
};

export const resetPassword = (email) => {
	try {
		fetch(`${config.API_ADDR}/user/resetPassword`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(email)
		});
	}
	catch (e) {
		console.error(e);
	}
};