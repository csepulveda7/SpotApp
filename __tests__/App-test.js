import { render, fireEvent } from '@testing-library/react-native';

let user = require('../spot-backend/Services/user');

// ================ //
// BACKEND TESTING //
// ============== //

describe ('Backend Testing', () => {
	test('Test User creation', () => {
		const userData = { name: 'username', email: 'email@email9.com', password: 'password' };

		user.createUser(userData).then(res => {
			expect(res).toBe(true);
			done();
		}).catch(error =>{
			expect(error).not.toBeTruthy();
			done();
		});
	});

	test('Tests user creation with same email', () => {
		const userData = { name: 'username', email: 'test@example.com', password: 'password' };

		user.createUser(userData).then(res => {
			expect(res).toBe(true);
			done();
		}).catch(error=>{
			done(error);
		});
	});

	test('Test user log in with wrong formated email', () => {
		const userData = { email: 'email', password: 'password' };

		expect.assertions(1);

		return user.loginUser(userData).catch(e => expect(e).toMatch('Error: The email address is badly formatted.'));
	});

	test('Test user log in with user that does not exists', () => {
		const userData = { email: 'email@email', password: 'password' };

		expect.assertions(1);

		return user.loginUser(userData).catch(e => expect(e).toMatch('Error: There is no user record corresponding to this identifier. The user may have been deleted.'));
	});

	test('Test load user with no user signed in', () => {
		return user.loadUser().catch(e => expect(e.toString()).toMatch('TypeError: Cannot read property \'uid\' of null'));
	});

	test('Reset password for non existing email in database', () => {
		const userData = { email: 'email@email' };

		return user.resetPassword(userData).catch(e => expect(e.toString()).toMatch('Error: The email address is badly formatted.'));
	});

	test('Reset password for existing email in database', () => {
		const userData = { email: 'test123@example.com' };

		return expect(user.resetPassword(userData)).resolves.toStrictEqual({ 'success': `If an account with email ${userData.email} exists, a reset password email will be sent. Please check your email.` });
	});

	test('User Status for no user return null', () => {
		return expect(user.userStatus()).resolves.toBe(null);
	});

	test('Logout for no signed in user is undefined', () => {
		return expect(user.logoutUser()).toBeUndefined();
	});
});

// ================= //
// FRONTEND TESTING //
// =============== //

describe('Frontend Testing', () => {
	test.skip('Login page loads after splash page', () => {
		
	});
	test.skip('Login page hyperlinks to registration page', () => {

	});
	test.skip('Global Textbox component returns data', () => {

	});
	test.skip('Logging in with correct information navgiates to main page', () => {

	});
	test.skip('Main page navigates to account page', () => {

	});
	test.skip('Main page navigates to collections page', () => {

	});
	test.skip('Taking a picture from main page pulls up modal if breed recognized', () => {

	});
	test.skip('Taking a picture from main page pulls up modal if breed not recognized', () => {

	});
	test.skip('From collections page, see the full list of breeds', () => {

	});
	test.skip('Clicking on image scroller opens information modal', () => {

	});
	test.skip('On account page, view a progress bar of what breeds have been seen', () => {

	});
});