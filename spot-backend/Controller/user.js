// Controller communitcates to the model and frontend to make a response or request
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