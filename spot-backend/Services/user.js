/*
 *  Services:
 *  - receives the request data it needs from the manager in order to perform its tasks
 *  - figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
 *  - is generally only concerned with the tasks it has to complete
 *  - not responsible for making decisions about the "bigger" picture orchestrating the different service calls
 *  - does the actual work necessary to complete the tasks/request
 *  - returns the completed work a response to the controller
 */

let admin = require('../index');

exports.createUser = async (user) => {
	admin.auth.createUser({
		displayName: user.name,
		email: user.email,
		emailVerified: false,
		password: user.password,
		disabled: false
	})
		.then((userRecord) => console.log('Successfully created new user:', userRecord.uid))
		.catch(error => console.log('Error creating new user:', error));
};


exports.loginUser = async (user) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
  	.then((userCredential) => {
    	// Signed in
    	var user = userCredential.user;
		console.log('sign in successful');
		
  	})
  	.catch((error) => {
    	var errorCode = error.code;
    	var errorMessage = error.message;
		console.log(errorCode, errorMessage);
  	});
};