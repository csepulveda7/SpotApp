// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

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

router.get('/getBreeds', breedController.getBreedData);

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

module.exports = router;