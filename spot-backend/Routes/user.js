// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let userController = require('../Controller/User');
const { handleUpload } = require('../Services/User');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'Services/');
	},
	filename: function (req, file, cb) {
		cb(null, 'tempImage.jpg');
	}
});

const upload = multer({ storage: storage });

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

// GET request to load a user's profile information
router.get('/loadUser', userController.loadUser);

// POST request for adding new breed to User collection
router.post('/updateCollectedBreeds', userController.updateCollectedBreeds);

// POST request for updating user's profile picture
router.post('/uploadImage', upload.single('image'), (req, res) => {
	if (!req.file) {
		console.log('No file received');

		return res.send({ success: false });
	}
	else {
		console.log(req.file);

		handleUpload(req.file)
			.then(() => res.send({ success: true }))
			.catch(() => res.send({ success: false }));
	}
});

module.exports = router;