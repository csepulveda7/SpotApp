// import firebase and the controllers
const admin = require('firebase-admin');
//const firebase = require('firebase');

// Config firebase keys
const serviceAccount = require('../serviceAccountKey.json');

// Initalize firebase app
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://spotappDB.firebaseio.com',
	storageBucket: 'spotappBucket.appspot.com'
});

// firebase.initializeApp({
// 	apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     databaseURL: process.env.databaseURL,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// });

// Initalize authentication, database, and storage bucket
const auth = admin.auth();
const db = admin.firestore();
const bucket = admin.storage().bucket();
//const fireAuth = firebase.auth();

module.exports = {
	auth: auth,
	db: db,
	bucket: bucket,
	//fireAuth: fireAuth
};