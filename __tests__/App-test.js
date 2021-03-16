import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { TextBox } from '../src/components';
import { App } from '../src';

let user = require('../spot-backend/Services/user');

// ================ //
// BACKEND TESTING //
// ============== //

describe('Backend Testing', () => {
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
	test('Login page loads after splash page', () => {import { render, fireEvent } from '@testing-library/react-native';
	import React from 'react';
	import { TextBox } from '../src/components';
	
	let user = require('../spot-backend/Services/user');
	
	// ================ //
	// BACKEND TESTING //
	// ============== //
	
	describe('Backend Testing', () => {
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
		test('Login page loads after splash page', () => {
			const onChangeTextMock = jest.fn();
			const { getOnChange } = render(
				<Splash
					onChange = { onChangeTextMock }
				/>
			);

			expect(onChangeTextMock).toHaveBeenCalled();
		});
		test('Login page hyperlinks to registration page', () => {
			const onChangeMock = jest.fn();
			const { getByPlaceholderText } = render(
				<TextBox
					defaultValue = 'test input'
					onChange = { onChangeMock }
				/>
			);
	
			const item = getByPlaceholderText('test input');
	
			fireEvent.changeText(item, 'test text');
			expect(onChangeTextMock).toHaveBeenCalled();
		});
		test('Global Textbox component returns data', () => {
			const onChangeTextMock = jest.fn();
			const { getByPlaceholderText } = render(
				<TextBox
					defaultValue = 'test input'
					onChange = { onChangeTextMock }
				/>
			);
	
			const item = getByPlaceholderText('test input');
	
			fireEvent.changeText(item, 'test text');
			expect(onChangeTextMock).toHaveBeenCalled();
		});
		test('Logging in with correct information navgiates to main page', () => {
			const onChangePage = jest.fn();
			const { getByPage } = render(
				<Login.Button
					onChange = { onChangePage }
				/>
			);
	
			const page = getByPage(<Main />);
	
			fireEvent.change(page);
			expect(onChangePage).toHaveBeenCalled();
		});
		test('Main page navigates to account page', () => {
			const onChangePage = jest.fn();
			const { getByPage } = render(
				<Main.Button
					onChange = { onChangePage }
				/>
			);
	
			const page = getByPage(<Account />);
	
			fireEvent.change(page);
			expect(onChangePage).toHaveBeenCalled();
		});
		test('Main page navigates to collections page', () => {
			const onChangePage = jest.fn();
			const { getByPage } = render(
				<Main.Button
					onChange = { onChangePage }
				/>
			);
	
			const page = getByPage(<Collections />);
	
			fireEvent.change(page);
			expect(onChangePage).toHaveBeenCalled();
		});
		test('Taking a picture from main page pulls up modal if breed recognized', () => {
			const onChange = jest.fn();
			const { getByFunction } = render(
				<Main.Button
					onChange = { onChange }
				/>
			);
	
			const page = getByFunction();
	
			fireEvent.byFunction(takePicture());
			expect(onChange).toHaveBeenCalled();
		});
		test('Taking a picture from main page pulls up modal if breed not recognized', () => {
			const onChange = jest.fn();
			const { getByFunction } = render(
				<Main.Button
					onChange = { onChange }
				/>
			);
	
			const page = getByFunction();
	
			fireEvent.byFunction(takePicture());
			expect(onChange).toHaveBeenCalled();
		});
		test('From collections page, see the full list of breeds', () => {
			const onChange = jest.fn();
			const { getByFunction } = render(
				<Main.Button
					onChange = { onChange }
				/>
			);
	
			const page = getByFunction();
	
			fireEvent.byFunction(takePicture());
			expect(onChange).toHaveBeenCalled();
		});
		test('Clicking on image scroller opens information modal', () => {
			const onClick = jest.fn();
			const { onClickEvent } = render(
				<Collections
					onChange = { onClick }
				/>
			);
	
			fireEvent.onClick(item, 'test text');
			expect(onChangeTextMock).toHaveBeenCalled();
		});
		test.skip('On account page, view a progress bar of what breeds have been seen', () => {
			const maybe = later;
		});
		test('Login page hyperlinks to registration page', () => {
			const onClick = jest.fn();
			const { onClickEvent } = render(
				<Login
					byText = { 'Register here!' }
					onChange = { onClick }
				/>
			);

			fireEvent.onClick(item, 'test text');
			expect(onChangeTextMock).toHaveBeenCalled();
		});
	});
});
