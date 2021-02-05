let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		username: 'Lucas Saber'
	}, {
		id: 2,
		username: 'D0loresH4ze'
	}]);
});

module.exports = router;