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
const { auth, db } = require('../index');
const { faEyeDropper } = require('@fortawesome/free-solid-svg-icons');

function getUserCollection() {
	return db.collection('users').withConverter(userConverter);
}

const createUserSucceeded = (user) => new Promise((resolve, reject) => {
	const { currentUser } = auth;
	const userCollection = getUserCollection();

	console.log(user);

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
		.catch((error) => reject(error.toString()));
});

exports.loadUser = () => new Promise((resolve, reject) =>{
	
	const { currentUser } = auth;
	const userCollection = db.collection('users');

	userCollection.doc(`${currentUser.uid}`).get()
	.then((userData) => {
		//console.log(userData.data());
		resolve(JSON.stringify(userData.data()));
		//resolve(userData);
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