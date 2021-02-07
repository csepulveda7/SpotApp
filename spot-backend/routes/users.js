let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
});

module.exports = router;