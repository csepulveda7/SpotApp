import config from '../config';

const showFirebaseError = (error) => {
	let errorMessage;

	switch (error.code) {
		case 'auth/user-not-found':
			errorMessage = 'Incorrect credentials';
			break;
		case 'auth/invalid-email':
			errorMessage = 'Enter a valid email';
			break;
		case 'auth/wrong-password':
			errorMessage = 'Incorrect credentials';
			break;
		default:
			errorMessage = error.message;
	}

	return errorMessage;
};

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

export const createUser = (username, email, password) => new Promise((resolve) => {
	try {
		const user = {
			name: username,
			email: email,
			password: password,
			picture: '',
			score: 0,
			collectedBreeds: {
				total: 0
			}
		};

		fetch(`${config.API_ADDR}/user/createUser`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(res => res.json())
			.then(registerStatus => {
				if (registerStatus.success) resolve(registerStatus);
				else resolve(showFirebaseError(registerStatus));
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const loginUser = (email, password) => new Promise((resolve) => {
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
		})
			.then(res => res.json())
			.then(loginStatus => {
				if (loginStatus.success) resolve('success');
				else resolve(showFirebaseError(loginStatus));
			});
	}
	catch (e) {
		console.error(e);
	}
});

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

export const resetPassword = (email) => new Promise((resolve) => {
	try {
		const user = { email: email };

		fetch(`${config.API_ADDR}/user/resetPassword`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(res => res.json())
			.then(resetStatus => {
				if (resetStatus.success) resolve(resetStatus);
				else resolve(showFirebaseError(resetStatus));
			});
	}
	catch (e) {
		console.error(e);
	}
});

export const getUserStatus = () => new Promise((resolve) => {
	try {
		fetch(`${config.API_ADDR}/user/userStatus`, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(status => resolve(status));
	}
	catch (e) {
		console.error(e);
	}
});

/*

export const loadCurrentUser = () => new Promise(resolve => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/`).on('value', userSnapshot => {
		firebase.database().ref(`/privileges/${currentUser.uid}/`).on('value', privilegeSnapshot => {
			resolve({ ...userSnapshot.val(), privilege: privilegeSnapshot.val() });
		});
	});
});

*/


// export const getUserStatus = () => new Promise((resolve) => {
// 	try {
// 		fetch(`${config.API_ADDR}/user/loadUser`, {
// 			method: 'GET',
// 			mode: 'no-cors',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-type': 'application/json'
// 			}
// 		})
// 			.then(res => res.json())
// 			.then(status => resolve(status));
// 	}
// 	catch (e) {
// 		console.error(e);
// 	}
// });