import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { TextBox, Header } from '../components';
import { Button } from 'react-native-elements';
import { loginUser, resetPassword } from '../services/userServices';
import { styles, colors } from '../styles';
import { useDispatch } from 'react-redux';
import { userStatus } from '../ducks';

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
					behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
					enabled
				>
					<View style = { modalStyles.centeredView }>
						<View style = { modalStyles.ModalView }>
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
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setResetEmail('');
										setModalError('');
										setModalVisible(!modalVisible);
									} }
								/>
								<Button
									title = 'Send Email'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
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
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	ModalView: {
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		width: '90%',
		height: 250,
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
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '30%',
		width: '100%'
	},
	buttonContainer: {
		width: '35%',
		height: '50%',
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark
	},
	textbox: {
		width: '120%',
		marginTop: '9%',
		alignItems: 'center'
	}
};