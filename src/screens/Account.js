import React, { useState, useEffect } from 'react';
import { View, Text, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import NavBar from '../components/NavBar';
import ImagePicker from 'react-native-image-crop-picker';
import { styles, colors } from '../styles';
import { logoutUser, uploadImage } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { userStatus, loadUser } from '../ducks';
import { stat } from 'react-native-fs';

export const Account = ({ navigation }) => {
	const {
		container,
		topContainer,
		statsLogoutArea,
		centerItems,
		statsInfo,
		seperateText,
		seperateText1,
		breedsSeen,
		perosnalInfoContainer,
		personalInfoText,
		statsContainer,
		outerBarStyle,
		innerBarStyle,
		bottomButtonStyle
	} = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	const [modalVisible, setModalVisible] = useState(false);
	const [barPercent, setBarPercent] = useState(100);
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const logoutSubmit = () => {
		logoutUser();
		setTimeout(() => dispatch(userStatus()), 500);
		Alert.alert('Logging off...', 'Have a nice day!');
	};

	const updateBarPercent = (numBreeds) => {
		// maxPercent comes from remainder of width from the progress bar
		const maxPercent = 96;
		const totalBreeds = 100;
		let newPercent = numBreeds * (maxPercent / totalBreeds);

		if (newPercent != barPercent) setBarPercent(newPercent);
	};

	const renderSetProfilePictureModal = () => {
		return (
			<Modal animationType = 'slide' transparent = { true } visible = { modalVisible } >
				<KeyboardAvoidingView behavior = 'height' enabled >
					<View style = { modalStyles.centeredView }>
						<View style = { modalStyles.ModalView }>
							<View style = { modalStyles.buttonView }>
								{ /*
									TODO:
									- Remove 'No Picture' button
									- Remove label for modal
									- Fix Button styling to reflect figma
									- Fix modal style to reflect figma
								*/ }
								<Button
									title = 'Choose from Gallery'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalVisible(!modalVisible);
										ImagePicker.openPicker({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true,
											cropperCircleOverlay: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
								<Button
									title = 'Take Picture'
									containerStyle = { modalStyles.buttonContainer2 }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalVisible(!modalVisible);
										ImagePicker.openCamera({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true,
											cropperCircleOverlay: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
								<Button
									title = 'Cancel'
									containerStyle = { modalStyles.buttonContainer3 }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => setModalVisible(!modalVisible) }
								/>
							</View>
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

			<View style = { [centerItems, topContainer] }>
				<Avatar
					size = { 200 }
					rounded = { true }
					source = { activeUser.picture ? { uri: activeUser.picture } : require('../assets/default_profile_icon.png') }
				>
					<Avatar.Accessory
						// TODO:
						// - Change to color pallete colors
						// - Change size to fit in position
						size = { 45 }
						underlayColor = '#E5E5E5'
						onPress = { () => setModalVisible(true) }
					/>
				</Avatar>
				<View style = { perosnalInfoContainer }>
					<Text style = { personalInfoText }>{ activeUser.name }</Text>
					<Text style = { personalInfoText }>{ activeUser.email }</Text>
				</View>
			</View>

			<View style = { [centerItems, statsLogoutArea] }>
				<View style = { statsContainer }>
					{ /*
						TODO:
						- Fix horizontal space between labeling and value (see collections list formatting)
					*/ }
					<View style = { seperateText }>
						<Text style = { statsInfo }>Score:</Text>
						<Text style = { statsInfo }>{ activeUser.score }</Text>
					</View>
					<View style = { seperateText }>
						<Text style = { statsInfo }>Total Dogs Seen:</Text>
						<Text style = { statsInfo }>{ activeUser.CollectedBreeds }</Text>
					</View>
					<View style = { breedsSeen }>
						<View style = { seperateText1 }>
							<Text style = { statsInfo }>Total Breeds Seen:</Text>
							<Text style = { statsInfo }>{ activeUser.CollectedBreeds } / 100</Text>
						</View>
						<View style = { outerBarStyle }>
							{ updateBarPercent(75) }
							<View style = { [innerBarStyle, { width: `${ barPercent }%` }] } />
						</View>
					</View>
				</View>

				<Button
					title = 'Log out'
					containerStyle = { [buttonContainer, bottomButtonStyle] }
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
		justifyContent: 'space-between',
		flex: 1,
		zIndex: 1
	},
	topContainer: {
		width: '100%',
		height: '35%'
	},
	statsLogoutArea: {
		height: '42%',
		width: '100%',
		backgroundColor: colors.offWhite,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	statsContainer: {
		width: '84%',
		height: '45%'
	},
	seperateText: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	seperateText1: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '5%'
	},
	breedsSeen: {
		width: '100%',
		height: '100%'
	},
	statsInfo: {
		fontSize: 18
	},
	bottomButtonStyle: {
		height: '20%',
		marginTop: '2%'
	},
	perosnalInfoContainer: {
		width: '100%',
		height: '30%',
		justifyContent: 'space-around',
		marginTop: '3%'
	},
	personalInfoText: {
		fontSize: 22,
		alignSelf: 'center',
		color: 'rgb(64, 64, 64)'
	},
	outerBarStyle: {
		width: '100%',
		height: '25%',
		justifyContent: 'center',
		borderRadius: 11,
		marginTop: '2%',
		backgroundColor: colors.dark
	},
	innerBarStyle: {
		height: '55%',
		borderRadius: 6,
		marginLeft: '2%',
		backgroundColor: colors.primaryLight
	}
};

const modalStyles = {
	centeredView: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	ModalView: {
		width: '100%',
		height: 320,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32
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
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '65%',
		height: '20%',
		marginTop: 30,
		justifyContent: 'center'
	},
	buttonContainer2: {
		width: '65%',
		height: '20%',
		marginBottom: 50,
		justifyContent: 'center'
	},
	buttonContainer3: {
		width: '65%',
		height: '20%',
		marginBottom: 25,
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark,
		height: '100%',
		borderRadius: 0
	}
};