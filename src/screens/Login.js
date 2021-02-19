import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { TextBox, Header } from '../components';
import { Button } from 'react-native-elements';
import { loginUser } from '../services/userServices';
import { styles } from './styles';

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
		rightMargin
	} = styles;

	const loginSubmit = () => {
		if (!email) setError('Please enter your email');
		else if (!password) setError('Please enter your password');
		else loginUser(email, password);
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	const renderForgotPasswordModal = () => {
		return (
			<View style = { modalStyles.container }>
				<Modal
					animationType = 'slide'
					transparent = { true }
					visible = { modalVisible }
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
				</Modal>
			</View>
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
				<Pressable
					style = { rightMargin }
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
					style = {{ color: '#BC6F27' }}
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
		backgroundColor: '#E5E5E5',
		width: '90%',
		height: '35%',
		borderRadius: 10
	},
	promptText: {
		paddingBottom: '3%',
		marginTop: '8%',
		marginHorizontal: '16%',
		textAlign: 'center',
		fontSize: 22,
		borderBottomWidth: 1,
		borderBottomColor: 'black'
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
		backgroundColor: '#E2B865'
	},
	textbox: {
		width: '120%',
		marginTop: '9%',
		alignItems: 'center'
	}
};