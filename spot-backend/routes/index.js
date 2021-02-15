let express = require('express');
let router = express.Router();

/* GET INIT */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// All routes to /Users are being solved in /routes/users
router.use('/users', require('./User'));

module.exports = router;