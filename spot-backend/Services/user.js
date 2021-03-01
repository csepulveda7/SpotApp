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
const lodash = require('lodash');


const showFirebaseError = (error) => {
	let errorMessage;

	switch (error.code) {
		case 'auth/user-not-found':
			errorMessage = 'There is no user record corresponding to this identifier';
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

	//console.log(errorMessage);
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
			.catch((error) => showFirebaseError(error))
			.then();
			
			//.catch(() => console.log('We were not able to send an email. Try again.'))
			//.then(() => console.log(`We sent a verification to: ${user.email}. Please open your email and verify your account`));
		})
		.then(() => auth.signOut())
		.catch((error) => showFirebaseError(error));
		//.catch((error) => console.log(error));
};

exports.createUser = async (user) => {
	auth.createUserWithEmailAndPassword(user.email, user.password)
		.then(() => createUserSucceeded(user))
		.catch((error) => showFirebaseError(error));
		//.catch((error) => showFirebaseError(error));
};

exports.loginUser = async (user) => {
	auth.signInWithEmailAndPassword(user.email, user.password)
		.then((userCredential) => {
			// Signed in
			let user = userCredential.user;

			console.log(user);
		})
		.catch((error) => {
			console.log(error.code, error.message);
		});
};

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