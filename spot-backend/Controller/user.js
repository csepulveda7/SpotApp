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

exports.getUsers = function(request, response) {
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
		 *   <----Insert Code Here---->
		 */
		userService.createUser(request.body);
		response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
	}
};

exports.loginUser = async (request, response) => {
	try {
		const { email, password } = request.body;

		console.log('Email:', email);
		console.log('Password:', password);
		response.sendStatus(200);
	}
	catch (e) {
		console.error(e);
	}
};