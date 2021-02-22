let express = require('express');
let router = express.Router();

/* GET INIT */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

// All routes to /users are being solved in /routes/user
router.use('/user', require('./user'));

module.exports = router;