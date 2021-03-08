import React, { useState } from 'react';
import { View, Text, Modal, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../styles';
import { colors } from '../styles';
import { logoutUser } from '../services/userServices';
import { useDispatch } from 'react-redux';
import { userStatus } from '../ducks';
import { Alert } from 'react-native';
import NavBar from '../components/NavBar';
import { Avatar } from 'react-native-elements';


export const Account = ({ navigation }) => {
	const { container, infoBar, centerItems, infoText } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight,
		errorText,
		modalErrorText
	} = styles;

	const [error, setError] = useState(''); 
	const [modalError, setModalError] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const dispatch = useDispatch();
	const logoutSubmit = () => {
		logoutUser();
		setTimeout(() => dispatch(userStatus()), 500);
		Alert.alert('Logging off...', 'Have a nice day!');
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	const renderModalError = () => {
		if (modalError)
			return (<Text style = { modalErrorText }>{ modalError }</Text>);
	};

	const renderSetProfilePictureModal = () => {
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
								Set Profile Picture
							</Text>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'No Picture'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										// Make profile picture defaultProfilePicture.png
										setModalError('');
										setModalVisible(!modalVisible);
									} }
								/>
								<Button
									title = 'Choose from Gallery'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => { 
										// Use picker cropper to get picture from gallary 
									} }
								/>
								<Button
									title = 'Use Camera'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => { 
										// Use picker cropper to get picture from camera 
									} }
								/>
							</View>
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'Cancel'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => { 
										setModalError('');
										setModalVisible(!modalVisible);
									} }
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
		<View style = { [fullWidthHeight, container] }>
			{ renderSetProfilePictureModal() }
			<NavBar navigation = { navigation } screenName = 'Account' />
			
			<View style = { [centerItems] }
				width = '100%'
				height = '35%'
			>
				<Avatar
					size={200}
					rounded
					source = {require("../assets/default_profile_icon.png")} 
					>
					<Avatar.Accessory 
						size={20}
						underlayColor = '#8C9095'
						onPress = { () => {
							setModalVisible(true);
							setError(''); 
						} }
					/>
				</Avatar>
			</View>
			{ renderError() } 
			<View style = { [centerItems, infoBar] }>
				<Text style = { infoText }>Username: </Text>
				<Text style = { infoText }>Email: </Text>
				<Text style = { infoText }>Total Dogs Seen: </Text>
				<Text style = { infoText }>Total Breeds Seen: </Text>
				<Button
					title = 'Log out'
					containerStyle = { [buttonContainer, { height: 60 }] }
					buttonStyle = { fullWidthHeight }
					onPress = { logoutSubmit }
				/>
			</View>
		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: colors.primaryDark,
		flexDirection: 'column',
		flex: 1,
		zIndex: 1
	},
	infoBar: {
		backgroundColor: colors.offWhite,
		height: '55%',
		width: '100%',
		zIndex: 5,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoText: {
		fontSize: 16,
		alignSelf: 'flex-start',
		marginLeft: '10%'
	}
};

const modalStyles = {
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
		height: '25%',
		width: '100%'
	},
	buttonContainer: {
		width: '30%',
		height: '65%',
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark
	}
};