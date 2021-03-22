// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

// Handles uploading profile picture to database
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'Services/');
	},
	filename: function (req, file, cb) {
		cb(null, 'breedImage.jpg'); // Appending .jpg
	}
});

const upload = multer({ storage: storage });

let breedController = require('../Controller/breeds');
let ml = require('../services/breedClassification');

router.post('/classifyBreed', upload.single('image'), (req, res) => {
	if (!req.file) {
		console.log('No file received');

		return res.send({
			success: false
		});
	}
	else {
		console.log('file received');
		ml.classifyBreed().then(breed => res.send({
			success: true,
			breedName: breed
		}));
	}
});

// Get Breeds Info from breed data json
router.get('/getBreeds', breedController.getBreedData);

router.post('/findBreed', breedController.findBreed);

module.exports = router;