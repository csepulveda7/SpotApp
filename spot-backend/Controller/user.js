/*
 *  Controller:
 *  - manages the incoming work HTTP requests
 *  - decides which worker what service should do the work
 *  - splits up the work into sizable units
 *  - passes that work the necessary data from the HTTP requests off to the service(s)
 *  - if the work requires multiple people services working on multiple things,
 *  orchestrates the work those service calls, but does not do the work itself.
 */

let userService = require('../services/user');

exports.getDevs = function(request, response) {
	try {
		response.json([{
			id: 1,
			username: 'Lucas Saber'
		}, {
			id: 2,
			username: 'Pablo Cuervo'
		},
		{
			id: 3,
			username: 'Diego Slovaco'
		},
		{
			id: 4,
			username: 'Cristobal Sepulveda'

		}]);
	}
	catch (e) {
		console.error(e);
	}
};

exports.createUser = async (request, response) => {
	try {
		/*
		 * create new instance of User Model
		 *   <----Insert Code Here----> uwu
		 */

		userService.createUser(request.body);
		response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
	}
};

exports.loginUser = async (request, response) => {
	userService.loginUser(request.body)
		.then(loginStatus => response.status(200).send(loginStatus))
		.catch(error => response.status(400).send(error));
};

exports.logoutUser = async (request, response) => {
	try {
		userService.logoutUser();
		response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
	}
};

exports.resetPassword = async (request, response) => {
	try {
		userService.resetPassword(request.body);
		response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
	}
};

exports.userStatus = (request, response) => {
	try {
		userService.userStatus()
			.then(status => response.send(status || false));
	}
	catch (e) {
		console.error(e);
	}
};