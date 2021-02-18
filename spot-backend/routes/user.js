// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let userController = require('../Controller/User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/getUser', userController.getUser);

router.post('/showUser', userController.showUser);

module.exports = router;