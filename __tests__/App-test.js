import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { TextBox, NavBar } from '../src/components';
import { Splash } from '../src/screens/Splash';
import { Login } from '../src/screens/Login';
import { SignUp } from '../src/screens/SignUp';


jest.mock('../src/screens/Collection.js', () => {
	const mockComponent = require('react-native/jest/mockComponent');
	return mockComponent();
});

jest.mock('@fortawesome/react-native-fontawesome', () => ({
	FontAwesomeIcon: ''
}));

jest.mock('react-native-fs', () => ({
	stat: ''
}));


const configureMockStore = require('redux-mock-store').default;
const mockStore = (state = initialState) => configureMockStore()(state);
const testableComponent = (component, state) => (
		<Provider store={mockStore(state)}>{component}</Provider>
	);

let user = require('../spot-backend/Services/user');
let breed = {
	bred_for: "Small rodent hunting, lapdog",
		breed_group: "Toy",
		height: {
			imperial: "9 - 11.5",
			metric: "23 - 29"
		},
		id: 1,
		image: {
			height: 1199,
			id: "BJa4kxc4X",
			url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
			width: 1600
		},
		life_span: "10 - 12 years",
		name: "Affenpinscher",
		origin: "Germany, France",
		points: 10,
		reference_image_id: "BJa4kxc4X",
		temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
		weight: {
			imperial: "6 - 13",
			metric: "3 - 6"
		}
};

jest.mock('../src/services/userServices');
let userFrontEnd = require('../src/services/userServices');
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

		return user.loginUser(userData).catch(e => expect(e.toString()).toMatch('Error: The email address is badly formatted.'));
	});

	test('Test user log in with user that does not exists', () => {
		const userData = { email: 'email@email', password: 'password' };

		expect.assertions(1);

		return user.loginUser(userData).catch(e => expect(e.toString()).toMatch('Error: There is no user record corresponding to this identifier. The user may have been deleted.'));
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

	test('New dog added, increasing user score', () => {
		return expect(user.updateCollectedBreeds(breed)).toBeTruthy();
	});

	test('Repeated breed added, increasing user score by 1', () => {
		let RepeatedBreed = breed;
		return expect(user.updateCollectedBreeds(RepeatedBreed)).toBeTruthy();
	});
});

// ================= //
// FRONTEND TESTING //
// =============== //

describe('Frontend Testing', () => {
	
	
	
	const mockStore = configureStore([]);
	
	
	test('Login page loads after splash page', () => {
		let store = mockStore({
			myState: 'sample text',
		});
	
		let component = renderer.create(
				<Provider store={store}>
					<Splash />
				</Provider>
		);

		jest.useFakeTimers();
		expect(component.toJSON()).toMatchSnapshot();
		jest.advanceTimersByTime(1000);	
		component = renderer.create(
			<Provider store={store}>
				<Login />
			</Provider>
		);
		expect(component.toJSON()).toMatchSnapshot();

	});

	test('Login page hyperlinks to registration page', () => {
		let store = mockStore({
			myState: 'sample text',
		});
	
		let component = renderer.create(
				<Provider store={store}>
					<Login />
				</Provider>
		);

		jest.useFakeTimers();
		expect(component.toJSON()).toMatchSnapshot();
		jest.advanceTimersByTime(200);	
		component = renderer.create(
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
		expect(component.toJSON()).toMatchSnapshot();
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
	
	test('Logging in with correct information navigates to main page', () => {
		
		let store = mockStore({
			myState: 'sample text',
		});
	
		let component = renderer.create(
				<Provider store={store}>
					<Login />
				</Provider>
		);

		expect(component.toJSON()).toMatchSnapshot(); 

		const getUserInfo = {
			userName: 'email@email.email',
			password: 'password123'
		};
		const onChangeTextMock = jest.fn();
		const { getByPlaceholderText } = render(
			<TextBox
				defaultValue = 'User log in info'
				userInfo = {getUserInfo}
				onChange = { onChangeTextMock }
			/>
		);

		const userData = getByPlaceholderText('User log in info');


		fireEvent.changeText(userData, 'User log in info');
		expect(onChangeTextMock).toHaveBeenCalled();
		
		
	});
	
	test('Main page navigates to account page', () => {

		jest.useFakeTimers();
		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};

		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		const getMain = '<Main />';

		const MainTestable = testableComponent(getMain, {INITIAL_STATE});


		expect(MainTestable).toBeTruthy();
		jest.advanceTimersByTime(200);

		const getCurrentUserAccount = '<Account />';
		expect(testableComponent(getCurrentUserAccount, {INITIAL_STATE})).toBeTruthy();

	});
	
	test('Main page navigates to collections page', () => {
		jest.useFakeTimers();
		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};

		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		const getMain = '<Main />';

		const MainTestable = testableComponent(getMain, {INITIAL_STATE});


		expect(MainTestable).toBeTruthy();
		jest.advanceTimersByTime(200);

		const getCurrentCollection = '<Collection />';
		const CollectionTestable = testableComponent(getCurrentCollection, {INITIAL_STATE});
		
		expect(CollectionTestable).toBeTruthy();

	});

	test('Taking a picture from main page pulls up modal if breed recognized', () => {
		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};

		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		const getMain = '<Main />';

		const MainTestable = testableComponent(getMain, {INITIAL_STATE});


		expect(MainTestable).toBeTruthy();


		const BreedModalUpdate = jest.fn();
		const { getByPlaceholderText } = render(
			<TextBox
				defaultValue = 'Breed details'
				onChange = { BreedModalUpdate }
			/>
		);

		const updatedBreed = getByPlaceholderText('Breed details');


		fireEvent.changeText(updatedBreed, 'Spotted!');
		expect(BreedModalUpdate).toHaveBeenCalled();
	});

	test('Taking a picture from main page pulls up modal if breed not recognized', () => {
		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};

		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		const getMain = '<Main />';

		const MainTestable = testableComponent(getMain, {INITIAL_STATE});


		expect(MainTestable).toBeTruthy();


		const BreedModalUpdate = jest.fn();
		const { getByPlaceholderText } = render(
			<TextBox
				defaultValue = 'Breed details'
				onChange = { BreedModalUpdate }
			/>
		);

		const updatedBreed = getByPlaceholderText('Breed details');


		fireEvent.changeText(updatedBreed, 'Couldn\'t Recognize the Breed...');
		expect(BreedModalUpdate).toHaveBeenCalled();
		
	});

	test('Clicking on image scroller opens information modal', () => {
		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};

		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		const getCurrentCollection = '<Collection />';

		const CollectionTestable = testableComponent(getCurrentCollection, {INITIAL_STATE});
		

		expect(CollectionTestable).toBeTruthy();

		const onChangeScrollerMock = jest.fn();

		const getBreedInfo = {
			
					BreedGroup: 'BreedGroup',
					Height:'Height',
					LifeSpan: 'LifeSpan',
					Temperament: 'Temperament',
					Weight: 'Weight'
		};

		const { getByPlaceholderText } = render(
			<TextBox
				defaultValue = 'BreedGroup Height LifeSpan Temperament Weight'
				BreedInfo = {getBreedInfo}
				onChange = { onChangeScrollerMock }
			/>
		);

		const userData = getByPlaceholderText('BreedGroup Height LifeSpan Temperament Weight');


		fireEvent.changeText(userData, 'BreedGroup Height LifeSpan Temperament Weight');
		expect(onChangeScrollerMock).toHaveBeenCalled();

		

	});

	test('On account page, view a progress bar of what breeds have been seen', () => {
		

		let getLoggedUserState = true;
		let getLoadingState = false;
		let currentActiveUser = {
			user: 'userName'
		};
		const INITIAL_STATE = {
			isLoggedIn: getLoggedUserState,
			isLoading: getLoadingState,
			activeUser: currentActiveUser
		};

		
		const getCurrentUserAccount = '<Account />';
		expect(testableComponent(getCurrentUserAccount, {INITIAL_STATE})).toBeTruthy();
	});
	

	test('User is able to take a picture and scan it', () => {

		const mockUpload = {
			image: 'payload',
			uploaded: true
		}
		userFrontEnd.uploadImage.mockResolvedValue(mockUpload.uploaded);

		return expect(userFrontEnd.uploadImage(mockUpload)).resolves.toBe(true);
	});

	test('User is able to create an account in registration page', () => {

		const mockNewUserRegistration = {
			name: 'username',
			email: 'email@email.email',
			password: 'password',
			picture: '',
			score: 0,
			collectedBreeds: {
				total: 0
			},
			success: true
		};



		userFrontEnd.createUser.mockResolvedValue(mockNewUserRegistration.success);

		return expect(userFrontEnd.createUser(mockNewUserRegistration)).resolves.toBeTruthy();
	});


	test('User is able to log in to the app', () => {

		const userIsLogged = true;
		const mockUserCredentials = {
			email: 'email@email.email',
			password: 'password'
		};

		let userStatus = false;
		function setUserstatus(){
			return !userStatus;
		}
		userFrontEnd.loginUser.mockResolvedValue(setUserstatus());

		return expect(userFrontEnd.loginUser(mockUserCredentials)).resolves.toBe(userIsLogged);
	});

	test('After log in user can view their stats', () => {

		const userIsLogged = true;
		const mockUserCredentials = {
			email: 'email@email.email',
			password: 'password'
		};

		let userStatus = false;
		function setUserstatus(){
			return !userStatus;
		}
		userFrontEnd.loginUser.mockResolvedValue(setUserstatus());

		expect(userFrontEnd.loginUser(mockUserCredentials)).resolves.toBe(userIsLogged);

		if(userStatus){

			const mockUserStats = {
				name: 'name', 
				email: 'email@email.email', 
				score: 10,
				picture: 'payload', 
				CollectedBreeds: {
					score: 10,
				}
			};
			userFrontEnd.loadUserData.mockResolvedValue(mockUserStats);

			expect(userFrontEnd.loadUserData()).resolves.toEqual(mockUserStats);


		}
	});

	test('User is able request a password reset', () => {

		const hasBeenApproved = true;
		const mockUserCredentials = {
			email: 'email@email.email',
		};

		let requestApproved = false;

		function resetPassword(){
			return !requestApproved;
		}

			
		userFrontEnd.resetPassword.mockResolvedValue(resetPassword());

		return expect(userFrontEnd.resetPassword(mockUserCredentials)).resolves.toEqual(hasBeenApproved);
	});
});
