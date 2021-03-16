/*
 *  Services:
 *  - receives the request data it needs from the manager in order to perform its tasks
 *  - figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
 *  - is generally only concerned with the tasks it has to complete
 *  - not responsible for making decisions about the "bigger" picture orchestrating the different service calls
 *  - does the actual work necessary to complete the tasks/request
 *  - returns the completed work a response to the controller
 */

const { userConverter } = require('../Models/user');
const { auth, db, storage } = require('../index');
const breedData = require('./breedData.json');
const fs = require('fs');

global.XMLHttpRequest = require('xhr2');

function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

const createUserSucceeded = (user) => new Promise((resolve, reject) => {
	const { currentUser } = auth;
	const userCollection = getUserCollection();

	userCollection.doc(`${currentUser.uid}`).set(user)
		.then(() => {
			currentUser.sendEmailVerification()
				.then(() => resolve({ 'success': `We sent a verification to: ${user.email}. Please open your email and verify your account` }))
				.catch(() => reject({ 'fail': 'We were not able to send an email. Try again.' }));
		})
		.then(() => auth.signOut())
		.catch((error) => console.log(error));
});

exports.createUser = (user, password) => new Promise((resolve, reject) => {
	auth.createUserWithEmailAndPassword(user.email, password)
		.then(() => resolve(createUserSucceeded(user)))
		.catch((error) => reject(error));
});

exports.loginUser = (user) => new Promise((resolve, reject) => {
	auth.signInWithEmailAndPassword(user.email, user.password)
		.then(userCredential => {
			userCredential.user ?
				resolve({ 'success': true }) : resolve({ 'success': false });
		})
		.catch((error) => reject(error));
});

exports.loadUser = () => new Promise((resolve, reject) =>{
	const { currentUser } = auth;
	const userCollection = db.collection('users');

	userCollection.doc(`${currentUser.uid}`).get()
		.then((userData) => {
			resolve(JSON.stringify(userData.data()));
		})
		.catch(error => reject(error));
});

exports.logoutUser = () => {
	auth.signOut()
		.then(() => console.log('Logged Out: Have a great day!'));
};

exports.resetPassword = (user) => new Promise((resolve, reject) => {
	auth.sendPasswordResetEmail(user.email)
		.then(() => resolve({ 'success': `If an account with email ${user.email} exists, a reset password email will be sent. Please check your email.` }))
		.catch(error => reject(error));
});

exports.userStatus = () => new Promise((resolve) => {
	auth.onAuthStateChanged(user => resolve(user && user.emailVerified));
});

function storeImageUrl(filePath, url) {
	const userCollection = getUserCollection();

	userCollection.doc(filePath).update({ picture: url });
}

exports.handleUpload = (image) => new Promise((resolve, reject) => {
	const { currentUser } = auth;
	const uid = currentUser.uid;
	let imageRef = null;
	let uploadBlob = null;

	console.log('here');
	imageRef = storage.ref(`users/${ uid }`).child('profilePic');
	console.log('here again');

	const imageBuffer = fs.readFileSync(__dirname + '/tempImage.jpg');

	imageRef.put(imageBuffer, { contentType: 'image/jpg' })
		.then((snapshot) => {
			return imageRef.getDownloadURL();
		})
		.then((url) => storeImageUrl(uid, url))
		.then(() => resolve())
		.catch(() => reject());
});

exports.updateCollectedBreeds = (breed) => new Promise((resolve, reject) => {
	const { currentUser } = auth;
	const userRef = db.collection('users').doc(`${currentUser.uid}`);
	let points = 0;

	for (let i = 0; i < breedData.length; i++) {
		if (breedData[i].name === breed.name)
			points = breedData[i].points;
	}

	userRef.get()
		.then((doc) => {
			console.log(doc.data());

			return doc.data();
		})
		.then(user => {
			userRef.set({
				score: (user.collectedBreeds[breed.name])
					? user.score + 1 : user.score + points,
				collectedBreeds: {
					total: user.collectedBreeds.total + 1,
					[breed.name]: user.collectedBreeds[breed.name] + 1 || 1
				}
			}, { merge: true });
		})
		.then(() => resolve())
		.catch(() => reject());
});