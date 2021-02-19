// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let userController = require('../Controller/User');

//Parse POST request body data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* Users GET Requests. */

// GET requests list of all users
router.get('/getUsers', userController.getUsers);

/* Users POST Requests. */

// POST request for creating a new user
router.post('/createUser', userController.createUser);

// POST request for creating a new user
router.post('/loginUser', userController.loginUser);

module.exports = router;