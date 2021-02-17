// Router chooses which controller (and which method on that controller) handles a request.
let express = require('express');
let router = express.Router();

let userController = require('../Controller/User');

/* GET users listing. */
router.get('/getUsers', userController.getUsers);

module.exports = router;