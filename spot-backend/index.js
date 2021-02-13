// import firebase and the controllers
import firebase from 'firebase-admin';
import * as userController from './Controller/User'

// Config firebase keys
const config = {
    apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId
};

// Initalize firebase app and db
const app = firebase.initializeApp(config);
const db = firebase.firestore(app);

// Specify custom db configurations
db.settings({
    ssl: false,
    timestampsInSnapshots: true
});

// export database reference
export { db };