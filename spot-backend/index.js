// Import firebase and keys config
const firebase = require('firebase');
const { config } = require('./config');

// Import cloud storage
require('firebase/storage');

// Initalize app, authentication, database, and storage bucket
const app = firebase.initializeApp(config);
const auth = firebase.auth(app);
const db = firebase.firestore(app);
const storage = firebase.storage();

module.exports = {
	firebase: firebase,
	auth: auth,
	db: db,
	storage: storage
};