import React, { useState } from 'react';
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Alert, Dimensions} from 'react-native';
import { TextBox, Header } from '../components';
import { Button } from 'react-native-elements';
import { loginUser, resetPassword } from '../services/userServices';
import { styles, colors } from '../styles';
import { useDispatch } from 'react-redux';
import { userStatus } from '../ducks';

const { height, width } = Dimensions.get('screen');

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [modalError, setModalError] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [resetEmail, setResetEmail] = useState('');
	const dispatch = useDispatch();

	const {
		container,
		subtextButton,
		textBoxes,
		buttonContainer,
		errorText,
		modalErrorText,
		fullWidthHeight,
		forgotPassword,
		forgotPasswordButton,
		rightMargin
	} = styles;

	const loginSubmit = async () => {
		if (!email) { setError('Please enter your email') }
		else if (!password) { setError('Please enter your password') }
		else {
			loginUser(email, password)
				.then(loginStatus => {
					if (loginStatus == 'success') {
						setError('');
						setTimeout(() => dispatch(userStatus()), 500);
						setTimeout(() => setError('Please verify your email'), 550);
					}
					else { setError(loginStatus) }
				});
		}
	};

	const resetPassSubmit = async () => {
		if (!resetEmail) { setModalError('Please enter your email') }
		else {
			resetPassword(resetEmail)
				.then(resetStatus => {
					if (resetStatus.success) {
						Alert.alert('Reset Initiated', resetStatus.success);
						setModalError('');
						setResetEmail('');
						setModalVisible(!modalVisible);
					}
					else { setModalError(resetStatus) }
				});
		}
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	const renderModalError = () => {
		if (modalError)
			return (<Text style = { modalErrorText }>{ modalError }</Text>);
	};

	const renderForgotPasswordModal = () => {
		return (
			<Modal
				animationType = 'slide'
				transparent = { true }
				visible = { modalVisible }
			>
				<KeyboardAvoidingView
					behavior = 'height'
					enabled
				>
					<View style = { modalStyles.centeredView }>
						<View style = { modalStyles.modalView }>
							<Text style = { modalStyles.promptText }>
								Reset Password
							</Text>
							<View style = { modalStyles.textbox }>
								<TextBox
									defaultValue = 'email@address.com'
									labelText = 'Email'
									onChange = { (e) => setResetEmail(e) }
									value = { resetEmail }
								/>
							</View>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'Cancel'
									containerStyle = { [styles.buttonContainer, modalStyles.buttonContainer] }
									buttonStyle = { fullWidthHeight }
									onPress = { () => {
										setResetEmail('');
										setModalError('');
										setModalVisible(!modalVisible);
									} }
								/>
								<Button
									title = 'Send Email'
									containerStyle = { [styles.buttonContainer, modalStyles.buttonContainer] }
									buttonStyle = { fullWidthHeight }
									onPress = { () => resetPassSubmit() }
								/>
							</View>
							{ renderModalError() }
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	};

	return (
		<View style = { container }>
			{ renderForgotPasswordModal() }
			<Header height = '30%' />
			<View style = { textBoxes }>
				<TextBox
					defaultValue = 'email@address.com'
					labelText = 'Email'
					onChange = { (e) => setEmail(e) }
					value = { email }
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Password'
					secureInput = { true }
					onChange = { (e) => setPassword(e) }
					value = { password }
				/>
			</View>
			<View style = { rightMargin }>
				<Pressable style = { forgotPasswordButton }
					onPress = { () => {
						setModalVisible(true);
						setError('');
						setResetEmail('');
					} }
				>
					<Text style = { forgotPassword } >
						Forgot password?
					</Text>
				</Pressable>
			</View>
			{ renderError() }
			<Button
				title = 'Login'
				buttonStyle = { fullWidthHeight }
				containerStyle = { buttonContainer }
				onPress = { () => loginSubmit() }
			/>
			<Text style = { subtextButton }>
				{ 'Don\'t have an account? ' }
				<Text
					style = {{ color: colors.secondaryDark }}
					onPress = { () => { navigation.navigate('SignUp'); setError('') } }
				>
					Register here
				</Text>
			</Text>
		</View>
	);
};

const modalStyles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	centeredView: {
		height: height,
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	modalView: {
		height: '40%',
		width: '90%',
		marginTop: '-40%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		borderRadius: 10
	},
	promptText: {
		paddingBottom: '3%',
		marginTop: '8%',
		marginHorizontal: '16%',
		textAlign: 'center',
		fontSize: 22,
		borderBottomWidth: 1,
		borderBottomColor: colors.dark
	},
	buttonView: {
		height: '20%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	buttonContainer: {
		height: '80%',
		width: '35%',
		justifyContent: 'center',
		marginTop: '0%',
		backgroundColor: colors.primaryDark
	},
	textbox: {
		width: '120%',
		marginTop: '9%',
		alignItems: 'center'
	}
};