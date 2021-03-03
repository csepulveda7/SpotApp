/*
 *  Services:
 *  - receives the request data it needs from the manager in order to perform its tasks
 *  - figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
 *  - is generally only concerned with the tasks it has to complete
 *  - not responsible for making decisions about the "bigger" picture orchestrating the different service calls
 *  - does the actual work necessary to complete the tasks/request
 *  - returns the completed work a response to the controller
 */

const { auth, db } = require('../index');

const showFirebaseError = (error) => {
	let errorMessage;

	switch (error.code) {
		case 'auth/user-not-found':
			errorMessage = 'Incorrect credentials';
			break;
		case 'auth/invalid-email':
			errorMessage = 'Enter a valid email';
			break;
		case 'auth/wrong-password':
			errorMessage = 'Incorrect credentials';
			break;
		default:
			errorMessage = error.message;
	}

	console.log(errorMessage);
};

const createUserSucceeded = async (user) => {
	const { currentUser } = auth;

	db.collection('users').doc(`${currentUser.uid}`)
		.set({
			email: user.email,
			name: user.name,
			picture: '',
			score: 0,
			collectedBreeds: {
				total: 0
			}
		})
		.then(() => {
			currentUser.sendEmailVerification()
				.catch(() => console.log('We were not able to send an email. Try again.'))
				.then(() => console.log(`We sent a verification to: ${user.email}. Please open your email and verify your account`));
		})
		.then(() => auth.signOut())
		.catch((error) => console.log(error));
};

exports.createUser = async (user) => {
	auth.createUserWithEmailAndPassword(user.email, user.password)
		.then(() => createUserSucceeded(user))
		.catch((error) => showFirebaseError(error));
};

exports.loginUser = (user) => new Promise((resolve, reject) => {
	auth.signInWithEmailAndPassword(user.email, user.password)
		.then(userCredential => {
			userCredential.user ?
				resolve({ 'success': true }) : resolve({ 'success': false });
		})
		.catch((error) => reject(error));
});

// Insert loadUser service here  //
// ---------------------------- //

exports.logoutUser = () => {
	auth.signOut()
		.then(() => console.log('Logged Out: Have a great day!'));
};

exports.resetPassword = async (email) => {
	auth.sendPasswordResetEmail(email)
		.then(() => console.log(`Reset Started.\n If an account with email ${email} exists, a reset password email will be sent. Please check your email.`))
		.catch(error => showFirebaseError(error));
};

exports.userStatus = () => new Promise((resolve) => {
	auth.onAuthStateChanged(user => resolve(user && user.emailVerified));
});