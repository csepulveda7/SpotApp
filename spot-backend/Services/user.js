/*
 *  Services:
 *  - receives the request data it needs from the manager in order to perform its tasks
 *  - figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
 *  - is generally only concerned with the tasks it has to complete
 *  - not responsible for making decisions about the "bigger" picture orchestrating the different service calls
 *  - does the actual work necessary to complete the tasks/request
 *  - returns the completed work a response to the controller
 */

const { auth } = require('../index');
const lodash = require('lodash');

exports.createUser = async (user) => {
	auth.createUserWithEmailAndPassword(user.email, user.password)
		.then((userCredential) => {
			// Signed in
			let user = userCredential.user;

			console.log(user);
		})
		.catch((error) => {
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log(errorMessage);
		});
};

exports.loginUser = async (user) => {
	auth.signInWithEmailAndPassword(user.email, user.password)
		.then((userCredential) => {
			// Signed in
			let user = userCredential.user;

			console.log(user);
		})
		.catch((error) => {
			let errorCode = error.code;
			let errorMessage = error.message;

			console.log(errorCode, errorMessage);
		});
};