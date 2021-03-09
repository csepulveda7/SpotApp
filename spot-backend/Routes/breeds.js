// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let breedController = require('../Controller/breeds');

router.get('/getBreeds', breedController.getBreedData);

module.exports = router;