/*  Controller: 
	- manages the incoming work HTTP requests
	- decides which worker what service should do the work
	- splits up the work into sizable units
	- passes that work the necessary data from the HTTP requests off to the service(s)
	- if the work requires multiple people services working on multiple things, 
		orchestrates the work those service calls, but does not do the work itself.
*/
exports.getUsers = function(req, res) {
	res.json([{
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
};