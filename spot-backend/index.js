// import firebase and the controllers
const admin = require('firebase-admin');

// Config firebase keys
const serviceAccount = require('../serviceAccountKey.json');

// Initalize firebase app
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://spotappDB.firebaseio.com',
	storageBucket: 'spotappBucket.appspot.com'
});

// Initalize authentication, database, and storage bucket
const auth = admin.auth();
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = {
	auth: auth,
	db: db,
	bucket: bucket
};