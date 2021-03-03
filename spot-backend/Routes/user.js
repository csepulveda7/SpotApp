// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let userController = require('../Controller/User');

// Parse POST request body data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET requests list of all users
router.get('/getDevs', userController.getDevs);

// POST request for creating a new user
router.post('/createUser', userController.createUser);

// POST request for logging in user to their account
router.post('/loginUser', userController.loginUser);

// GET request for logging out user from their account
router.get('/logoutUser', userController.logoutUser);

// POST request for resetting user account password
router.post('/resetPassword', userController.resetPassword);

// GET request for user's current status (logged in or out)
router.get('/userStatus', userController.userStatus);

module.exports = router;