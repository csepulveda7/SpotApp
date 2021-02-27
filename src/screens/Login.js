import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { TextBox, Header } from '../components';
import { Button } from 'react-native-elements';
import { loginUser } from '../services/userServices';
import { styles, colors } from '../styles';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

	const {
		container,
		subtextButton,
		textBoxes,
		buttonContainer,
		errorText,
		fullWidthHeight,
		forgotPassword,
		forgotPasswordButton,
		rightMargin
	} = styles;

	const goToAccount = () => { navigation.navigate('Account') };

	const loginSubmit = () => {
		if (!email) setError('Please enter your email');
		else if (!password) setError('Please enter your password');
		else 
			loginUser(email, password);
			goToAccount(); 
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
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
								Please Enter Your Email:
							</Text>
							<View style = { modalStyles.textbox }>
								<TextBox
									defaultValue = 'email@address.com'
									labelText = 'Email'
									onChange = { (e) => setForgotPasswordEmail(e) }
									value = { forgotPasswordEmail }
								/>
							</View>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'Cancel'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setForgotPasswordEmail('');
										setModalVisible(!modalVisible);
									} }
								/>
								<Button
									title = 'Send Email'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										// send email
										setModalVisible(!modalVisible);
									} }
								/>
							</View>
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
						setForgotPasswordEmail('');
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
				onPress = { loginSubmit }
			/>
			<Text style = { subtextButton }>
				{ 'Don\'t have an account? ' }
				<Text
					style = {{ color: colors.secondaryDark }}
					onPress = { () => { navigation.navigate('SignUp') } }
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